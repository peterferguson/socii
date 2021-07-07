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
    await fetch("api/notion/requestInvite", {
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
      className="flex justify-center flex-shrink w-full max-w-lg px-2 mx-auto font-secondary group"
      onSubmit={handleSubmit}
    >
      <input
        className="w-2/3 border border-r-0 rounded-l-lg outline-none border-palette-light group-focus-within:ring-2 group-focus-within:ring-brand group-focus-within:border-transparent group-hover:ring-2 group-hover:ring-brand group-hover:border-transparent"
        type="email"
        required
        placeholder="Your email here"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className={tw(
          clicked ? "pointer-events-none opacity-75" : "",
          `py-3 px-4 bg-brand group-hover:bg-palette-lighter text-white text-tiny sm:text-sm font-semibold rounded-r-lg border border-transparent 
          outline-none group-focus-within:ring-2 group-focus-within:ring-brand group-focus-within:border-transparentactive:border-none active:ring-0 group-hover:ring-2 group-hover:ring-brand group-hover:border-transparent`
        )}
      >
        Get Invited
      </button>
    </form>
  )
}

export default Invite
