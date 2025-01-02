import { Text, View, ImageBackground, StyleSheet } from "react-native";
import backgroundImage from '@/assets/images/background.png';
import Home from './home';
import AlataR from '@/assets/fonts/Alata-Regular.ttf';
import { useFonts } from 'expo-font';

export default function App() {
  const [isFontLoaded] = useFonts({
    "Alata-Regular": AlataR,
  });

  return isFontLoaded ? (
    <ImageBackground source={backgroundImage} style={styles.img_background} imageStyle={styles.img}>
      <Home />
    </ImageBackground>
  ) : null;
}


const styles = StyleSheet.create({
  img_background: {
    flex: 1,
    backgroundColor: "black",
  },
  img: {
    opacity: 0.75,
  },
});