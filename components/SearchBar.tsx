import { TextInput, StyleSheet } from "react-native";

interface SearchbarProps {
    onSubmit: (text: string) => void;
}

export function Searchbar({ onSubmit }: SearchbarProps) {
    return (
        <TextInput
            onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
            style={s.input}
            placeholder="Chercher une ville... Ex: Paris"
        />
    );
}

const s = StyleSheet.create({
    input: {
        backgroundColor: "white",
        height: 60,
        paddingLeft: 20,
        borderRadius: 30,
        fontFamily: "Alata-Regular",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        fontSize: 25,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});