import { tw } from "@utils/tw"
import { useState } from "react"
import { joinWaitlist } from "@utils/joinWaitlist"
import { useAuth } from "@hooks/useAuth"

function WaitlistInvite({ invited, setInvited }) {
  const [email, setEmail] = useState("")
  const [clicked, setClicked] = useState(false)
  const { user } = useAuth()
  // 1
  // TODO: Write a function to listen to notion for confirmation to add the user
  // TODO: to the invited list.
  // 2
  // TODO: If the user has already been invited direct them to the enter page

  return (
    <div className="flex justify-center w-full max-w-lg font-secondary">
      {invited ? (
        <h1 className="text-lg font-semibold font-primary sm:text-2xl md:text-3xl md:leading-snug">
          Thanks for signing up!
          <p className="text-base font-thin font-secondary">
            Keep an eye on your inbox for your invite.
          </p>
        </h1>
      ) : (
        user?.email ? (
          <div className="relative w-full ml-4 sm:ml-6 group umami--click--join-waitlist-button">
            <div className="absolute inset-0 opacity-50 gradient-flow group-focus:-inset-0.5 group-focus-within:-inset-0.5 group-hover:-inset-0.5 group-focus:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100 rounded-2xl blur transition duration-500 group-hover:duration-200" />
            <div className="relative flex justify-center  h-12">
              <button
                type="submit"
                className={tw(
                  clicked ? "pointer-events-none opacity-75" : "",
                  "relative w-full py-1 px-2 gradient-flow text-white text-xs md:text-xs",
                  "rounded-2xl border-1",
                  "outline-none group-hover:ring-0 group-hover:border-transparent leading-0",
                  "umami--click--waitlist-submit-button"
                )}
                onClick={async (e) => {
                  setClicked(true)
                  joinWaitlist(user.email)
                  setInvited(true)
                }}
              >
                Get Invited
              </button>
            </div>
          </div>
        ) :(
          // form option included to handle the case of a user on a private browser, or the option to use email is auth somehow fails
          <form
            className="flex justify-center w-full max-w-lg font-secondary"
            onSubmit={async (e) => {
              e.preventDefault()
              setClicked(true)
              joinWaitlist(email)
              setInvited(true)
            }}
          >
            <div className="relative w-full ml-4 sm:ml-6 group umami--click--join-waitlist-button">
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
                    "relative py-1 px-2 gradient-flow text-white text-tiniest md:text-tiny",
                    "rounded-r-2xl border-0",
                    "outline-none group-hover:ring-0 group-hover:border-transparent leading-0",
                    "umami--click--waitlist-submit-button"
                  )}
                >
                  Get Invited
                </button>
              </div>
            </div>
          </form>
        )
      )}
    </div>
  )
}

export default WaitlistInvite
