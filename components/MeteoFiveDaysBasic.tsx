import {
    Image,
    View,
    Text,
    StyleSheet,
} from "react-native";
import { Txt } from "./Txt";

interface MeteoFiveDaysBasic {
    date: string;
    temperature_2m_max: number;
    windspeed: number;
    interpretation: {
        label: string;
        image: any;
    };
};

export function MeteoFiveDaysBasic({ date, temperature_2m_max, windspeed, interpretation }: MeteoFiveDaysBasic) {
    const dayOfWeek = new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' });
    const dayAndMonth = new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

    return (
        <View style={s.container}>
            <View style={{ alignItems: 'center' }}>
                <Txt style={s.date}>{dayOfWeek}</Txt>
                <Txt style={s.day}>{dayAndMonth}</Txt>
            </View>
            <Txt style={s.temp}>{temperature_2m_max}°</Txt>
            <Image style={s.image} source={interpretation.image} />
            <Txt style={s.wind}>{windspeed} km/h</Txt>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    date: {
        fontSize: 13,
        color: "white",
    },
    day: {
        fontSize: 13,
        color: "white",
        marginTop: -2,
    },
    temp: {
        fontSize: 15,
        color: "white",
    },
    image: {
        width: 35,
        height: 35,
    },
    wind: {
        fontSize: 13,
        color: "white",
    },
});