import React from "react"

export const FooterNavItem = ({ text, Icon, onClick, isActive }) => {
  return (
    <a
      className={`block w-full py-2 font-primary text-tiny text-brand-dark text-center ${
        isActive
          ? "font-bold border-t-4 border-brand bg-gradient-to-t from-white to-brand-light dark:from-gray-700 dark:to-gray-800"
          : ""
      } transition duration-300`}
      onClick={onClick}
    >
      <Icon className="w-6 h-6 mx-auto mb-1" />
      {text}
    </a>
  )
}
