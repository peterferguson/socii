import {
  auth,
  googleAuthProvider,
  userFirstName,
  facebookAuthProvider,
  firestore,
  recaptchaVerifier,
} from "@lib/firebase";
import AppleLogo from "@icons/apple.svg";
import FacebookLogo from "@icons/fb.svg";
import TwitterLogo from "@icons/twitter.svg";
import GoogleLogo from "@icons/google.svg";
import CrossIcon from "@icons/cross.svg";
import MailIcon from "@icons/mail.svg";
import CheckIcon from "@icons/check.svg";
import { UserContext } from "@lib/context";
import Head from "@components/Head";
import { useCallback, useContext } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import router from "next/router";
import { useState, useRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { handleEnterKeyDown, validateEmail } from "@utils/helper";

const BackdropFilter = dynamic(
  // TODO: There is nothing behind the card for this to work
  () => {
    return import("react-backdrop-filter");
  },
  { ssr: false }
);

auth.onAuthStateChanged((user) => {
  if (user) {
    toast.dismiss();
    router.push("/"); // TODO: Direct to the users home page / group page
    toast.success(`Welcome ${userFirstName(user)}`);
  }
});

// TODO: Update toast to mention the referral system for early users
// TODO: Remove login action of login buttons if not verified
// ? Should we REQUIRE that the user login with email
// TODO: Add user info to users colleciton on sign up
// TODO: Implement passwordless login
// TODO: Implement account linking
// TODO: Implement invite system

export default function Enter(props) {
  const { user } = useContext(UserContext);

  return (
    <main className="bg-gray-50 h-screen">
      <Head title="Enter" description="Sign up for this amazing app!" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="py-3 max-w-xl mx-6 sm:mx-auto">
          <BackdropFilter
            className="px-6 sm:px-4 py-8 bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-60 border border-gray-200"
            filter={"blur(10px) sepia(50%)"}
            canvasFallback={true}
          >
            <div className="max-w-md mx-auto">
              <div className="w-full text-center p-8 text-3xl font-bold font-work-sans">
                Sign Up!
              </div>
              <div className="">
                <EmailSignUp />
              </div>
              <div className="leading-6 sm:text-lg sm:leading-7"></div>
              <div className="w-full border-b py-3 border-gray-400 h-3.5 text-center">
                <span className="py-0 px-2.5 bg-gray-50 text-gray-400">
                  Or continue with
                </span>
              </div>
              {!user && <SignInButtons />}
            </div>
          </BackdropFilter>
        </div>
      </div>
    </main>
  );
}

// * Sign in with Google button
function SignInButtons() {
  const signInPopUp = async (authProvider) =>
    await auth.signInWithPopup(authProvider);

  const signInOptions = [
    { logo: GoogleLogo, provider: googleAuthProvider },
    { logo: AppleLogo, provider: null },
    { logo: TwitterLogo, provider: null },
    { logo: FacebookLogo, provider: facebookAuthProvider },
  ];
  return (
    <div className="flex justify-center p-8 space-x-8">
      {signInOptions.map((option) => {
        return (
          <option.logo
            className="w-14 h-14 justify-center btn-transition rounded m-2 p-2
            border-solid border-2 border-gray-900"
            onClick={() => signInPopUp(option.provider)}
          />
        );
      })}
    </div>
  );
}

// * Phone sign up & invite system
function PhoneSignUp() {
  const [recaptcha, setRecaptcha] = useState(true); // ! Set to true for testing purposes
  const element = useRef(null);

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new recaptchaVerifier(element.current, {
        size: "invisible",
      });

      verifier.verify().then(() => setRecaptcha(verifier));
    }
  }, []);
  // * Verify the phone number exists
  function PhoneNumberVerification({ recaptcha }) {
    const [digits, setDigits] = useState("");
    const [textConfirmationResult, setTextConfirmationResult] = useState(null);
    const [code, setCode] = useState("");

    const phoneNumber = `+44${digits}`;

    // // Step 1 - Verify Invite
    // useEffect(() => {
    //   if (phoneNumber.length === 13) {
    //     const ref = firestore.collection("invites").doc(phoneNumber);
    //     ref.get().then(({ exists }) => {
    //       setInvited(exists);
    //     });
    //   }
    // }, [phoneNumber]);

    // Step 2 - Sign in
    const signInWithPhoneNumber = async () => {
      setTextConfirmationResult(
        await auth.signInWithPhoneNumber(phoneNumber, recaptcha)
      );
    };

    // Step 3 - Verify SMS code
    const verifyCode = async () => {
      const result = await textConfirmationResult.confirm(code);
      console.log(result.user);
    };

    return (
      <div>
        <fieldset>
          <p className="text-md font-semibold pb-2 font-work-sans">
            Enter a UK Phone Number
          </p>
          <div
            className="appearance-none flex w-full bg-gray-100 text-gray-700 border
           border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
           focus:bg-gray-50 focus:border-gray-500"
          >
            <div className="bg-gray-100 h-full text-sm sm:text-base text-black pt-0.5 align-middle">
              +44
            </div>
            <div className="border-l w-1 h-7 border-gray-400 ml-2 pr-2"></div>
            <input
              className="bg-gray-100 w-2/3 sm:w-full  appearance-none focus:outline-none  "
              type="tel"
              maxLength={10}
              placeholder="7912345678"
              onChange={(e) => setDigits(e.target.value)}
            />
            <div
              className={`bg-gray-100 text-sm sm:text-tiny ${
                phoneNumber.length === 13
                  ? "text-green-400 btn-transition"
                  : "text-red-400"
              } p-0.5 align-middle`}
              onKeyDown={(e) => handleEnterKeyDown(e, signInWithPhoneNumber)}
            >
              {phoneNumber.length === 13 ? (
                <CheckIcon className="w-6" onClick={signInWithPhoneNumber} />
              ) : (
                <CrossIcon className="w-6" />
              )}
            </div>
          </div>
        </fieldset>
        {/* // TODO: Implement this into the UI */}
        {textConfirmationResult && (
          <fieldset>
            <label>Verify code</label>
            <br />
            <input value={code} onChange={(e) => setCode(e.target.value)} />

            <button onClick={verifyCode}>Verify Code</button>
          </fieldset>
        )}
      </div>
    );
  }

  return (
    <>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div className="" ref={element}></div>
    </>
  );
}

// TODO: Implement this into the UI
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

// * Email sign up form
function EmailSignUp() {
  const [email, setEmail] = useState(undefined);
  const [referred, setReferred] = useState(null);

  const validateUser = useCallback(
    debounce(async (email) => {
      const inviteRef = firestore
        .collectionGroup("invites")
        .where("email", "==", email)
        .limit(1);

      const userRef = firestore
        .collection("users")
        .where("email", "==", email)
        .limit(1);

      const verified = Promise.all([inviteRef.get(), userRef.get()]).then(
        (values) => {
          const isInvited = !(values[0].empty ?? false);
          const isUser = !(values[1].empty ?? false);
          setReferred(isUser || isInvited);
          if (!(isUser || isInvited)) {
            throw "nope";
          }
        }
      );

      toast.promise(verified, {
        loading: "Checking...",
        success: "Hey you have been invited!",
        error:
          "Sorry this is a pre-Alpha (version 0.0) limited release. You have to be invited 😞.",
        // TODO buttons here to ask for an invite?
      });
    }, 250),
    []
  );
  // Step 1 - Verify Invite
  useEffect(() => {
    if (email) {
      validateUser(email);
    }
  }, [email]);

  return (
    <form onSubmit={null}>
      <div
        className="appearance-none flex w-full bg-gray-100 text-gray-700 border
         border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
         focus:bg-gray-50 focus:border-gray-500"
      >
        <MailIcon className="bg-gray-100 h-full text-sm sm:text-base text-gray-400 pt-0.5 mr-2 align-middle w-8" />
        <input
          className="bg-gray-100 w-2/3 sm:w-full appearance-none focus:outline-none "
          type="email"
          placeholder="warren@buffet.com"
          onChange={(e) => {
            validateEmail(e.target.value)
              ? setEmail(e.target.value)
              : setEmail(undefined);
          }}
        />
        <div
          className={`bg-gray-100 text-sm sm:text-tiny ${
            validateEmail(email) && referred
              ? "text-green-400 btn-transition"
              : "text-red-400"
          } p-0.5 align-middle`}
          onKeyDown={(e) => handleEnterKeyDown(e, null)}
        >
          {validateEmail(email) && referred ? (
            <CheckIcon className="w-6" onClick={null} />
          ) : (
            <CrossIcon className="w-6" />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="btn-transition rounded bg-brand-light hover:bg-brand active:bg-brand-dark w-full text-white my-4 py-3 px-4 leading-tight font-bold"
        disabled={false}
      >
        Sign in
      </button>
    </form>
  );
}
