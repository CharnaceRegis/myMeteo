import { Txt } from "@/components/Txt";
import { Container } from "@/components/Container";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

type RootStackParamList = {
    Forecast: { city: string };
};

type RouteParams = RouteProp<RootStackParamList, 'Forecast'>;

export default function Forecast({ }) {
    const navigation = useNavigation();
    const { params } = useRoute<RouteParams>();

    const backButton = (
        <TouchableOpacity style={s.back_btn} onPress={() => navigation.goBack()}>
            <Txt> {"<"} </Txt>
        </TouchableOpacity>
    );

    const header = (
        <View style={s.header}>
            {backButton}
        </View>
    );

    return (
        <Container>
            {header}
        </Container>
    );
}


const s = StyleSheet.create({
    header: {
        flexDirection: "row",
    },
    header_texts: {
        flex: 1,
        alignItems: "center",
        marginRight: 30,
    },
    back_btn: {
        width: 30,
    },
    subtitle: {
        fontSize: 20,
    },
    forecastList: {
        marginTop: 50,
    },
});