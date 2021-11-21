import { BottomSheetModal } from "@gorhom/bottom-sheet"
import tw from "app/lib/tailwind"
import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { CenteredColumn } from "../Centered"
import {
  OrderModal,
  ReturnToLastScreenModal,
  SelectGroupModal,
  SelectInvestActionModal,
  SelectOrderTypeModal,
  StockSharingModal,
} from "."
import { Modal, ModalHeader } from "../Modal"

export const Modals = {
  returnToLastScreen: {
    Component: ReturnToLastScreenModal,
    Header: "You're back!",
  },
  shareInformation: {
    Component: StockSharingModal,
    Header: "What would you like to share?",
  },
  chooseGroup: {
    Component: SelectGroupModal,
    Header: "Select a group to invest with:",
  },
  investAction: {
    Component: SelectInvestActionModal,
    Header: "Select an action:",
  },
  orderType: {
    Component: SelectOrderTypeModal,
    Header: "Select an order type:",
  },
  limitOrder: {
    Component: OrderModal,
    Header: "Place your order:",
  },
  // shareOrder: { Component: OrderModalDynamic },
  // cashOrder: { Component: OrderModalDynamic },
}

export const InvestButtonModal: React.FC<{
  modalRef: React.MutableRefObject<BottomSheetModal>
  symbol: string
  state: any
  send: (event: string) => void
}> = ({ modalRef, symbol, state, send }) => {
  const [open, setOpen] = useState(false)

  const scrollPositions = ["50%", "75%", "90%"]
  const [modalPosition, setModalPosition] = useState(1)
  const handleSheetChanges = useCallback((index: number) => setModalPosition(index), [])

  // TODO BUG Modal flickers when closed!
  useEffect(() => {
    if (modalPosition == -1 && open) {
      send("CLOSE")
      setOpen(false)
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
  if (!open) return null
  return ModalComponent ? (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      detach
      onChange={handleSheetChanges}
    >
      <View style={tw`flex-1 items-center `}>
        <ModalHeader modalRef={modalRef} label={ModalLabel} />
        <CenteredColumn style={tw.style(`bg-white w-full h-full`)}>
          <ModalComponent symbol={symbol} state={state} send={send} />
        </CenteredColumn>
      </View>
    </Modal>
  ) : null
}
