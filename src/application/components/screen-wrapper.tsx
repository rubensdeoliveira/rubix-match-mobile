import { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type ScreenWrapperProps = {
  children: ReactNode
  justifyContent?: 'center' | 'flex-start' | 'flex-end'
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  className?: string
}

export default function ScreenWrapper({
  children,
  justifyContent = 'center',
  alignItems = 'center',
  className = '',
}: ScreenWrapperProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView className="flex-1 bg-black">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent,
            alignItems,
          }}
          className={`${className}`}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
