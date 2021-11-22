import tw from "app/lib/tailwind"
import React from "react"
import { CenteredColumn } from "../Centered"
import ModalSelectButton from "./ModalSelectButton"
import { OrderTypes } from "./OrderTypes"

const SelectOrderTypeModal = ({ symbol, state, send }) => {
  const setSelectedOrderType = order => send(order.actionName)

  return (
    <CenteredColumn style={tw`h-full justify-start pt-12`}>
      {/** TODO Add a loader here  */}
      {OrderTypes(symbol, state.context.side)?.map(order => (
        <ModalSelectButton
          onPress={() => setSelectedOrderType(order)}
          Icon={order.Icon}
          title={order.name}
          key={order.name}
          description={order.description}
        />
      ))}
    </CenteredColumn>
  )
}

export default SelectOrderTypeModal
