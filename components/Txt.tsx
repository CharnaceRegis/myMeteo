import { Text, useWindowDimensions, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface TxtProps {
    children: ReactNode;
    style?: { fontSize?: number } & object;
}

export function Txt({ children, style }: TxtProps) {
    const { height } = useWindowDimensions();
    const fontSize = style?.fontSize || s.text.fontSize;
    return (
        <Text
            style={[
                s.text,
                style,
                { fontSize: fontSize * 0.00118 * height },
            ]}
        >
            {children}
        </Text>
    );
}

const s = StyleSheet.create({
    text: {
        color: "white",
        fontFamily: "Alata-Regular",
        fontSize: 30,
    },
});

