import React from "react"
import { TradeHistoryTabs } from "./TradeHistoryTabs"

export const activityTypeMapping = {
  Trades: ["FILL"],
  Cash: ["ACATC", "ACATS", "CSD", "CSR", "CSW"],
  General: [
    "INT",
    "JNLC",
    "JNLS",
    "MA",
    "NC",
    "PTC",
    "REORG",
    "SSO",
    "SSP",
    "DIV",
    "DIVCGL",
    "DIVCGS",
    "DIVNRA",
    "DIVROC",
    "DIVTXEX",
  ],
}

export const TradeHistory = () => {
  return (
    <>
      <h2 className="pl-2 text-2xl text-gray-500 font-primary">Activity</h2>
      <TradeHistoryTabs />
    </>
  )
}
