import React, { useState, useEffect } from "react"
import { firestore } from "@lib/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Dialog } from "@headlessui/react"

export default function Invites() {
  return (
    <>
      <div className="p-4 font-bold text-md font-secondary">
        Invite Friends
        <span className="pl-1 font-extrabold text-brand-dark">
          (Think carefully you only have 2 invites!)
        </span>
      </div>
      <p className="px-4 pb-2 text-base font-semibold font-secondary">
        Enter a UK Phone Number
      </p>
      <PhoneInvite className="px-4" />
      <PhoneInvite className="px-4" />
    </>
  )
}

// * Phone sign up & invite system
function PhoneInvite() {
  const [digits, setDigits] = useState("")
  const [previouslyInvited, setPreviouslyInvited] = useState(false)
  const phoneNumber = `+44${digits}`

  // Step 1 - Verify Invite is not already invited
  useEffect(() => {
    if (phoneNumber.length === 13) {
      const ref = firestore.collection("invites").doc(phoneNumber)
      ref.get().then(({ exists }) => {
        setPreviouslyInvited(exists)
      })
    }
  }, [phoneNumber])

  return (
    <div>
      <fieldset>
        <div className="flex w-11/12 px-4 py-3 mb-3 ml-4 leading-tight text-gray-700 bg-white border rounded-lg appearance-none border-brand-dark border-opacity-30 \ focus:outline-none focus:border-opacity-100 focus:border-brand">
          <div className="h-full pt-1 text-sm text-black align-middle bg-white sm:text-base sm:pt-0.5">
            +44
          </div>
          <div className="w-1 pr-2 ml-2 border-l border-gray-400 h-7"></div>
          <input
            className="flex-grow w-2/3 bg-white border-transparent appearance-none sm:w-full h-[28px] focus:border-none focus:outline-none focus:ring-0"
            type="tel"
            maxLength={10}
            placeholder="7912345678"
            onChange={(e) => setDigits(e.target.value)}
          />
          <div
            className={`bg-white text-md sm:text-md pt-1 sm:pt-0.5 ${
              phoneNumber.length === 13 ? "text-brand btn-transition" : "text-red-400"
            } p-0.5 align-middle`}
            onClick={phoneNumber.length === 13 ? null : null}
            onKeyDown={phoneNumber.length === 13 ? null : null}
          >
            Send
          </div>
        </div>
      </fieldset>
    </div>
  )
}

// TODO: Implement function to send invites by text
// TODO: Maybe send a email link or some sharable link with query referencing referral user id
function SendInvites({ user }) {
  const numberOfInvites = 2 // * The number of invites available to each user
  const query = firestore.collection(`users/${user.uid}/invites`)
  const [invites] = useCollectionData(query)

  const [email, setEmail] = useState("")

  const sendInvite = async () => {
    const inviteRef = firestore.collection(`users/${user.uid}/invites`).doc()
    await inviteRef.set({ email })
  }

  return (
    <div>
      <h1>Invite Your Friends</h1>
      {invites?.map((data, i) => (
        <p key={`number-${i}`}>You invited {data?.phoneNumber}</p>
      ))}

      {invites?.length < numberOfInvites && (
        <>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={sendInvite}>Send Invite</button>
        </>
      )}
    </div>
  )
}

// TODO: Implement this for invitation buttons
// TODO: Create a firestore read on each users invites so that if they return to this screen the phone numbers are prefilled
// TODO: ... This will act to disable new invitations and allow users to see who they invited
function Invited(previouslyInvited, phoneNumber) {
  let [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Overlay />

      <Dialog.Title>User Already Invited</Dialog.Title>
      <Dialog.Description>
        Hey someone has already invited the owner of {phoneNumber}
      </Dialog.Description>

      <p>Please invite another phone number!</p>

      <button onClick={() => setIsOpen(false)}>Ok</button>
    </Dialog>
  )
}
