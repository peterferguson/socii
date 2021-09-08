export const failedStatuses = ["cancelled", "expired", "rejected", "suspended"]

export const pendingStatuses = [
  "new",
  "done_for_day",
  "pending_cancel",
  "pending_replace",
  "pending_new",
  "accepted_for_bidding",
  "stopped",
  "calculated",
  "accepted",
  "replaced",
]

export const successStatuses = ["filled", "partially_filled"]

export const determineTradeStatus = (responseStatus: string) => {
  const status = failedStatuses.includes(responseStatus)
    ? "failed"
    : pendingStatuses.includes(responseStatus)
    ? "pending"
    : successStatuses.includes(responseStatus)
    ? "success"
    : null
  return status
}
