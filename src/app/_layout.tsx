import 'react-native-reanimated'
import '@/application/styles/globals.css'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'

import { AuthProvider } from '@/application/hooks/auth'
import { AppRouters } from '@/application/routes'

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
    <AuthProvider>
      <AppRouters />
      <StatusBar style="auto" />
    </AuthProvider>
  )
}
