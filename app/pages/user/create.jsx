import React, { useState, useEffect, useCallback, useContext } from "react";

import { UserContext } from "@lib/context";
import { firestore } from "@lib/firebase";
import CheckIcon from "@components/BackgroundCheck";
import debounce from "lodash/debounce";
import CrossIcon from "@icons/cross.svg";
import toast from "react-hot-toast";

export default function Username(props) {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [isValidUsername, setisValidUsername] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value;
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length >= 3) {
      setUsername(val);
      setLoading(false);
      setisValidUsername(false);
    } else {
      setUsername("");
      setisValidUsername(false);
    }

    if (re.test(val)) {
      setUsername(val);
      setLoading(true);
      setisValidUsername(false);
    }
  };

  useEffect(() => {
    checkUsername(username);
  }, [username]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (name) => {
      if (name.length >= 3) {
        const nameQuery = firestore
          .collection("users")
          .where("username", "==", name);

        const { empty } = await nameQuery.get();

        setisValidUsername(empty);
        if (!empty) {
          toast.error(`Sorry the username ${name} is taken`);
        }
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <main className="flex items-center justify-center w-screen h-screen bg-gray-50">
      <form className="w-full my-16 sm:w-2/3">
        <div
          className="px-4 py-3 m-4 leading-tight text-gray-700 border border-gray-300 appearance-none bg-brand-light bg-opacity-10 rounded-xl sm:mb-3 focus:outline-none focus:bg-gray-50 focus:border-gray-500"
        >
          <div className="p-4 text-xl font-bold font-work-sans">
            Choose a username
          </div>
          <div
            className="flex w-11/12 px-4 py-3 mb-3 ml-4 leading-tight text-gray-700 bg-white border rounded-lg appearance-none border-brand-dark border-opacity-30 focus:outline-none active:border-opacity-100 active:border-brand-light focus:border-opacity-100 focus:border-brand-light"
          >
            <input
              className="flex-grow w-2/3 bg-white appearance-none sm:w-full focus:outline-none"
              type="text"
              placeholder="ElonMuskett"
              onChange={onChange}
            />
            <div
              className={`bg-white text-sm sm:text-tiny ${
                isValidUsername
                  ? "text-brand-light btn-transition"
                  : "text-red-400"
              } p-0.5 align-middle`}
              onKeyDown={null}
            >
              {isValidUsername ? (
                <CheckIcon className="w-6" onClick={null} />
              ) : (
                <CrossIcon className="w-6" />
              )}
            </div>
          </div>
          <button
            className="w-11/12 my-4 btn"
            onClick={(e) =>
              isValidUsername ? createUsername(e, user, username) : null
            }
          >
            Choose!
          </button>
        </div>
      </form>
    </main>
  );
}

const createUsername = async (e, user, username) => {
  //   const router = useRouter();
  e.preventDefault();

  const userRef = firestore.collection(`users`).doc(user.uid);
  const usernameRef = firestore.collection("usernames").doc(username);

  const batch = firestore.batch();
  batch.set(userRef, {
    username: username,
    photoURL: user.photoURL,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
  });
  batch.set(usernameRef, { uid: user.uid });
  await batch.commit();

  //   // Imperative navigation after doc is set
  //   router.push(`/username/${username}`);
};
