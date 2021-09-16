import React from "react"
import toast from "react-hot-toast"

//- To be used in a react-hot-toast custom toast
export const NotOptimisedForLandscape = (t) => (
  <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } max-w-md w-full bg-gray-50 dark:bg-logo-darkBg shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <span className="p-2">
      Sorry we are not yet optimised for landscape <b>yet!</b>
      <button
        className="p-1 m-1 ml-2 text-sm bg-gray-200 border rounded dark:bg-gray-700"
        onClick={() => toast.dismiss(t.id)}
      >
        Dismiss
      </button>
    </span>
  </div>
)
