import { useAuth } from "@hooks/useAuth"
import { checkAlreadyOnWaitlist } from "@utils/checkAlreadyOnWaitlist"
import { joinWaitlist } from "@utils/joinWaitlist"
import { tw } from "@utils/tw"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function WaitlistInvite({ invited, setInvited }) {
  const { user, signinWithGoogle } = useAuth()
  const router = useRouter()
  const [ clicked, setClicked ] = useState()

  useEffect(() => {
    if (user?.email) {
      if (user?.username) router.push("/stocks")
      if (user?.isInvited === true) {
        toast.dismiss()
        toast.success(`Your invite has been accepted!`)
        router.push("/user/create")
      } else if (user?.isInvited === false) {
        toast.dismiss()
        toast.success(
          "Your on the waitlist! You're 12th in the queue..."
        )
      }
      if (user?.isOnWaitlist === false && clicked ) {
        joinWaitlist(user.email).then(
          (joinResponse) =>
            // TODO: add error handling for joinWaitlist
            joinResponse.ok &&
            setInvited(true) &&
            toast.success("You've been added to the waitlist")
        )
        setClicked(false)
      }
    }
  }, [
    router,
    setInvited,
    user?.email,
    user?.isInvited,
    user?.isOnWaitlist,
    user?.username,
  ])

  return (
    <div className="flex justify-center w-full max-w-lg font-secondary">
      {invited || user?.isInvited != null ? (
        <div className="relative w-full sm:ml-6 group">
          <div
            className={tw(
              "absolute inset-0 opacity-50 group-focus:-inset-0.5",
              "group-focus-within:-inset-0.5 group-hover:-inset-0.5 group-focus:opacity-100",
              "rounded-2xl",
            )}
          />
          <div className="relative flex justify-center h-12">
            <div
              className={tw(
                "relative w-full py-1 px-2 flex justify-center text-black text-sm md:text-sm",
                "rounded-2xl border-1",
                "outline-none leading-0",
              )}
            >
              <span className="animate-pulse">🎉 </span> 
              <span className="font-bold" > You&#39;re on the waitlist! </span> 
              <span className="animate-pulse"> 🎉</span>
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
          <div className="relative flex justify-center  h-12">
            <button
              type="submit"
              className={tw(
                "relative w-full py-1 px-2 gradient-flow text-white text-xs md:text-s",
                "rounded-2xl border-1",
                "outline-none group-hover:ring-0 group-hover:border-transparent leading-0",
                "umami--click--waitlist-submit-button"
              )}
              onClick={() => {
                user?.username
                  ? setInvited(true)
                  : (setClicked(true) , signinWithGoogle())
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
