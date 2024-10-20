import { Stack } from "expo-router";

import "../styles/global.css";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts
} from "@expo-google-fonts/inter";

import {
  Roboto_700Bold
} from "@expo-google-fonts/roboto"

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Roboto_700Bold
  });

  if (!fontsLoaded) return;

  return <Stack screenOptions={{ headerShown: false }} />
}
