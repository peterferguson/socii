export const updateTradeEvents = () => {
  // - fire & forget call to update latest trade activity
  const serverBaseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SERVER_BASE_URL
      : "http://localhost:5000"
  fetch(`${serverBaseUrl}/api/v1/alpaca/events/trades/`)
}
