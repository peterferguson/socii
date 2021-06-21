import { uncamelCase } from "@utils/helper"
import React, { useState } from "react"

import { FiChevronDown, FiX } from "react-icons/fi"
const Multiselect = ({ items, selectedItems, setSelectedItems }) => {
  const [dropdown, setDropdown] = useState(false)
  const [dropdownItems, setDropdownItems] = useState(items)

  const toggleDropdown = () => setDropdown(!dropdown)

  // adds new item to multiselect
  const addTag = (item) => {
    setDropdownItems(dropdownItems.filter((e) => e !== item))
    setSelectedItems(selectedItems.concat(item))
    setDropdown(false)
  }

  // removes item from multiselect
  const removeTag = (item) => {
    setSelectedItems(selectedItems.filter((e) => e !== item))
    setDropdownItems(dropdownItems.concat(item))
  }

  return (
    <div className="flex flex-col items-center w-full mx-auto">
      <div className="w-full">
        <div className="relative flex flex-col items-center">
          <div className="flex w-full p-1 my-2 bg-white border border-gray-300 shadow-sm \ rounded-md">
            <div className="flex flex-wrap flex-auto" onClick={toggleDropdown}>
              {selectedItems.map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-center px-2 py-1 m-1 font-medium text-teal-700 bg-teal-100 border border-teal-300 rounded-full"
                  >
                    <div className="flex-initial max-w-full text-xs font-normal leading-none">
                      {tag}
                    </div>
                    <div className="flex flex-row-reverse flex-auto">
                      <div onClick={() => removeTag(tag)}>
                        <FiX className="w-4 h-4 ml-2 rounded-full cursor-pointer hover:text-teal-400" />
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* // TODO: Allow input to search the options   */}
              {/* <div className="flex-1">
                  <input
                    placeholder=""
                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                  />
                </div> */}
            </div>
            <div
              className="flex items-center w-8 py-1 pl-2 pr-1 text-gray-300 border-l border-gray-300"
              onClick={toggleDropdown}
            >
              <button className="w-6 h-6 text-gray-600 outline-none cursor-pointer focus:outline-none">
                <FiChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        {dropdown ? <Dropdown items={dropdownItems} addItem={addTag}></Dropdown> : null}
      </div>
    </div>
  )
}

const Dropdown = ({ items, addItem }) => {
  // tODO: Add dropdown open on dropdown funcitonality
  return (
    <div
      id="dropdown"
      className="absolute left-0 z-40 w-10/12 h-full ml-6 -mt-2 overflow-y-auto bg-white rounded shadow top-100 \ max-h-56"
    >
      {items.sort().map((item) => {
        return (
          <div
            key={`${item}-key`}
            className="w-full border-b border-gray-100 rounded-t cursor-pointer \ hover:bg-teal-100"
            onClick={() => addItem(item)}
          >
            <div className="relative flex p-2 mx-2 leading-6 hover:border-teal-100">
              {uncamelCase(item)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Multiselect
