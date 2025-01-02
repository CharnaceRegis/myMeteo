import { Alert, View, StyleSheet } from "react-native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { useEffect, useState } from "react";
import { MeteoAPI } from "@/composables/meteo";
import { Txt } from "@/components/Txt";
import { MeteoBasic } from "@/components/MeteoBasic";
import { getWeatherInterpretation } from "@/composables/meteo-service";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Searchbar } from '@/components/SearchBar'
import { MeteoAdvanced } from '@/components/MeteoAdvanced'
import { MeteoFiveDays } from '@/components/MeteoDailyWeather'
import { getFavorites } from '@/composables/favorites';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Forecast: { city: string;[key: string]: any };
};

export interface DailyWeather {
    date: string;
    temperature_2m_max: number;
    weathercode: number;
    windspeed_10m_max: number;
}

export default function Home() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [coords, setCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [city, setCity] = useState<string>('');
    const currentWeather = weather?.current_weather;
    const [dailyWeatherArray, setDailyWeatherArray] = useState<DailyWeather[]>([]);

    useEffect(() => {
        getCoords();
    }, [])

    useEffect(() => {
        if (coords) {
            fetchWeather(coords);
            fetchCity(coords);
            getDailyWeatherArray()
        }
    }, [coords])

    async function getCoords() {
        let { status } = await requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            setCoords({ lat: 47.7796600, lng: 3.0862800 })
        }
        else {
            const location = await getCurrentPositionAsync()
            setCoords({ lat: location.coords.latitude, lng: location.coords.longitude })
        }
    }

    async function fetchWeather(coords: { lat: any; lng: any; }) {
        const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(coords)
        // console.log('fetchWeather', weatherResponse.daily);
        setWeather(weatherResponse)
    }

    async function fetchCity(coords: { lat: any; lng: any; }) {
        try {
            const cityResponse = await MeteoAPI.fetchCityFromCoords(coords);
            // console.log('fetchCity', cityResponse);
            setCity(cityResponse);
        } catch (e) {
            Alert.alert("Oups !", String(e));
        }
    }

    async function fetchCoordsByCity(city: string) {
        try {
            const coords = await MeteoAPI.fetchCoordsFromCity(city);
            setCoords(coords);
        } catch (e) {
            Alert.alert("Oups !", String(e));
        }
    }

    function goToForecastPage() {
        navigation.navigate("favorites", { city, ...weather.daily });
    }

    function getDailyWeatherArray() {
        console.log('getDailyWeatherArray', weather);
        if (weather && weather.daily) {
            const dailyWeather = weather.daily;
            const { time, temperature_2m_max, weathercode, sunrise, sunset, windspeed_10m_max } = dailyWeather;
            const dailyWeatherArray = time.map((date: any, index: string | number) => ({
                date,
                temperature_2m_max: temperature_2m_max[index],
                weathercode: weathercode[index],
                sunrise: sunrise[index],
                sunset: sunset[index],
                windspeed_10m_max: windspeed_10m_max[index],
            }));

            setDailyWeatherArray(dailyWeatherArray.slice(1));
        }
    }

    // STUB : template
    return (
        <>
            <View style={styles.base}>
                <MeteoBasic
                    temperature={Math.round(currentWeather?.temperature)}
                    city={city}
                    coords={coords!}
                    interpretation={
                        getWeatherInterpretation(currentWeather?.weathercode) || { label: '', image: null }
                    }
                />
            </View>

            <View style={styles.searchbar}>
                <Searchbar onSubmit={fetchCoordsByCity} />
            </View>

            <View style={styles.advanced}>
                <MeteoAdvanced
                    wind={currentWeather?.windspeed}
                    dusk={weather?.daily.sunrise[0].split("T")[1]}
                    dawn={weather?.daily.sunset[0].split("T")[1]}
                />
            </View>

            <View style={styles.dailyWeather}>
                {dailyWeatherArray.length > 0 ? (
                    <MeteoFiveDays dailyWeather={dailyWeatherArray} />
                ) : null}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 2,
        padding: 10,
    },
    searchbar: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    dailyWeather: {
        flex: 1,
        padding: 10,
    },
    advanced: {
        flex: 1,
        padding: 10,
    }
})