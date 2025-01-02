import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      animation: "fade",
      headerShown: false,
    }}
    initialRouteName="home"
  >
    <Stack.Screen name="home" />
    {/* <Stack.Screen name="Forecast" /> */}
  </Stack>
}
