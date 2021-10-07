export const updateTradeEvents = async () => {
  // - fire & forget call to update latest trade activity
  const serverBaseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SERVER_BASE_URL
      : "http://localhost:5000"

  return await fetch(`${serverBaseUrl}/api/v1/alpaca/events/trades/`).catch(
    function ignore() {}
  )
}
