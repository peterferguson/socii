import { CenteredColumn } from "app/components"
import { CardButton } from "app/components/CardButton"
import tw from "app/lib/tailwind"
import { shadowStyle } from "app/utils/shadowStyle"
import React from "react"
import { ViewProps } from "react-native"

export const CardWithButton: React.FC<{
  children: React.ReactNode
  onPress: () => void
  ButtonContent: React.FC
  width: number
  height: number
  buttonType?: "BOTTOM" | "TOP"
  containerStyle?: ViewProps
}> = ({
  children,
  onPress,
  ButtonContent,
  width,
  height,
  buttonType = "BOTTOM",
  containerStyle = tw`mb-6 mr-2`,
}) => (
  <CenteredColumn style={containerStyle}>
    {buttonType === "TOP" && (
      <CardButton onPress={onPress} width={width} buttonType={buttonType}>
        <ButtonContent />
      </CardButton>
    )}
    <CardContent
      height={height}
      width={width}
      buttonType={buttonType}
      children={children}
    />
    {buttonType === "BOTTOM" && (
      <CardButton onPress={onPress} width={width} buttonType={buttonType}>
        <ButtonContent />
      </CardButton>
    )}
  </CenteredColumn>
)

const CardContent = ({ children, height, width, buttonType }) => (
  <CenteredColumn
    style={tw.style(`bg-white rounded`, {
      height,
      width,
      ...shadowStyle("lg"),
      borderBottomLeftRadius: buttonType === "TOP" ? 16 : 0,
      borderBottomRightRadius: buttonType === "TOP" ? 16 : 0,
      borderTopLeftRadius: buttonType === "BOTTOM" ? 16 : 0,
      borderTopRightRadius: buttonType === "BOTTOM" ? 16 : 0,
    })}
  >
    {children}
  </CenteredColumn>
)
