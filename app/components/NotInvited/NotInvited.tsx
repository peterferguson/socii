import { JoinWaitlistToastDynamic } from "@components/JoinWaitlistToast"
import { default as Socii } from "@components/SociiSVG"
import { useAuth } from "@hooks/useAuth"
import { tw } from "@utils/tw"
import Link from "next/link"
import React, { useEffect, useRef } from "react"
import toast, { useToasterStore } from "react-hot-toast"

const NotInvited = () => {
  const { user } = useAuth()
  const email = useRef(user?.email)
  const { toasts } = useToasterStore()

  useEffect(() => {
    if (user?.isOnWaitlist !== false && user?.isInvited === false) {
      toast.dismiss()
      toast.custom((t) => <JoinWaitlistToastDynamic t={t} email={email} />, {
        duration: 15000,
        position: "top-center",
      })
    } else {
      toast.dismiss()
      toast.error("Your invite has not been accepted yet! You're 12th in the queue...")
    }
    return () => {
      setTimeout(() => toasts.map((t) => toast.dismiss(t.id)), 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  return (
    <div className="absolute z-10 w-full max-w-md p-10 bg-white space-y-8 rounded-xl">
      <div className="flex flex-col items-center justify-center text-center">
        <Link href="/">
          <a className="flex flex-row mx-4 text-5xl font-primary">
            <span className="-mr-0.5">s</span>
            <Socii className={tw("mt-[0.25rem]", !toasts.length && "animate-bounce")} />
            <span className="-ml-0.5">cii</span>
          </a>
        </Link>
        <p className="mt-2 text-base text-gray-600">
          Hey it looks like you haven&apos;t been invited yet!
        </p>
        <p className="text-gray-200 text-tiny hover:text-brand-pink">
          Hint: click the bouncy thing to go home
        </p>
      </div>
    </div>
  )
}

export default NotInvited
