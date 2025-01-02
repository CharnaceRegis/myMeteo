import {
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
} from "react-native";
import { Txt } from "@/components/Txt";
import { Clock } from "@/components/Clock";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import { isFavorite, addFavorite, removeFavorite, Favorite } from '@/composables/favorites';

interface MeteoBasicProps {
    temperature: number;
    city: string;
    coords: { lat: number; lng: number };
    interpretation: {
        label: string;
        image: any;
    };
}

export function MeteoBasic({
    temperature,
    city,
    coords,
    interpretation,
}: MeteoBasicProps) {
    const [isFav, setIsFav] = useState<boolean>(false);

    useEffect(() => {
        const checkFavorite = async () => {
            const favorite = await isFavorite(city);
            setIsFav(favorite);
        };
        checkFavorite();
    }, [city]);

    const handleFavoritePress = async () => {
        if (isFav) {
            await removeFavorite(city);
        } else {
            const favorite: Favorite = { city, coords };
            await addFavorite(favorite);
        }
        setIsFav(!isFav);
    };

    return (
        <>
            <View style={s.clock}>
                <Clock />
            </View>

            <Txt>{city}</Txt>
            <TouchableOpacity onPress={handleFavoritePress}>
                <Icon name={isFav ? "star" : "star-o"} size={20} color="gold" />
            </TouchableOpacity>

            {interpretation ?
                <>
                    <Txt style={s.weather_label}>{interpretation.label}</Txt>

                    <View style={s.temperature_box}>
                        {temperature ? <Txt style={s.temperature}> {temperature} °</Txt> : null}
                        <Image style={s.image} source={interpretation.image} />
                    </View>
                </> :
                (
                    <Txt style={s.weather_label}>No data</Txt>
                )}
        </>
    );
}


const s = StyleSheet.create({
    clock: {
        alignItems: "flex-end",
    },
    weather_label: {
        alignSelf: "flex-end",
        transform: [{ rotate: "-90deg" }],
        fontSize: 20,
    },
    image: {
        height: 90,
        width: 90,
    },
    temperature_box: {
        alignItems: "baseline",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    temperature: {
        fontSize: 150,
    },
});