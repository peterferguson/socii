import tw from "app/lib/tailwind"
import React from "react"
import { CenteredColumn } from "../Centered"
import ModalSelectButton from "./ModalSelectButton"
import { OrderTypes } from "./OrderTypes"

const SelectOrderTypeModal = ({ symbol, state, send }) => {
  const setSelectedOrderType = order => send(order.actionName)

  return (
    <CenteredColumn style={tw`justify-evenly w-full p-4 absolute top-0`}>
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
