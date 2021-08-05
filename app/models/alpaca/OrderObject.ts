export interface OrderObject {
  id?: string
  clientOrderId?: string
  createdAt?: Date
  updatedAt?: Date
  submittedAt?: Date
  filledAt?: Date
  expiredAt?: Date
  canceledAt?: Date
  failedAt?: Date
  replacedAt?: Date
  replacedBy?: string
  replaces?: string
  assetId?: string
  symbol?: string
  assetClass?: string
  notional?: string
  qty?: string
  filledQty?: string
  filledAvgPrice?: string
  orderClass?: OrderObjectOrderClassEnum
  orderType?: OrderObjectOrderTypeEnum
  type?: OrderObjectTypeEnum
  side?: OrderObjectSideEnum
  timeInForce?: OrderObjectTimeInForceEnum
  limitPrice?: string
  stopPrice?: string
  status?: OrderObjectStatusEnum
  extendedHours?: boolean
  legs?: Array<OrderObject>
  trailPrice?: string
  trailPercent?: string
  hwm?: string
  commission?: string
}

export type OrderObjectOrderClassEnum = "simple" | "bracket" | "oco" | "oto"
export type OrderObjectOrderTypeEnum =
  | "market"
  | "limit"
  | "stop"
  | "stop_limit"
  | "trailing_stop"
export type OrderObjectTypeEnum =
  | "market"
  | "limit"
  | "stop"
  | "stop_limit"
  | "trailing_stop"
export type OrderObjectSideEnum = "buy" | "sell"
export type OrderObjectTimeInForceEnum = "day" | "gtc" | "opg" | "cls" | "ioc" | "fok"
export type OrderObjectStatusEnum =
  | "new"
  | "partially_filled"
  | "filled"
  | "done_for_day"
  | "canceled"
  | "expired"
  | "replaced"
  | "pending_cancel"
  | "pending_replace"
  | "accepted"
  | "pending_new"
  | "accepted_for_bidding"
  | "stopped"
  | "rejected"
  | "suspended"
  | "calculated"
