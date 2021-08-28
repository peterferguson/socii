import { tw } from "@utils/tw"
import { useState } from "react"

function WaitlistInvite({ invited, setInvited }) {
  const [email, setEmail] = useState("")
  const [clicked, setClicked] = useState(false)

  // 1
  // TODO: Write a function to listen to notion for confirmation to add the user
  // TODO: to the invited list.
  // 2
  // TODO: If the user has already been invited direct them to the enter page

  return (
    <form
      className="flex justify-center w-full max-w-lg font-secondary group"
      onSubmit={async (e) => {
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
      }}
    >
      {invited ? (
        <h1 className="mt-8 text-2xl font-extrabold font-primary sm:text-4xl md:text-5xl md:leading-snug">
          Thanks for signing up!
          <p className="text-xl font-thin font-secondary">
            Keep an eye on your inbox for your invite.
          </p>
        </h1>
      ) : (
        <>
          <input
            className="w-2/3 border border-r-0 rounded-l-lg outline-none text-tiny sm:text-sm border-palette-light group-focus-within:ring-2 group-focus-within:ring-brand group-focus-within:border-transparent group-hover:ring-2 group-hover:ring-brand group-hover:border-transparent"
            type="email"
            required
            placeholder="Your email here"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className={tw(
              clicked ? "pointer-events-none opacity-75" : "",
              `py-3 px-4 bg-brand group-hover:bg-palette-lighter text-white text-tiniest sm:text-tiny md:text-sm font-semibold rounded-r-lg border border-transparent 
          outline-none group-focus-within:ring-2 group-focus-within:ring-brand group-focus-within:border-transparentactive:border-none active:ring-0 group-hover:ring-2 group-hover:ring-brand group-hover:border-transparent`
            )}
          >
            Get Invited
          </button>
        </>
      )}
    </form>
  )
}

export default WaitlistInvite
