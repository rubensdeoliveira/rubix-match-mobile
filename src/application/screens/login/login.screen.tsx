import React from 'react'
import { Text, TextInput } from 'react-native'

import GoogleButton from '@/application/components/google-button'
import ScreenWrapper from '@/application/components/screen-wrapper'
import { useAuth } from '@/application/hooks/auth'

export function LoginScreen() {
  const { signInWithGoogle } = useAuth()

  return (
    <ScreenWrapper>
      <Text className="text-2xl text-red-500">Login 2</Text>
      <TextInput></TextInput>
      <TextInput></TextInput>
      <GoogleButton onPress={() => signInWithGoogle()} />
    </ScreenWrapper>
  )
}
