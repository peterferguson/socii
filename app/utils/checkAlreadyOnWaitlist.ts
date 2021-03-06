export const checkAlreadyOnWaitlist = async (email: string) =>
  (
    await fetch(`api/notion/isOnWaitlist?email=${email}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
  ).json()
