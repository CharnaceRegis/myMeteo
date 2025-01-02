import { View, StyleSheet } from "react-native";
import { Txt } from "@/components/Txt";

interface MeteoAdvancedProps {
    dusk: string;
    dawn: string;
    wind: number;
}

export function MeteoAdvanced({ dusk, dawn, wind }: MeteoAdvancedProps) {
    return (
        <View style={s.container}>
            <StyledContainer>
                <StyledValue>{dusk}</StyledValue>
                <StyledLabel>Aube</StyledLabel>
            </StyledContainer>
            <StyledContainer>
                <StyledValue>{dawn}</StyledValue>
                <StyledLabel>Crépuscule</StyledLabel>
            </StyledContainer>
            <StyledContainer>
                <StyledValue>{wind} km/h</StyledValue>
                <StyledLabel>Vent</StyledLabel>
            </StyledContainer>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        borderRadius: 15,
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        borderColor: "white",
        borderWidth: 2,
        backgroundColor: "#0000005c",
    },
});

export function StyledLabel({ children }: { children: React.ReactNode }) {
    return <Txt style={{ fontSize: 15 }}>{children}</Txt>;
}
export function StyledValue({ children }: { children: React.ReactNode }) {
    return <Txt style={{ fontSize: 20 }}>{children}</Txt>;
}

export function StyledContainer({ children }: { children: React.ReactNode }) {
    return <View style={{ alignItems: "center" }}>{children}</View>;
}
