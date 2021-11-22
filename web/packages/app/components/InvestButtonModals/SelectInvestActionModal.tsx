import tw from "app/lib/tailwind"
import React from "react"
import { CenteredColumn } from "../Centered"
import { Actions } from "./Actions"
import ModalSelectButton from "./ModalSelectButton"

const SelectInvestActionModal = ({ symbol, state, send }) => {
  const setSelectedAction = (action: { name: string; actionName: string }) =>
    send(action.actionName)

  const actions = Actions(symbol).filter(k =>
    !state.context.hasHolding ? k.name.match(/Buy|Share/) : true
  )

  return (
    <CenteredColumn style={tw`h-full justify-start pt-12`}>
      {/** TODO Add a loader here  */}
      {actions?.map(action => (
        <ModalSelectButton
          onPress={() => setSelectedAction(action)}
          Icon={action.Icon}
          title={action.name}
          key={action.name}
          description={action.description}
        />
      ))}
    </CenteredColumn>
  )
}

export default SelectInvestActionModal
