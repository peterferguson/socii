export const joinWaitlist = async (email: string) =>
  await fetch("api/notion/requestInvite", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
