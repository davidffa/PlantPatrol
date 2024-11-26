import { Stack } from "expo-router";

import "../styles/global.css";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts
} from "@expo-google-fonts/inter";

import {
  Roboto_300Light_Italic,
  Roboto_700Bold
} from "@expo-google-fonts/roboto"
import { UserProvider } from "@/contexts/user";
import { StatusBar } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Roboto_700Bold,
    Roboto_300Light_Italic
  });

  if (!fontsLoaded) return;

  return (
    <UserProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  )
}
