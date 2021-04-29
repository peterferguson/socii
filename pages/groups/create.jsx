import { useState, useEffect, useCallback, useContext } from "react";
import { RadioGroup } from "@headlessui/react";
import { firestore, serverTimestamp } from "@lib/firebase";
import { groupPrivacyOptions } from "@lib/constants";
import { UserContext } from "@lib/context";

import CheckIcon from "@components/BackgroundCheck";
import CrossIcon from "@icons/cross.svg";
import debounce from "lodash/debounce";
import toast from "react-hot-toast";

export default function Create() {
  const { user, username } = useContext(UserContext);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [privacyOption, setPrivacyOption] = useState(groupPrivacyOptions[1]);
  const [isValidGroupName, setisValidGroupName] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value;
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length >= 3) {
      setGroupName(val);
      setLoading(false);
      setisValidGroupName(false);
    } else {
      setGroupName("");
      setisValidGroupName(false);
    }

    if (re.test(val)) {
      setGroupName(val);
      setLoading(true);
      setisValidGroupName(false);
    }
  };

  useEffect(() => {
    checkGroupName(groupName);
  }, [groupName]);

  // Hit the database for groupName match after each debounced change
  // useCallback is required for debounce to work
  const checkGroupName = useCallback(
    debounce(async (name) => {
      if (name.length >= 3) {
        const nameQuery = firestore
          .collection("groups")
          .where("groupName", "==", name);

        const { empty } = await nameQuery.get();

        setisValidGroupName(empty);
        if (!empty) {
          toast.error(`Sorry the group name ${name} is taken`);
        }
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <main className="bg-gray-50 h-screen w-screen justify-center items-center flex">
      <form className="w-full sm:w-2/3 my-16">
        <div
          className="appearance-none bg-brand-light bg-opacity-10 \
                    text-gray-700 border border-gray-300 rounded-t-3xl sm:rounded-xl py-3 px-4 mb-3 \
                    leading-tight focus:outline-none focus:bg-gray-50 \
                    focus:border-gray-500"
        >
          <div className="p-4 font-bold text-xl font-work-sans">
            Create an Investment Group
          </div>
          <div
            className="appearance-none flex w-11/12 bg-white text-gray-700 
                     border border-brand-dark border-opacity-30 \
                     rounded-lg py-3 px-4 mb-3 ml-4 leading-tight focus:outline-none \
                     active:border-opacity-100 active:border-brand-light
                     focus:border-opacity-100 focus:border-brand-light"
          >
            <input
              className="bg-white w-2/3 sm:w-full flex-grow appearance-none focus:outline-none"
              type="text"
              placeholder="Investment Group Name"
              onChange={onChange}
            />
            <div
              className={`bg-white text-sm sm:text-tiny ${
                isValidGroupName
                  ? "text-brand-light btn-transition"
                  : "text-red-400"
              } p-0.5 align-middle`}
              onKeyDown={null}
            >
              {isValidGroupName ? (
                <CheckIcon className="w-6" onClick={null} />
              ) : (
                <CrossIcon className="w-6" />
              )}
            </div>
          </div>
          <div className="py-4 px-6 font-bold text-md font-work-sans">
            Add a short description
          </div>
          <div
            className="appearance-none flex w-11/12 bg-white text-gray-700 
                     border border-brand-dark border-opacity-30 \
                     rounded-lg py-3 px-4 mb-3 ml-4 leading-tight focus:outline-none \
                     active:border-opacity-100 active:border-brand-light
                     focus:border-opacity-100 focus:border-brand-light"
          >
            <input
              className="bg-white w-2/3 sm:w-full flex-grow appearance-none focus:outline-none text-tiny sm:text-base"
              type="text"
              placeholder="Best active value/dividend/growth investment club around!"
              onChange={(e) => setGroupDescription(e.target.value)}
            />
          </div>
          <div className="p-4 font-bold text-md font-work-sans">
            Group Privacy
          </div>
          <PrivacyOptions
            privacyOption={privacyOption}
            setPrivacyOption={setPrivacyOption}
          />
          <button
            className="btn w-11/12 my-8"
            onClick={(e) =>
              isValidGroupName
                ? createGroup(
                    e,
                    user,
                    username,
                    groupName,
                    privacyOption,
                    groupDescription
                  )
                : null
            }
          >
            Create!
          </button>
        </div>
      </form>
    </main>
  );
}

function PrivacyOptions({ className, privacyOption, setPrivacyOption }) {
  return (
    <div
      className={`w-11/12 pl-8 flex-grow max-w-md sm:max-w-none ${className}`}
    >
      <RadioGroup value={privacyOption} onChange={setPrivacyOption}>
        <RadioGroup.Label className="sr-only">Privacy option</RadioGroup.Label>
        <div
          className="flex-grow space-x-0 sm:space-x-8 space-y-2 sm:space-y-0 \
                        sm:flex flex-col sm:flex-row"
        >
          {groupPrivacyOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active }) =>
                `${
                  active
                    ? "ring-2 ring-offset-2 ring-offset-light-blue-300 \
                         ring-brand-light ring-opacity-60"
                    : ""
                }
                     bg-white relative rounded-lg shadow-md px-5 py-4 cursor-pointer \
                     focus:outline-none flex-1`
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked ? "text-brand-light" : "text-gray-900"
                          }`}
                        >
                          {option.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? "text-black" : "text-gray-500"
                          }`}
                        >
                          <span>{option.description}</span>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="flex-shrink-0 text-brand-light">
                        <CheckIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

const createGroup = async (
  e,
  user,
  username,
  groupName,
  privacyOption,
  groupDescription
) => {
  e.preventDefault();
  // const router = useRouter();
  
  const userGroupRef = firestore
    .collection(`users/${user.uid}/groups/`)
    .doc(groupName);
  const groupRef = firestore.collection("groups").doc(groupName);
  const investorsRef = groupRef.collection("investors").doc(username);

  const batch = firestore.batch();
  batch.set(userGroupRef, { groupName, joinDate: serverTimestamp() });
  batch.set(groupRef, {
    groupDescription,
    groupName,
    privacyOption,
    groupType: "", // TODO: Implement group types (dividend/active/value/growth)
    startDate: serverTimestamp(),
  });
  batch.set(investorsRef, { isFounder: true, joinDate: serverTimestamp() });
  await batch.commit();

  // Imperative navigation after doc is set
  // router.push(`/groups/${groupName}`);
};
