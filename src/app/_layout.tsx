import 'react-native-reanimated'

import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins_400Regular: require('@/application/assets/fonts/Poppins-Regular.ttf'),
    Poppins_600SemiBold: require('@/application/assets/fonts/Poppins-SemiBold.ttf'),
    Poppins_500Medium: require('@/application/assets/fonts/Poppins-Medium.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
