import HorizontalSpacer from "app/components/HorizontalSpacer"
import { useDimensions } from "app/hooks"
import tw from "app/lib/tailwind"
import { ArrowLeft } from "iconsax-react-native"
import React, { useCallback } from "react"
import { Text, TouchableOpacity } from "react-native"
import { CenteredColumn, CenteredRow } from ".."

const KeyboardButton = ({ children, ...props }) => {
  const { isTinyPhone } = useDimensions()
  const keyHeight = isTinyPhone ? 60 : 64

  return (
    <TouchableOpacity
      {...props}
      //   duration={35}
      //   pressOutDuration={75}
      //   scaleTo={1.6}
      //   transformOrigin={[0.5, 0.5 + 8 / keyHeight]}
    >
      <CenteredRow style={{ height: keyHeight, transform: { scale: 0.5 }, width: 80 }}>
        {children}
      </CenteredRow>
    </TouchableOpacity>
  )
}

export default function Numpad({ decimal = true, onPress, width }) {
  const keyColor = tw.color("brand")

  const renderCell = useCallback(
    symbol => (
      <KeyboardButton key={symbol} onPress={() => onPress(symbol.toString())}>
        <Text
          style={
            (tw.style(`text-center font-poppins-700`),
            { color: keyColor, fontSize: 24 })
          }
        >
          {symbol}
        </Text>
      </KeyboardButton>
    ),
    [keyColor, onPress]
  )

  const renderRow = useCallback(
    cells => (
      <CenteredRow style={tw`justify-between w-full`}>
        {cells.map(renderCell)}
      </CenteredRow>
    ),
    [renderCell]
  )

  return (
    <CenteredColumn style={tw`w-full mt-16 mx-auto`}>
      {renderRow([1, 2, 3])}
      {renderRow([4, 5, 6])}
      {renderRow([7, 8, 9])}
      <CenteredRow style={tw`justify-between w-full`}>
        {decimal ? renderCell(".") : <HorizontalSpacer width={80} />}
        {renderCell(0)}
        <KeyboardButton onPress={() => onPress("back")}>
          <ArrowLeft size="24" color={keyColor} />
        </KeyboardButton>
      </CenteredRow>
    </CenteredColumn>
  )
}
