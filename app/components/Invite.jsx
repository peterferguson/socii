import { useState } from "react"
import { tw } from "@utils/helper"

function Invite({ setInvited }) {
  const [email, setEmail] = useState("")
  const [clicked, setClicked] = useState(false)

  // 1
  // TODO: Write a function to listen to notion for confirmation to add the user
  // TODO: to the invited list.
  // 2
  // TODO: If the user has already been invited direct them to the enter page

  async function handleSubmit(e) {
    e.preventDefault()
    setClicked(true)
    await fetch("api/update-notion", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    setInvited(true)
  }

  return (
    <form
      className="flex justify-center flex-shrink w-full max-w-lg px-2 mx-auto font-secondary"
      onSubmit={handleSubmit}
    >
      <input
        className="w-2/3 border border-r-0 rounded-l-lg border-palette-light focus:outline-none focus:ring-1 focus:ring-palette-primary"
        type="email"
        required
        placeholder="Your email here"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className={tw(
          clicked ? "pointer-events-none opacity-75" : "",
          `py-3 px-4 bg-palette-light hover:bg-palette-primary text-white text-tiny sm:text-sm font-semibold rounded-r-lg border border-transparent 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-palette-primary`
        )}
      >
        Get Invited
      </button>
    </form>
  )
}

export default Invite
