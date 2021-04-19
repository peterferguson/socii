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
import Cross from "@icons/cross.svg";
import Check from "@icons/check.svg";
import { UserContext } from "@lib/context";
import Head from "@components/Head";
import { useContext } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import router from "next/router";
import { useState, useRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { handleEnterKeyDown } from "@utils/helper";

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
    router.push("/"); // TODO: Direct to the users home page
    toast.success(`Welcome ${userFirstName(user)}`);
  }
});

export default function Enter(props) {
  const { user, username } = useContext(UserContext);
  const [referred, setReferred] = useState(undefined);

  return (
    <main className="bg-gray-50 h-screen">
      <Head title="Enter" description="Sign up for this amazing app!" />
      <div className="py-3 max-w-xl mx-6 sm:mx-auto">
        {!referred && (
          <div className="w-full text-center py-8 text-4xl font-bold font-work-sans">
            Have you got a Referral?
          </div>
        )}
        <BackdropFilter
          className="px-6 sm:px-4 py-8 bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-60 border border-gray-200"
          filter={"blur(10px) sepia(50%)"}
          canvasFallback={true}
          // html2canvasOpts={{ allowTaint: true }}
        >
          <div className="max-w-md mx-auto">
            {!referred && (
              <>
                {/* <div className="w-full text-center pt-8 text-3xl font-bold font-work-sans">
                  Have you got a Referral?
                </div> */}
                <div className="w-full text-center text-md pt-4 font-bold font-work-sans">
                  Sorry this is a pre-Alpha (version 0.0) limited release.
                </div>
                <div className="w-full text-center text-md pb-4 font-bold font-work-sans">
                  You will need a referral code to continue
                </div>
                <ReferralVerification referred setReferred={setReferred} />
              </>
            )}
            {referred && (
              <>
                <div className="w-full text-center p-8 text-3xl font-bold font-work-sans">
                  Sign Up!
                </div>
                <div className="">
                  <PhoneSignUp />
                </div>
                <div className="leading-6 sm:text-lg sm:leading-7"></div>
                <div className="w-full border-b py-3 border-gray-400 h-3.5 text-center">
                  <span className="py-0 px-2.5 bg-gray-50 text-gray-400">
                    Or continue with
                  </span>
                </div>
                {!user && !username && <SignInButtons />}{" "}
              </>
            )}
          </div>
        </BackdropFilter>
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
            className="w-14 h-14 justify-center btn-transition rounded m-2 p-2 border-solid border-2 border-gray-900"
            onClick={() => signInPopUp(option.provider)}
          />
        );
      })}
    </div>
  );
}

// * Referral Code mechanism
function ReferralVerification({ referred, setReferred }) {
  const [invited, setInvited] = useState(undefined); // * need this and referred as referred was updating to true before being set to false for some reason
  const [code, setCode] = useState("");

  // Step 1 - Verify Invite
  useEffect(() => {
    if (code.length === 20) {
      const ref = firestore
        .collectionGroup("invites")
        .where("referralCode", "==", code);
      toast.promise(
        ref.get().then(({ empty }) => {
          setInvited(!empty);
          setReferred(!empty);
          if (empty) {throw "nope"}
        }),
        {
          loading: "Checking...",
          success: "Hey you have been invited!",
          error: "Sorry you haven't been invited yet 😞",
        }
      );
    }
  }, [code]);

  return (
    <>
      <fieldset>
        <p className="text-md font-semibold pb-2 font-work-sans">
          Enter Your Referral Code
        </p>
        <div
          className="appearance-none flex w-full bg-gray-100 text-gray-700 border
         border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
         focus:bg-gray-50 focus:border-gray-500"
        >
          <input
            className="bg-gray-100 w-2/3 sm:w-full appearance-none focus:outline-none"
            maxLength={20}
            placeholder="Oh someones popular!"
            onChange={(e) => setCode(e.target.value)}
          />
          <div
            className={`bg-gray-100 text-sm sm:text-tiny ${
              code.length === 20 && invited
                ? "text-green-400 btn-transition"
                : "text-red-400"
            } p-0.5 align-middle`}
          >
            {code.length === 20 && invited ? (
              <Check className="w-6" />
            ) : (
              <Cross className="w-6" />
            )}
          </div>
        </div>
      </fieldset>
    </>
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

  return (
    <>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div className="" ref={element}></div>
    </>
  );
}

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
          <div className="bg-gray-100 h-full text-sm sm:text-base text-gray-400 pt-0.5 align-middle">
            +44
          </div>
          <div className="border-l w-1 h-7 border-gray-400 ml-2 pr-2"></div>
          <input
            className="bg-gray-100 w-2/3 sm:w-full  appearance-none focus:outline-none  "
            type="tel"
            maxLength={10}
            placeholder="79 1234 5678"
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
              <Check className="w-6" onClick={signInWithPhoneNumber} />
            ) : (
              <Cross className="w-6" />
            )}
          </div>
        </div>

        {/* {phoneNumber.length === 13 &&
          invited != undefined &&
          (invited ? (
            <>
              <p className="text-center">Hey you have been invited!</p>
              <p className="text-center">
                Welcome to the world best social investment app
              </p>
            </>
          ) : (
            <p className="text-center">Sorry you haven't been invited yet 😞</p>
          ))} */}
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

// TODO: Implement this into the UI
function SendInvites({ user }) {
  const numberOfInvites = 2; // * The number of invites available to each user
  const query = firestore.collection("invites").where("sender", "==", user.uid);
  const [invites] = useCollectionData(query);

  const [digits, setDigits] = useState("");
  const phoneNumber = `+44${digits}`;

  const sendInvite = async () => {
    const inviteRef = firestore.collection("invites").doc(phoneNumber);
    await inviteRef.set({
      phoneNumber,
      sender: user.uid,
    });
  };

  return (
    <div>
      <h1>Invite Your Friends</h1>
      {invites?.map((data) => (
        <p>You invited {data?.phoneNumber}</p>
      ))}

      {invites?.length < numberOfInvites && (
        <>
          <input value={digits} onChange={(e) => setDigits(e.target.value)} />
          <button onClick={sendInvite}>Send Invite</button>
        </>
      )}
    </div>
  );
}

// * Email sign up form
function EmailSignUp() {
  return (
    <form onSubmit={null}>
      <p className="text-md">Email</p>
      <div className="w-full">
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500"
          type="email"
          placeholder="warren@buffet.com"
        />
      </div>
      <p className="text-md">Password</p>
      <div className="w-full">
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500"
          type="password"
          placeholder="**********"
        />
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <input className="ml-2 leading-tight" type="checkbox" />
            <span className="text-sm"> Remember me</span>
          </div>
          <div>
            <a
              className="font-bold text-sm text-brand hover:text-brand-dark"
              href="#password-request"
            >
              forgot password?
            </a>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn-transition rounded bg-brand-light hover:bg-brand active:bg-brand-dark w-full text-white py-3 px-4 mb-3 leading-tight font-bold"
        disabled={false}
      >
        Sign in
      </button>
    </form>
  );
}
