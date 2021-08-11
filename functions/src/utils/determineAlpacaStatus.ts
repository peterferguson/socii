export const determineAlpacaStatus = (responseStatus) => {
  const status = ["cancelled", "expired", "rejected", "suspended"].includes(
    responseStatus
  )
    ? "failed"
    : [
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
    ].includes(responseStatus)
      ? "pending"
      : ["filled"].includes(responseStatus)
        ? "success"
        : null;
  return status;
};
