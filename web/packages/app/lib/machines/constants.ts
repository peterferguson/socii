// - Types
export type InvestButtonEvent =
  | { type: "RESET" }
  | { type: "UPDATE_HOLDING" }
  | { type: "CLICK" }
  | { type: "AGREE" }
  | { type: "DISAGREE" }
  | { type: "CLOSE" }
  | { type: "SELECT_GROUP"; groupName: string }
  | { type: "CHOOSE_SHARE" }
  | { type: "CHOOSE_BUY" }
  | { type: "CHOOSE_SELL" }
  | { type: "SELECT_LIMIT_ORDER" }
  | { type: "SELECT_CASH_ORDER" }
  | { type: "SELECT_SHARE_ORDER" }

export type StateName =
  | "idle"
  | "inactive"
  | "returnToLastScreen"
  | "active.chooseGroup"
  | "active.investAction"
  | "active.orderType"
  | "active.limitOrder"
  | "active.shareOrder"
  | "active.cashOrder"
  | "active.shareInformation"

export type Side = "buy" | "sell"
export type OrderType = "limit" | "cash" | "shares"

// The context (extended state) of the machine
export interface InvestButtonContext {
  hasHolding: boolean
  wantsToShare: boolean
  group: string
  side: Side
  orderType: OrderType
  currentStateName: StateName
  historyStack: []
}
