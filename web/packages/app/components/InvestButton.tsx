import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useMachine } from "@xstate/react"
import { stockInvestButtonMachine } from "app/lib/machines/stockInvestButtonMachine"
import tw from "app/lib/tailwind"
import React, { useEffect } from "react"
import { Pressable, Text, View } from "react-native"
import { useModal } from "../hooks/useModal"
import { shadowStyle } from "../utils/shadowStyle"
import { InvestButtonModal } from "./InvestButtonModals/InvestButtonModal"

const InvestButton: React.FC<any> = ({ logoColor, symbol }) => {
  // - State machine for the invest button
  const [state, send] = useMachine(stockInvestButtonMachine)
  const modalRef = React.useRef<BottomSheetModal>(null)

  const { handlePresent } = useModal(modalRef)
  // - When the user navigates away from the page, we want to reset the state machine
  // TODO: Ensure this works on transitions of dynamic routes
  // TODO: If not may need to add usePrevious hook?
  useEffect(() => {
    send("RESET")
  }, [symbol, send])

  // TODO: On user not logged in show login modal instead of redirecting to login page
  return (
    <View>
      <Pressable
        onPress={send("CLICK") && handlePresent}
        style={{
          backgroundColor: logoColor,
          ...tw`h-14 my-2 mx-4 rounded-2xl sm:rounded-xl`,
          ...shadowStyle("md"),
        }}
      >
        <View style={tw`flex-1 flex-row justify-center items-center`}>
          <Text style={{ ...tw`text-4xl text-white` }}>Invest</Text>
        </View>
      </Pressable>
      <InvestButtonModal
        modalRef={modalRef}
        state={state}
        send={send}
        symbol={symbol}
      />
    </View>
  )
}
// FIXME
// ! Cannot get the text center alignment to work when using poppins fonts

export default InvestButton
