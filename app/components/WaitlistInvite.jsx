import { joinWaitlist } from "@utils/joinWaitlist"
import { tw } from "@utils/tw"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"

const EMAIL_REGEX =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

function WaitlistInvite({ invited, setInvited }) {
  // const { user, signinWithGoogle } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")

  // useEffect(() => {
  //   if (user?.email) {
  //     if (user?.username) router.push("/stocks")
  //     if (user?.isInvited === true) {
  //       toast.dismiss()
  //       toast.success(`Your invite has been accepted!`)
  //       router.push("/user/create")
  //     } else if (user?.isInvited === false) {
  //       toast.dismiss()
  //       toast.success("Your on the waitlist!")
  //     }
  //     if (user?.isOnWaitlist === false && clicked) {
  //       joinWaitlist(user.email).then(
  //         (joinResponse) =>
  //           // TODO: add error handling for joinWaitlist
  //           joinResponse.ok &&
  //           setInvited(true) &&
  //           toast.success("You've been added to the waitlist")
  //       )
  //       setClicked(false)
  //     }
  //   }
  // }, [
  //   clicked,
  //   router,
  //   setInvited,
  //   user?.email,
  //   user?.isInvited,
  //   user?.isOnWaitlist,
  //   user?.username,
  // ])

  return (
    <div className="flex justify-center w-full max-w-lg font-secondary">
      {invited ? (
        <div className="relative w-full sm:ml-6 group">
          <div
            className={tw(
              "absolute inset-0 opacity-50 group-focus:-inset-0.5",
              "group-focus-within:-inset-0.5 group-hover:-inset-0.5 group-focus:opacity-100",
              "rounded-2xl"
            )}
          />
          <div className="relative flex justify-center h-12">
            <div
              className={tw(
                "relative w-full py-1 px-2 flex justify-center text-black text-sm md:text-sm",
                "rounded-2xl border-1 animate-pulse",
                "outline-none leading-0"
              )}
            >
              <span className="mr-2">🎉 </span>
              <span className="font-bold font-primary">
                You&#39;re on the waitlist!
              </span>
              <span className="ml-2"> 🎉</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full sm:ml-6 group umami--click--join-waitlist-button">
          <div
            className={tw(
              "absolute inset-0 opacity-50 gradient-flow group-focus:-inset-0.5",
              "group-focus-within:-inset-0.5 group-hover:-inset-0.5 group-focus:opacity-100",
              "group-focus-within:opacity-100 group-hover:opacity-100 rounded-2xl blur",
              "transition duration-500 group-hover:duration-200"
            )}
          />
          <div className="relative flex justify-center h-12">
            <input
              type="email"
              className={tw(
                "relative w-full py-1 px-2 flex justify-center text-black text-sm md:text-sm",
                "rounded-l-2xl border-0 focus:ring-0 appearance-none",
                "outline-none leading-0",
                "umami--click--waitlist-email-input"
              )}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className={tw(
                "relative w-1/2 py-1 px-2 gradient-flow text-white text-xs md:text-s",
                "rounded-r-2xl border-1",
                "outline-none group-hover:ring-0 group-hover:border-transparent leading-0",
                "umami--click--waitlist-submit-button"
              )}
              onClick={async () => {
                if (!email) toast.error("Please enter an email")
                else if (!email.match(EMAIL_REGEX))
                  toast.error("Please enter a valid email")
                else {
                  const joinResponse = await joinWaitlist(email)
                  if (joinResponse.ok) {
                    setInvited(true)
                    toast.success("You've been added to the waitlist")
                  }
                }
              }}
            >
              Join the Waitlist!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WaitlistInvite
