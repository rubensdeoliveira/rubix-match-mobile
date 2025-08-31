import { Image, Pressable, Text } from 'react-native'

type GoogleButtonProps = {
  onPress: () => void
  title?: string
}

export default function GoogleButton({
  onPress,
  title = 'Continuar com Google',
}: GoogleButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center bg-white border border-gray-300 rounded-md px-4 py-3 shadow-sm"
    >
      <Image
        source={require('@/application/assets/icons/google.svg')}
        className="w-6 h-6 mr-3"
        resizeMode="contain"
        alt=""
      />
      <Text className="text-black font-medium">{title}</Text>
    </Pressable>
  )
}
