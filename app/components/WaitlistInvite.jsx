import { tw } from "@utils/tw"
import { useEffect, useState } from "react"
import { joinWaitlist } from "@utils/joinWaitlist"
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@lib/firebase/client/auth"

function WaitlistInvite({ invited, setInvited }) {
  const [retrieveEmail, setRetrieveEmail] = useState(null)
  const [clicked, setClicked] = useState(false)
  // 1
  // TODO: Write a function to listen to notion for confirmation to add the user
  // TODO: to the invited list.
  // 2
  // TODO: If the user has already been invited direct them to the enter page

  useEffect(()=>{
    if (retrieveEmail){
      const getEmail= async () => {
        const { user: rawUser } = await signInWithPopup(auth, new GoogleAuthProvider())
        joinWaitlist(rawUser.email)
        setInvited(true)
      }
      getEmail()
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[retrieveEmail])

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
              setRetrieveEmail(true)
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
