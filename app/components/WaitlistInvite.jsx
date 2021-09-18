import { tw } from "@utils/tw"
import { useState } from "react"
import { joinWaitlist } from "../utils/joinWaitlist"

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
      className="flex justify-center w-full max-w-lg font-secondary"
      onSubmit={async (e) => {
        e.preventDefault()
        setClicked(true)
        joinWaitlist(email)
        setInvited(true)
      }}
    >
      {invited ? (
        <h1 className="mt-8 text-2xl font-semibold font-primary sm:text-4xl md:text-5xl md:leading-snug">
          Thanks for signing up!
          <p className="text-xl font-thin font-secondary">
            Keep an eye on your inbox for your invite.
          </p>
        </h1>
      ) : (
        <div className="relative w-full ml-4 sm:ml-6 group">
          <div className="absolute inset-0 opacity-50 gradient-flow group-focus:-inset-0.5 group-focus-within:-inset-0.5 group-hover:-inset-0.5 group-focus:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100 rounded-2xl blur transition duration-500 group-hover:duration-200" />
          <div className="relative flex justify-center w-full h-12">
            <input
              className="relative w-10/12 border-0 outline-none rounded-l-2xl text-tiny sm:text-sm group-focus-within:ring-0 group-focus-within:border-transparent group-hover:ring-0 group-hover:border-transparent"
              type="email"
              required
              placeholder="Your email here"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className={tw(
                clicked ? "pointer-events-none opacity-75" : "",
                `relative py-1 px-2 gradient-flow text-white text-tiniest md:text-tiny rounded-r-2xl border-0
          outline-none group-hover:ring-0 group-hover:border-transparent leading-0`
              )}
            >
              Get Invited
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default WaitlistInvite
