import { useAuth } from "@hooks/useAuth"
// import { stockInvestButtonMachine } from "@lib/machines/stockInvestButtonMachine"
import { Position } from "../../alpaca/models/Position"
// import { useMachine } from "@xstate/react"
import React, { useEffect, useState, useCallback } from "react"
// import { InvestButtonModalContainerDynamic } from "./InvestButtonModalContainer"
// import { OrderModalDynamic } from "./OrderModal"
// import { ReturnToLastScreenModalDynamic } from "./ReturnToLastScreenModal"
import { SelectGroupModalNative } from "./SelectGroupModal"
// import { SelectInvestActionModalDynamic } from "./SelectInvestActionModal"
// import { SelectOrderTypeModalDynamic } from "./SelectOrderTypeModal"
// import { StockSharingModalDynamic } from "./StockSharingModal"
import { useRouter } from "../navigation/use-router"
import { Pressable, View, Text } from "react-native"
import { shadowStyle } from "../utils/shadowStyle"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { ModalHeader } from "./index"
import { useModal } from "../hooks/useModal"
import tw from "../lib/tailwind"
import { createParam } from "../navigation/use-param"
import {
  Button,
  CenteredColumn,
  ChatWithGroupButton,
  GroupActivities,
  GroupColumnCard,
  LoadingIndicator,
  Modal,
  SelectedUsers,
  UserSearchInput,
  UserSearchResults,
} from "."

interface IInvestButtonProps {
  asset: any
  holding: Position
  logoColor: string
}

const Modals = {
  // returnToLastScreen: { Component: ReturnToLastScreenModalDynamic },
  // shareInformation: { Component: StockSharingModalDynamic },
  chooseGroup: { Component: SelectGroupModalNative },
  // investAction: { Component: SelectInvestActionModalDynamic },
  // orderType: { Component: SelectOrderTypeModalDynamic },
  // limitOrder: { Component: OrderModalDynamic },
  // shareOrder: { Component: OrderModalDynamic },
  // cashOrder: { Component: OrderModalDynamic },
}

const InvestButton: React.FC<any> = ({logoColor, symbol }) => {
  const router = useRouter()
  //   const username = user ? user.username : ""

  // - State machine for the invest button
  //   const [state, send] = useMachine(stockInvestButtonMachine)
  const [open, setOpen] = useState(false)

  const scrollPositions = ["25%", "50%", "90%"]
  const modalRef = React.useRef<BottomSheetModal>(null)
  const [modalPosition, setModalPosition] = useState(1)
  const handleSheetChanges = useCallback((index: number) => setModalPosition(index), [])

  const { handlePresent } = useModal(modalRef)

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

    const ModalContents =
      Modals[
        "chooseGroup"
      ]?.Component
    // const ModalContents =
    //   Modals[
    //     String(typeof state.value === "object" ? state.value["active"] : state.value)
    //   ]?.Component

  // TODO: On user not logged in show login modal instead of redirecting to login page
  return (
    <View>
      <Pressable
        onPress={handlePresent}
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

      <Modal
        modalRef={modalRef}
        snapToPositions={scrollPositions}
        detach
        onChange={handleSheetChanges}
      >
        <View style={tw`flex-1 items-center overflow-y-scroll`}>
          <ModalHeader modalRef={modalRef} label={symbol} />
          <CenteredColumn
            style={tw.style(`bg-white w-full`, {
              height: scrollPositions[modalPosition],
            })}
          >
            <ModalContents  />
          </CenteredColumn>
        </View>
      </Modal>
    </View>
  )
}
// FIXME
// ! Cannot get the text center alignment to work when using poppins fonts

export default InvestButton

const AddGroupMemberModal: React.FC<{
  symbol: string
  modalRef: React.MutableRefObject<BottomSheetModal>
}> = ({ modalRef, symbol }) => {
  const [modalPosition, setModalPosition] = useState(1)
  const scrollPositions = ["25%", "50%", "90%"]

  const handleSheetChanges = useCallback((index: number) => setModalPosition(index), [])

  // TODO: Animate the change in position of the loading indicator in line with the snap
  // TODO: position of the modal. Probably easiest to do this with moti
  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      detach
      onChange={handleSheetChanges}
    >
      <View style={tw`flex-1 items-center pt-2`}>
        <ModalHeader modalRef={modalRef} label={symbol} />
        <CenteredColumn
          style={tw.style(`bg-white w-full`, {
            height: scrollPositions[modalPosition],
          })}
        >
          <Text> HI </Text>
        </CenteredColumn>
      </View>
    </Modal>
  )
}
