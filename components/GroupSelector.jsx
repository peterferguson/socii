import { firestore } from "@lib/firebase";
import { SelectedGroupContext } from "@lib/context";
import { useState, useContext } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { RadioGroup } from "@headlessui/react";
import CheckIcon from "@components/BackgroundCheck";

export default function GroupSelectorRadioGroup({ groupNames, className="" }) {
  const { selectedGroup, changeSelectedGroup } = useContext(SelectedGroupContext);
  const [groupSelected, setGroupSelected] = useState(selectedGroup);

  const setSelectedGroup = (group) => {
    changeSelectedGroup(group.groupName)
    setGroupSelected(group)
  }

  const groups = groupNames.map((name) => {
    const docRef = firestore.doc(`groups/${name}`);
    const [value] = useDocumentDataOnce(docRef);

    return {
      name,
      type: value?.type,
      privacyOption: value?.privacyOption.name,
      description: value?.groupDescription,
    };
  });

  return (
    <div
      className={`w-11/12 pl-8 flex-grow max-w-md sm:max-w-none ${className}`}
    >
      <RadioGroup value={groupSelected} onChange={setSelectedGroup}>
        <RadioGroup.Label className="sr-only">
          Select an Investment Group
        </RadioGroup.Label>
        <div
          className="flex-grow space-x-0 sm:space-x-8 space-y-2 sm:space-y-0 \
                                  sm:flex flex-col sm:flex-row"
        >
          {groups.map((group) => (
            <RadioGroup.Option
              key={group.name}
              value={group}
              className={({ active }) =>
                `${
                  active
                    ? "ring-2 ring-offset-2 ring-offset-light-blue-300 \
                                   ring-brand-light ring-opacity-60"
                    : ""
                }
                               bg-white relative rounded-lg shadow-md px-4 py-2 cursor-pointer \
                               focus:outline-none flex-1`
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center content-between">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium ${
                            checked ? "text-brand-light" : "text-gray-900"
                          }`}
                        >
                          {group.name}
                        </RadioGroup.Label>
                        <div className="flex-grow" />
                        <RadioGroup.Description
                          as="span"
                          className={`flex flex-col ${
                            checked ? "text-light-blue-100" : "text-gray-500"
                          }`}
                        >
                          <span className="text-tiny overflow-ellipsis">
                            {group.description}
                          </span>
                          <span className="text-tiny text-center bg-teal-200 text-white font-work-sans rounded-full p-1">
                            {group.privacyOption} Group
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
