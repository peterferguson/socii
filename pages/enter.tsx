import {
  auth,
  userFirstName,
  firestore,
} from "@lib/firebase";
import { signInOptions } from "@lib/constants";
import { UserContext } from "@lib/context";
import { useState, useEffect, useCallback, useContext } from "react";
import { handleEnterKeyDown, validateEmail } from "@utils/helper";

import MailIcon from "@icons/mail.svg";
import CheckIcon from "@icons/check.svg";
import CrossIcon from "@icons/cross.svg";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import router from "next/router";

auth.onAuthStateChanged((user) => {
  if (user) {
    toast.dismiss();
    // TODO: If a user already belongs to a group redirect there first
    // TODO: Check the group first since if they are in a group they will already have a username
    router.push(user ? "/groups/create" : "/username/create");
    toast.success(`Welcome ${userFirstName(user)}`);
  }
});

// ? Should we REQUIRE that the user login with email
// TODO: Add user info to users colleciton on sign up
// TODO: Implement passwordless login
// TODO: Implement account linking
// TODO: Implement invite system
// TODO: Implement a route for invitees which has the invited email so we can bypass the auth verification & attach the email to whatever auth user is provided

export default function Enter(props) {
  const { user } = useContext(UserContext);

  const [verified, setVerified] = useState(null);

  return (
    <main className="bg-gray-50 h-screen">
      <div className="flex items-center justify-center min-h-screen">
        <div className="py-3 max-w-xl mx-6 sm:mx-auto">
          <div
            className="px-6 sm:px-4 py-8 bg-white shadow-lg rounded-3xl \
                       bg-clip-padding bg-opacity-60 border border-gray-200"
          >
            <div className="max-w-md mx-auto">
              <div className="w-full text-center p-8 text-3xl font-bold font-work-sans">
                Sign Up!
              </div>
              <div className="flex flex-col">
                <span className="py-2 font-bold font-work-sans leading text-md">
                  Email
                </span>
                <EmailSignUp verified={verified} setVerified={setVerified} />
              </div>
              <div className="leading-6 sm:text-lg sm:leading-7"></div>
              <div className="w-full border-b py-3 border-gray-400 h-3.5 text-center">
                <span className="py-0 px-2.5 bg-gray-50 text-gray-400">
                  Or continue with
                </span>
              </div>
              {!user && <SignInButtons verified={verified} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// * Sign in with Google button
function SignInButtons({ verified }) {
  const signInPopUp = async (authProvider) =>
    await auth.signInWithPopup(authProvider);

  return (
    <div className="flex justify-center p-8 space-x-8">
      {signInOptions.map((option) => {
        return (
          <option.logo
            className={`w-14 h-14 justify-center rounded m-2 p-2 \
            border-solid border-2 border-gray-900 ${
              verified ? "btn-transition" : ""
            }`}
            onClick={() => (verified ? signInPopUp(option.provider) : null)}
          />
        );
      })}
    </div>
  );
}

// * Email sign up form
function EmailSignUp({ verified, setVerified }) {
  const [email, setEmail] = useState(undefined);

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
          setVerified(isUser || isInvited);
          if (!(isUser || isInvited)) {
            throw "nope";
          }
        }
      );

      toast.promise(verified, {
        loading: "Checking...",
        success: "Hey you have been invited!",
        error:
          "Sorry this is a pre-Alpha (version 0.0) limited release. \
          You have to be invited 😞.",
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

  const emailSignInHandler = (email) => {
    auth
      .sendSignInLinkToEmail(email, {
        url: `http://localhost:3000/enter?email?${email}`,
        handleCodeInApp: true,
      })
      .then(() => {
        toast(
          "👋 Thanks for signing up! Please verify your email address and \
            we will see you very soon!"
        );
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    if (auth.isSignInWithEmailLink(window.location.href)) {
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      auth
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          console.log(result.user.uid);
          console.log(result.user.displayName);
        })
        .catch((error) => {});

      // ! The following allows links to another verification type
      // var credential = credentialWithLink(email, window.location.href);

      // // Link the credential to the current user.
      // auth.currentUser
      //   .linkWithCredential(credential)
      //   .then((usercred) => {
      //     // The provider is now successfully linked.
      //     // The phone user can now sign in with their phone number or email.
      //   })
      //   .catch((error) => {
      //     // Some error occurred.
      //   });
    }
  };

  return (
    <form onSubmit={() => emailSignInHandler(email)}>
      <div
        className="appearance-none flex flex-none w-full bg-gray-100 text-gray-700 border
         border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
         focus:bg-gray-50 focus:border-gray-500"
      >
        <MailIcon
          className="bg-gray-100 h-full text-sm sm:text-base text-gray-400 /
                      pt-0.5 mr-2 align-middle w-8"
        />
        <input
          className="bg-gray-100 flex flex-grow w-2/3 sm:w-full appearance-none \
                      focus:outline-none "
          type="email"
          placeholder="warren@buffet.com"
          onChange={(e) => {
            validateEmail(e.target.value)
              ? setEmail(e.target.value)
              : setEmail(undefined);
          }}
        />
        <div
          className={`flex flex-none bg-gray-100 text-sm sm:text-tiny ${
            validateEmail(email) && verified
              ? "text-green-400 btn-transition"
              : "text-red-400"
          } p-0.5 align-middle`}
          onKeyDown={(e) =>
            handleEnterKeyDown(e, () => emailSignInHandler(email))
          }
        >
          {validateEmail(email) && verified ? (
            <CheckIcon
              className="w-6"
              onClick={() => emailSignInHandler(email)}
            />
          ) : (
            <CrossIcon className="w-6" />
          )}
        </div>
      </div>
      <button
        type="submit"
        className={`${
          verified ? "btn-transition" : ""
        } rounded bg-brand-light hover:bg-brand active:bg-brand-dark w-full \
        text-white my-4 py-3 px-4 leading-tight font-bold`}
        disabled={false}
        onClick={() => emailSignInHandler(email)}
      >
        Sign in
      </button>
    </form>
  );
}
