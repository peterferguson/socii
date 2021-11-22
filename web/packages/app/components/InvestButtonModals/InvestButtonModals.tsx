import { BottomSheetModal } from "@gorhom/bottom-sheet"
import type { State, Interpreter } from "xstate"
import tw from "app/lib/tailwind"
import React, { useCallback, useEffect, useState } from "react"
import { View, Text } from "react-native"
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
import { InvestButtonContext, InvestButtonEvent } from "@lib/machines/constants"

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
    Header: "Place your order:",
  },
  // shareOrder: { Component: OrderModalDynamic },
  // cashOrder: { Component: OrderModalDynamic },
}

export const InvestButtonModals: React.FC<{
  modalRef: React.MutableRefObject<BottomSheetModal>
  symbol: string
  state: State<InvestButtonContext, InvestButtonEvent>
  send: Interpreter<InvestButtonContext, any, InvestButtonEvent>["send"]
}> = ({ modalRef, symbol, state, send }) => {
  const scrollPositions = ["50%", "75%", "90%"]

  const handleSheetChanges = useCallback(
    (index: number) => index === -1 && send("CLOSE"),
    []
  )
  // const groupName = state.context.group
  const groupName = "Founders"

  const activeStateName = String(
    typeof state.value === "object" ? state.value["active"] : state.value
  )
  const ModalContents = Modals[activeStateName]
  const ModalComponent = ModalContents?.Component
  const ModalLabel = ModalContents?.Header

  if (!ModalComponent) return null
  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      onChange={handleSheetChanges}
    >
      <View style={tw`flex-1 items-center`}>
        {/* TODO: This needs refactored to allow custom headers for all modals */}
        {activeStateName === "shareInformation" ? (
          <ModalHeader
            modalRef={modalRef}
            LabelComponent={() => (
              <Text style={tw`text-lg font-medium text-gray-900 font-poppins-400`}>
                Tell
                <Text style={tw`font-bold text-brand`}> {groupName} </Text>
                <Text>about</Text>
                <Text style={tw`font-bold text-teal-300`}> {symbol}</Text>
              </Text>
            )}
          />
        ) : (
          <ModalHeader modalRef={modalRef} label={ModalLabel} />
        )}
        <CenteredColumn style={tw.style(`bg-white w-full h-full`)}>
          <ModalComponent symbol={symbol} state={state} send={send} />
        </CenteredColumn>
      </View>
    </Modal>
  )
}
