import tw from "app/lib/tailwind"
import { useRouter } from "app/navigation/use-router"
import React from "react"
import { Dimensions, Pressable, Text, ViewProps } from "react-native"
import { CardWithButton } from "./CardWithButton"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const CARD_WIDTH = SCREEN_WIDTH - 32
const CARD_HEIGHT = 180

export const GetStartedCard: React.FC<{
  width?: number
  height?: number
  title?: string
  onTitlePress?: () => void
  buttonType: "TOP" | "BOTTOM"
  containerStyle?: ViewProps
}> = ({ title, buttonType, onTitlePress, width, height, containerStyle }) => {
  const router = useRouter()
  return (
    <CardWithButton
      height={height || CARD_HEIGHT}
      width={width || CARD_WIDTH}
      onPress={() => router.push("/stocks")}
      ButtonContent={ButtonContent}
      buttonType={buttonType}
      containerStyle={containerStyle}
    >
      <MainContent title={title} onTitlePress={onTitlePress} />
    </CardWithButton>
  )
}

const MainContent: React.FC<{
  title?: string
  onTitlePress?: () => void
}> = ({ title, onTitlePress }) => (
  <>
    <Text style={tw`text-3xl mb-2`}> 👆 </Text>
    {title ? (
      <>
        <Pressable onPress={onTitlePress}>
          <Text style={tw`text-2xl font-poppins-600`}>{title}</Text>
        </Pressable>
        <Text style={tw`text-xl font-poppins-600`}>Has not invested yet</Text>
      </>
    ) : (
      <Text style={tw`text-xl font-poppins-600`}>No investments yet?</Text>
    )}
  </>
)

const ButtonContent = () => (
  <Text
    style={tw.style(
      `text-center p-4 font-poppins-300 text-xs text-brand-gray dark:text-brand-black`
    )}
  >
    Get started ✌
  </Text>
)
