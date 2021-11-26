import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useAssets } from "app/hooks/useAssets"
import { useModal } from "app/hooks/useModal"
import { InvestButtonContext, InvestButtonEvent } from "app/lib/machines/constants"
import tw from "app/lib/tailwind"
import React, { useCallback } from "react"
import { Text, View } from "react-native"
import type { Interpreter, State } from "xstate"
import {
  OrderModal,
  ReturnToLastScreenModal,
  SelectGroupModal,
  SelectInvestActionModal,
  SelectOrderTypeModal,
  StockSharingModal,
} from "."
import { CenteredColumn } from "../Centered"
import { Modal, ModalHeader } from "../Modal"

export const InvestButtonModals: React.FC<{
  modalRef: React.MutableRefObject<BottomSheetModal>
  symbol: string
  state: State<InvestButtonContext, InvestButtonEvent>
  send: Interpreter<InvestButtonContext, any, InvestButtonEvent>["send"]
}> = ({ modalRef, symbol, state, send }) => {
  const activeStateName = String(
    typeof state.value === "object" ? state.value["active"] : state.value
  )

  const { FULL_HEIGHT_SNAP_POINT, handleClose, handleSnapPress } = useModal(modalRef)
  const scrollPositions = ["25%", "50%", "65%", "89%", FULL_HEIGHT_SNAP_POINT]

  // TODO: Refactor out all individualised effects & changes into the modals themselves
  // ! Probably need to move away from just changing content in the modals for this
  React.useEffect(() => {
    handleSnapPress(modalDefaultSnapPosition(activeStateName))
  }, [state.value])

  const handleSheetChanges = useCallback((index: number) => {
    index === -1 && send("CLOSE")
  }, [])

  const groupName = state.context.group
  const asset = useAssets()[symbol]

  const ModalContents = Modals[activeStateName]
  const ModalComponent = ModalContents?.Component
  const ModalLabel = ModalContents?.Header

  if (!ModalComponent) return null

  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      onChange={handleSheetChanges}
      defaultPositionIndex={modalDefaultSnapPosition(activeStateName)}
    >
      <View style={tw`flex-1 items-center`}>
        {/* TODO: This needs refactored to allow custom headers for all modals */}
        {activeStateName === "shareInformation" ? (
          <ModalHeader
            modalRef={modalRef}
            LabelComponent={() => (
              <ShareInformationHeader
                {...{ groupName, symbol, logoColor: asset.logoColor }}
              />
            )}
          />
        ) : (
          <ModalHeader modalRef={modalRef} label={ModalLabel} />
        )}
        <CenteredColumn style={tw.style(`bg-white w-full h-full`)}>
          <ModalComponent
            symbol={symbol}
            modalRef={modalRef}
            asset={asset}
            state={state}
            send={send}
            handleClose={handleClose}
          />
        </CenteredColumn>
      </View>
    </Modal>
  )
}

const ShareInformationHeader = ({ groupName, symbol, logoColor }) => {
  return (
    <Text style={tw`text-lg font-medium text-gray-900 font-poppins-400`}>
      Tell
      <Text style={tw`font-bold text-brand`}> {groupName} </Text>
      <Text>about</Text>
      <Text style={tw.style(`font-bold`, { color: logoColor })}> {symbol}</Text>
    </Text>
  )
}

const modalDefaultSnapPosition = (activeStateName: string) => {
  switch (activeStateName) {
    case "chooseGroup":
      return 0
    case "orderType":
      return 2
    case "shareInformation":
      return 2
    case "limitOrder":
      return 4
    case "cashOrder":
      return 4
    case "shareOrder":
      return 4
    default:
      return 1
  }
}

export const Modals = {
  returnToLastScreen: {
    Component: ReturnToLastScreenModal,
    Header: "You're back!",
  },
  chooseGroup: {
    Component: SelectGroupModal,
    Header: "Select a group to invest with:",
  },
  shareInformation: {
    Component: StockSharingModal,
    Header: "Share your information:",
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
    Header: "Place limit order:",
  },
  shareOrder: { Component: OrderModal, Header: "Place share order:" },
  cashOrder: { Component: OrderModal, Header: "Place cash order:" },
}
