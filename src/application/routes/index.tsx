import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'

import { useAuth } from '@/application/hooks/auth'

export function AppRouters() {
  const { user } = useAuth()

  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    const inAuth = segments[0] === '(authenticated)'

    if (user && !inAuth) {
      router.replace('/(authenticated)')
    } else if (!user && inAuth) {
      router.replace('/login')
    }
  }, [router, user, segments])

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
