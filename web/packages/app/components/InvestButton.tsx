import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useMachine } from "@xstate/react"
import { stockInvestButtonMachine } from "app/lib/machines/stockInvestButtonMachine"
import tw from "app/lib/tailwind"
import React, { useCallback, useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { Position } from "../../alpaca/models/Position"
import { useModal } from "../hooks/useModal"
// import { SelectInvestActionModalDynamic } from "./SelectInvestActionModal"
// import { SelectOrderTypeModalDynamic } from "./SelectOrderTypeModal"
// import { StockSharingModalDynamic } from "./StockSharingModal"
import { useRouter } from "../navigation/use-router"
import { shadowStyle } from "../utils/shadowStyle"
import { CenteredColumn } from "./Centered"
import { ModalHeader, Modal } from "./Modal"
// import { InvestButtonModalContainerDynamic } from "./InvestButtonModalContainer"
// import { OrderModalDynamic } from "./OrderModal"
// import { ReturnToLastScreenModalDynamic } from "./ReturnToLastScreenModal"
import {
  OrderModal,
  ReturnToLastScreenModal,
  SelectGroupModal,
  SelectInvestActionModal,
  SelectOrderTypeModal,
  StockSharingModal,
} from "./InvestButtonModals/index"

interface IInvestButtonProps {
  asset: any
  holding: Position
  logoColor: string
}

const Modals = {
  returnToLastScreen: { 
    Component: ReturnToLastScreenModal, 
    Header: "You're back!" 
  },
  shareInformation: {
    Component: StockSharingModal,
    Header: "What would you like to share?"
  },
  chooseGroup: {
    Component: SelectGroupModal,
    Header: "Select a group to invest with:"
  },
  investAction: { 
    Component: SelectInvestActionModal, 
    Header: "Select an action:" 
  },
  orderType: { 
    Component: SelectOrderTypeModal, 
    Header: "Select an order type:" 
  },
  limitOrder: { 
    Component: OrderModal, 
    Header: "Place your order:" 
  },
  // shareOrder: { Component: OrderModalDynamic },
  // cashOrder: { Component: OrderModalDynamic },
}

const InvestButton: React.FC<any> = ({ logoColor, symbol }) => {
  const router = useRouter()
  //   const username = user ? user.username : ""

  // - State machine for the invest button
  const [state, send] = useMachine(stockInvestButtonMachine)
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
  useEffect(() => {
    send("RESET")
  }, [symbol, send])

  // TODO BUG Modal flickers when closed!
  useEffect(() => {
    if (modalPosition == -1 && open) {
      send("CLOSE")
      setOpen(false)
      console.log("-----pos,", modalPosition)
    }
  }, [modalPosition])

  useEffect(() => {
    setOpen(
      Object.keys(Modals).includes(
        String(typeof state.value === "object" ? state.value["active"] : state.value)
      )
    )
  }, [state.value])

  const ModalContents =
    Modals[
      String(typeof state.value === "object" ? state.value["active"] : state.value)
    ]
  const ModalComponent = ModalContents?.Component
  const ModalLabel = ModalContents?.Header

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

      {open &&
        (ModalComponent ? (
          <Modal
            modalRef={modalRef}
            snapToPositions={scrollPositions}
            detach
            onChange={handleSheetChanges}
          >
            <View style={tw`flex-1 items-center `}>
              <ModalHeader modalRef={modalRef} label={ModalLabel} />
              <CenteredColumn
                style={tw.style(`bg-white w-full pt-5`, {
                  height: scrollPositions[modalPosition],
                })}
              >
                <ModalComponent symbol={symbol} state={state} send={send} />
              </CenteredColumn>
            </View>
          </Modal>
        ) : null)}
    </View>
  )
}
// FIXME
// ! Cannot get the text center alignment to work when using poppins fonts

export default InvestButton
