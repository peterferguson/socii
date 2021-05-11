import { useState } from "react";
import { uncamelCase } from "@utils/helper";

const Multiselect = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);
  const [dropdownItems, setDropdownItems] = useState(items);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDropdown = () => setDropdown(!dropdown);

  // adds new item to multiselect
  const addTag = (item) => {
    setDropdownItems(dropdownItems.filter((e) => e !== item));
    setSelectedItems(selectedItems.concat(item));
    setDropdown(false);
  };

  // removes item from multiselect
  const removeTag = (item) => {
    setSelectedItems(selectedItems.filter((e) => e !== item));
    setDropdownItems(dropdownItems.concat(item));
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto">
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full ">
            <div className="my-2 p-1 flex border border-gray-300 shadow-sm bg-white rounded-md">
              <div className="flex flex-auto flex-wrap">
                {selectedItems.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 "
                    >
                      <div className="text-xs font-normal leading-none max-w-full flex-initial">
                        {tag}
                      </div>
                      <div className="flex flex-auto flex-row-reverse">
                        <div onClick={() => removeTag(tag)}>
                          <X />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex-1">
                  <input
                    placeholder=""
                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                  />
                </div>
              </div>
              <div
                className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-300"
                onClick={toggleDropdown}
              >
                <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                  <Chevron />
                </button>
              </div>
            </div>
          </div>
        </div>
        {dropdown ? (
          <Dropdown items={dropdownItems} addItem={addTag}></Dropdown>
        ) : null}
      </div>
    </div>
  );
};

const Dropdown = ({ items, addItem }) => {
  // tODO: Add dropdown open on dropdown funcitonality
  return (
    <div
      id="dropdown"
      className="absolute ml-6 -mt-2 shadow top-100 bg-white z-40 w-10/12 left-0 \
                 rounded max-h-56 overflow-y-auto h-full"
    >
      {items.sort().map((item) => {
        return (
          <div
            className="cursor-pointer w-full border-gray-100 rounded-t border-b \
                     hover:bg-teal-100"
            onClick={() => addItem(item)}
          >
            <div className="flex mx-2 leading-6 p-2 relative hover:border-teal-100">
              {uncamelCase(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const X = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Chevron = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-up w-4 h-4 transform rotate-180"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

export default Multiselect;
