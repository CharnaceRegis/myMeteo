import { useEffect, useState } from "react";
import { nowToHHMM } from "@/composables/date-service";
import { Txt } from "@/components/Txt";
import { StyleSheet } from "react-native";

export function Clock() {
    const [time, setTime] = useState(nowToHHMM());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(nowToHHMM());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <>
            <Txt style={s.time}>{time}</Txt>
        </>
    );
}

const s = StyleSheet.create({
    time: {
        fontSize: 20,
    },
});