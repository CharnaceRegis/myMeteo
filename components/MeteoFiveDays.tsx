import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Txt } from '@/components/Txt';
import { MeteoFiveDaysBasic } from '@/components/MeteoFiveDaysBasic';
import { getWeatherInterpretation } from "@/composables/meteo-service";
import { FiveDays } from '@/app/home';
import { StyledContainer } from '@/components/MeteoAdvanced';


export function MeteoFiveDays({ dailyWeather }: FiveDays) {
    return (
        <View style={s.container}>
            {dailyWeather.length > 0 ? (
                dailyWeather.map((day, index) => (
                    <StyledContainer key={index}>
                        <MeteoFiveDaysBasic
                            date={day.date}
                            temperature_2m_max={day.temperature_2m_max}
                            interpretation={
                                getWeatherInterpretation(day.weathercode) || { label: '', image: null }
                            }
                            windspeed={day.windspeed_10m_max} />
                    </StyledContainer>
                ))
            ) : (
                <Txt>No data</Txt>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        borderRadius: 15,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: '#0000005c',
    },
});