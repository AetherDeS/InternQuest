import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Provider } from 'react-redux'; // Импорт провайдера
import store from './constants/store'; // Импорт вашего Redux store

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 200,
  fade: true,
});

// Подключение шрифтов через хук <-- useFonts -->
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

  return (
    <Provider store={store}> {/* Обёртывание приложения в Redux Provider */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="tabs" />
      </Stack>
    </Provider>
  );
}
