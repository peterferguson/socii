import React, { useEffect, useState } from "react"

import { StockSharingModalDynamic } from "../StockSharingModal"
import { SelectGroupModalDynamic } from "../SelectGroupModal"
import { SelectInvestActionModalDynamic } from "../SelectInvestActionModal"
import { SelectOrderTypeModalDynamic } from "../SelectOrderTypeModal"
import { OrderModalDynamic } from "../OrderModal"

const modals = {
  "active.shareInformation": { component: StockSharingModalDynamic },
  "active.chooseGroup": { component: SelectGroupModalDynamic },
  "active.investAction": { component: SelectInvestActionModalDynamic },
  "active.orderType": { component: SelectOrderTypeModalDynamic },
  "active.limitOrder": { component: OrderModalDynamic },
  "active.shareOrder": { component: OrderModalDynamic },
  "active.cashOrder": { component: OrderModalDynamic },
}

const InvestButtonModal = ({ ticker, state, send }) => {
  const [activeStateModalName, setActiveStateModalName] = useState("idle")

  useEffect(() => {
    setActiveStateModalName(
      typeof state.value !== "string" && "active" in state.value
        ? JSON.stringify(state.value)
            .replace(/[^a-zA-Z:]+/gi, "")
            .replace(":", ".")
        : state.value
    )
  }, [state?.value])

  const Modal = activeStateModalName ? modals[activeStateModalName]?.component : null

  return Modal ? <Modal ticker={ticker} state={state} send={send} /> : null
}

export default InvestButtonModal
