import { useAuth } from "@hooks/useAuth"
import { stockInvestButtonMachine } from "@lib/machines/stockInvestButtonMachine"
import { Position } from "@socii/shared/alpaca"
import { tw } from "@utils/tw"
import { useMachine } from "@xstate/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { InvestButtonModalContainerDynamic } from "./InvestButtonModalContainer"
import { OrderModalDynamic } from "./OrderModal"
import { ReturnToLastScreenModalDynamic } from "./ReturnToLastScreenModal"
import { SelectGroupModalDynamic } from "./SelectGroupModal"
import { SelectInvestActionModalDynamic } from "./SelectInvestActionModal"
import { SelectOrderTypeModalDynamic } from "./SelectOrderTypeModal"
import { StockSharingModalDynamic } from "./StockSharingModal"

interface IInvestButtonProps {
  ticker: any
  holding: Position
  logoColor: string
}

const Modals = {
  returnToLastScreen: { Component: ReturnToLastScreenModalDynamic },
  shareInformation: { Component: StockSharingModalDynamic },
  chooseGroup: { Component: SelectGroupModalDynamic },
  investAction: { Component: SelectInvestActionModalDynamic },
  orderType: { Component: SelectOrderTypeModalDynamic },
  limitOrder: { Component: OrderModalDynamic },
  shareOrder: { Component: OrderModalDynamic },
  cashOrder: { Component: OrderModalDynamic },
}

export const InvestButton: React.FC<IInvestButtonProps> = ({
  ticker,
  holding,
  logoColor,
}) => {
  const router = useRouter()
  const { user } = useAuth()
  const username = user ? user.username : ""

  // - State machine for the invest button
  const [state, send] = useMachine(stockInvestButtonMachine)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    holding && send("UPDATE_HOLDING", { holding })
  }, [holding, send])

  // - When the user navigates away from the page, we want to reset the state machine
  // TODO: Ensure this works on transitions of dynamic routes
  // TODO: If not may need to add usePrevious hook?
  useEffect(() => {
    send("RESET") 
  }, [router.asPath, send])

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
    ]?.Component

  // TODO: On user not logged in show login modal instead of redirecting to login page
  return (
    <>
      <div
        style={{ backgroundColor: logoColor }}
        className={tw(
          "mx-0 mt-2 mb-0 text-center btn btn-transition rounded-2xl sm:rounded-xl",
          "cursor-pointer",
          "umami--click--stock-invest-button-click"
        )}
        onClick={() => (username ? send("CLICK") : router.push("/enter"))}
      >
        <span className="z-10 w-12 h-4 text-4xl">Invest</span>
      </div>
      {open && (
        <InvestButtonModalContainerDynamic open={open} send={send}>
          {ModalContents ? (
            <ModalContents ticker={ticker} state={state} send={send} />
          ) : null}
        </InvestButtonModalContainerDynamic>
      )}
    </>
  )
}
