import Home from './home';
import AlataR from '@/assets/fonts/Alata-Regular.ttf';
import { useFonts } from 'expo-font';
import { Container } from "@/components/Container";

export default function App() {
  const [isFontLoaded] = useFonts({
    "Alata-Regular": AlataR,
  });

  return isFontLoaded ? (
    <Container>
      <Home />
    </Container>
  ) : null;
}

