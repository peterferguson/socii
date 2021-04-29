import { useState, useEffect } from "react";

export default function Invites() {
  return (
    <>
      <div className="p-4 font-bold text-md font-work-sans">
        Invite Friends
        <span className="font-extrabold text-brand-dark">
          (Think carefully you only have 2 invites!)
        </span>
      </div>
      <p className="text-base font-semibold pb-2 px-4 font-work-sans">
        Enter a UK Phone Number
      </p>
      <PhoneInvite className="px-4" />
      <PhoneInvite className="px-4" />
    </>
  );
}

// * Phone sign up & invite system
function PhoneInvite() {
  const [digits, setDigits] = useState("");
  const [previouslyInvited, setPreviouslyInvited] = useState(false);
  const phoneNumber = `+44${digits}`;

  // Step 1 - Verify Invite is not already invited
  useEffect(() => {
    if (phoneNumber.length === 13) {
      const ref = firestore.collection("invites").doc(phoneNumber);
      ref.get().then(({ exists }) => {
        setPreviouslyInvited(exists);
      });
    }
  }, [phoneNumber]);

  return (
    <div>
      <fieldset>
        <div
          className="appearance-none flex w-11/12 bg-white text-gray-700 
                       border border-brand-dark border-opacity-30 \
                       rounded-lg py-3 px-4 mb-3 ml-4 leading-tight focus:outline-none \
                       focus:border-opacity-100 focus:border-brand-light"
        >
          <div className="bg-white h-full text-sm sm:text-base text-black pt-1 sm:pt-0.5 align-middle">
            +44
          </div>
          <div className="border-l w-1 h-7 border-gray-400 ml-2 pr-2"></div>
          <input
            className="bg-white w-2/3 sm:w-full flex-grow appearance-none focus:outline-none"
            type="tel"
            maxLength={10}
            placeholder="7912345678"
            onChange={(e) => setDigits(e.target.value)}
          />
          <div
            className={`bg-white text-md sm:text-md pt-1 sm:pt-0.5 ${
              phoneNumber.length === 13
                ? "text-brand-light btn-transition"
                : "text-red-400"
            } p-0.5 align-middle`}
            onClick={phoneNumber.length === 13 ? null : null}
            onKeyDown={phoneNumber.length === 13 ? null : null}
          >
            Send
          </div>
        </div>
      </fieldset>
    </div>
  );
}

// TODO: Implement function to send invites by text
// TODO: Maybe send a email link or some sharable link with query referencing referral user id
function SendInvites({ user }) {
  const numberOfInvites = 2; // * The number of invites available to each user
  const query = firestore.collection(`users/${user.uid}/invites`);
  const [invites] = useCollectionData(query);

  const [email, setEmail] = useState("");

  const sendInvite = async () => {
    const inviteRef = firestore.collection(`users/${user.uid}/invites`).doc();
    await inviteRef.set({ email });
  };

  return (
    <div>
      <h1>Invite Your Friends</h1>
      {invites?.map((data) => (
        <p>You invited {data?.phoneNumber}</p>
      ))}

      {invites?.length < numberOfInvites && (
        <>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={sendInvite}>Send Invite</button>
        </>
      )}
    </div>
  );
}

// TODO: Implement this for invitation buttons
// TODO: Create a firestore read on each users invites so that if they return to this screen the phone numbers are prefilled
// TODO: ... This will act to disable new invitations and allow users to see who they invited
function Invited(previouslyInvited) {
  let [isOpen, setIsOpen] = useState(true);

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
  );
}
