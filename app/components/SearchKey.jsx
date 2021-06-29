import React from "react"
export default function MacSearchKey() {
  return (
    <span className="hidden text-sm text-gray-400 border border-gray-300 sm:block leading-5 py-0.5 px-1.5 rounded-md">
      <span className="sr-only">Press </span>
      <kbd className="font-sans">
        <abbr title="Command" className="no-underline">
          ⌘
        </abbr>
      </kbd>
      <span className="sr-only"> and </span>
      <kbd className="font-sans">K</kbd>
      <span className="sr-only"> to search</span>
    </span>
  )
}

export function SlashSearchKey() {
  return (
    <span className="hidden text-sm text-gray-400 border border-gray-300 sm:block leading-5 py-0.5 px-1.5 rounded-md">
      <span className="sr-only">Press </span>
      <kbd className="font-poppins">
        <abbr title="Command" className="p-1 no-underline">
          /
        </abbr>
      </kbd>
      <span className="sr-only"> to search</span>
    </span>
  )
}
