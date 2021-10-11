export const joinWaitlist = async (email: string, isInvited: string) => 
await fetch("api/notion/requestInvite", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({ email, isInvited }),
});
