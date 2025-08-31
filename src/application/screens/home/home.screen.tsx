import React from 'react'
import { Pressable, Text } from 'react-native'

import ScreenWrapper from '@/application/components/screen-wrapper'
import { useAuth } from '@/application/hooks/auth'

export function HomeScreen() {
  const { logout, user } = useAuth()

  return (
    <ScreenWrapper>
      <Text className="text-white">Olá {user?.name}</Text>
      <Pressable className="bg-white" onPress={() => logout()}>
        <Text>Sign Out</Text>
      </Pressable>
    </ScreenWrapper>
  )
}
