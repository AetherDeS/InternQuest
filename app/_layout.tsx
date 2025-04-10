 import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

// Подключили шрифты через Хук <-- useFonts -->
export default function RootLayout() {
   const [loaded] = useFonts({
      'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
    });
  
    useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);
  
    if (!loaded) {
      return null;
    }
  
  return <Stack
  screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="tabs" />
</Stack>;
}

// 58