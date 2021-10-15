// import { useAuth } from "@hooks/useAuth"
// import { stockInvestButtonMachine } from "@lib/machines/stockInvestButtonMachine"
// import { Position } from "@socii/shared/alpaca"
// import { useMachine } from "@xstate/react"
import React, { useEffect, useState } from "react"
// import { InvestButtonModalContainerDynamic } from "./InvestButtonModalContainer"
// import { OrderModalDynamic } from "./OrderModal"
// import { ReturnToLastScreenModalDynamic } from "./ReturnToLastScreenModal"
// import { SelectGroupModalDynamic } from "./SelectGroupModal"
// import { SelectInvestActionModalDynamic } from "./SelectInvestActionModal"
// import { SelectOrderTypeModalDynamic } from "./SelectOrderTypeModal"
// import { StockSharingModalDynamic } from "./StockSharingModal"
import { useRouter } from "../navigation/use-router"
import { Pressable, View, Text } from "react-native"
import tw from "../lib/tailwind"

// interface IInvestButtonProps {
//   ticker: any
//   holding: Position
//   logoColor: string
// }

// const Modals = {
//   returnToLastScreen: { Component: ReturnToLastScreenModalDynamic },
//   shareInformation: { Component: StockSharingModalDynamic },
//   chooseGroup: { Component: SelectGroupModalDynamic },
//   investAction: { Component: SelectInvestActionModalDynamic },
//   orderType: { Component: SelectOrderTypeModalDynamic },
//   limitOrder: { Component: OrderModalDynamic },
//   shareOrder: { Component: OrderModalDynamic },
//   cashOrder: { Component: OrderModalDynamic },
// }

const InvestButton: React.FC<any> = ({ ticker, holding, logoColor }) => {
  const router = useRouter()
  //   const username = user ? user.username : ""

  // - State machine for the invest button
  //   const [state, send] = useMachine(stockInvestButtonMachine)
  const [open, setOpen] = useState(false)

  //   useEffect(() => {
  //     holding && send("UPDATE_HOLDING", { holding })
  //   }, [holding, send])

  // - When the user navigates away from the page, we want to reset the state machine
  // TODO: Ensure this works on transitions of dynamic routes
  // TODO: If not may need to add usePrevious hook?
  //   useEffect(() => {
  //     send("RESET")
  //   }, [router.asPath, send])

  //   useEffect(() => {
  //     setOpen(
  //       Object.keys(Modals).includes(
  //         String(typeof state.value === "object" ? state.value["active"] : state.value)
  //       )
  //     )
  //   }, [state.value])

  //   const ModalContents =
  //     Modals[
  //       String(typeof state.value === "object" ? state.value["active"] : state.value)
  //     ]?.Component

  // TODO: On user not logged in show login modal instead of redirecting to login page
  return (
    <Pressable
      onPress={() => {}}
      style={{
        backgroundColor: logoColor,
        ...tw`h-14 my-2 px-4 rounded-2xl sm:rounded-xl`,
      }}
    >
      <View style={tw`flex-1 flex-row justify-center items-center`}>
        <Text style={{ ...tw`text-4xl text-white` }}>Invest</Text>
      </View>
    </Pressable>
  )
}
// FIXME
// ! Cannot get the text center alignment to work when using poppins fonts

export default InvestButton
