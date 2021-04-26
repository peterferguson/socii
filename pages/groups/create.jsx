import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

export default function Create() {
  const [groupName, setGroupName] = useState("");
  return (
    <main className="bg-gray-50 h-screen w-screen justify-center flex">
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
          <input
            className="h-8 ml-4 pl-4 border border-brand-dark border-opacity-30 \
                       rounded-lg w-11/12 sm:w-2/3 appearance-none focus:outline-none"
            type="text"
            placeholder="Investment Group Name"
            onChange={(e) => {
              validateGroupName(e.target.value)
                ? setGroupName(e.target.value)
                : null;
            }}
          />
          <div className="p-4 font-bold text-md font-work-sans">
            Group Privacy
          </div>
          <PrivacyOptions className="px-4"/>
        </div>
      </form>
    </main>
  );
}

// TODO: Write function to check against the db & to reject explicit terms
function validateGroupName(name) {
    return (
        name
    )
}

const privacyOptions = [
  {
    name: "Private",
    desc: "Only group members can see the activity feed",
  },
  {
    name: "Public",
    desc: "Anyone can see the activity feed",
  },
];

function PrivacyOptions(props) {
  const [selected, setSelected] = useState(privacyOptions[1]);

  return (
    <div className={`w-full max-w-md sm:max-w-none mx-auto ${props.className}`}>
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">Privacy option</RadioGroup.Label>
        <div className="space-x-0 sm:space-x-12 space-y-2 sm:space-y-0 sm:flex flex-col sm:flex-row">
          {privacyOptions.map((option) => (
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
                          <span>
                            {option.desc}
                          </span>
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

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="currentColor" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
