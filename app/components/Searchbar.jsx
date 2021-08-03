import { SlashSearchKey } from "@components/SearchKey"
import React from "react"
import { HiOutlineSearch } from "react-icons/hi"

export default function Searchbar({ setShowSearchCard }) {
  return (
    <div className="container relative left-0 z-50 flex w-3/4 h-full">
      <div
        className="relative flex items-center w-full h-full lg:w-64 group"
        onClick={() => setShowSearchCard(true)}
      >
        <HiOutlineSearch className="relative w-5 h-5 text-gray-400 left-8" />
        <input
          type="text"
          className="block w-full pl-10 pr-4 leading-normal text-gray-400 bg-gray-100 border-none py-1.5 rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand ring-opacity-90 dark:bg-gray-800"
          placeholder="Search"
        />
        <div className="absolute z-50 flex items-center justify-center w-auto h-10 mr-1 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
          <SlashSearchKey />
        </div>
      </div>
    </div>
  )
}
