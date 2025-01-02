import { ImageBackground, View, StyleSheet } from "react-native";
import backgroundImage from '@/assets/images/background.png';

import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
    return (
        <ImageBackground source={backgroundImage} style={styles.img_background} imageStyle={styles.img}>
            <View style={styles.core}>{children}</View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    img_background: {
        flex: 1,
        backgroundColor: "black",
    },
    img: {
        opacity: 0.75,
    },
    core: {
        flex: 1,
        padding: 20,
    }
});