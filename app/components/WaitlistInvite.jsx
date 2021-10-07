import { useAuth } from "@hooks/useAuth"
import { checkAlreadyOnWaitlist } from "@utils/checkAlreadyOnWaitlist"
import { joinWaitlist } from "@utils/joinWaitlist"
import { tw } from "@utils/tw"
import { useRouter } from "next/router"
import { useEffect } from "react"
import toast from "react-hot-toast"

function WaitlistInvite({ invited, setInvited }) {
  const { user, signinWithGoogle } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user?.email) {
      if (user?.username) router.push("/stocks")
      if (user?.isInvited === true) {
        toast.dismiss()
        toast.success(`Your invite has been accepted!`)
        router.push("/user/create")
      } else if (user?.isInvited === false) {
        toast.dismiss()
        toast.error(
          "Your invite has not been accepted yet! You're 12th in the queue..."
        )
      }
      if (user?.isOnWaitlist === "false") {
        joinWaitlist(user.email).then(
          (joinResponse) =>
            // TODO: add error handling for joinWaitlist
            joinResponse.ok &&
            setInvited(true) &&
            toast.success("You've been added to the waitlist")
        )
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
      {invited ? (
        <h1 className="text-lg font-semibold font-primary sm:text-2xl md:text-3xl md:leading-snug">
          Thanks for signing up!
          <p className="text-base font-thin font-secondary">
            Keep an eye on your inbox for your invite.
          </p>
        </h1>
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
                "relative w-full py-1 px-2 gradient-flow text-white text-xs md:text-xs",
                "rounded-2xl border-1",
                "outline-none group-hover:ring-0 group-hover:border-transparent leading-0",
                "umami--click--waitlist-submit-button"
              )}
              onClick={() => {
                user?.username
                  ? router.push("/stocks")
                  : user?.email
                  ? router.push("/enter")
                  : signinWithGoogle()
              }}
            >
              Get Invited
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WaitlistInvite
