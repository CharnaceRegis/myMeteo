import {
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
} from "react-native";
import { Txt } from "@/components/Txt";
import { Clock } from "@/components/Clock";

interface MeteoBasicProps {
    onPress: () => void;
    temperature: number;
    city: string;
    interpretation: {
        label: string;
        image: any;
    };
}

export function MeteoBasic({
    onPress,
    temperature,
    city,
    interpretation,
}: MeteoBasicProps) {
    return (
        <>
            <View style={s.clock}>
                <Clock />
            </View>

            <Txt>{city}</Txt>

            {interpretation ?
                <>
                    <Txt style={s.weather_label}>{interpretation.label}</Txt>

                    <View style={s.temperature_box}>
                        <TouchableOpacity onPress={onPress}>
                            {temperature ? <Txt style={s.temperature}> {temperature} °</Txt> : null}
                        </TouchableOpacity>
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