import React from "react"

const CuttoutFooter = () => (
  <div className="sticky flex items-center justify-between p-5 px-6 m-2 text-gray-400 bg-gray-900 cursor-pointer bottom-2 shadow-3xl rounded-2xl">
    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
        ></path>
      </svg>
    </div>
    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
    <div className="flex flex-col items-center  hover:text-blue-400 ">
      <div className="absolute flex items-center justify-center w-20 h-20 p-2 text-3xl text-center text-white bg-blue-500 border-4 rounded-full shadow-2xl bottom-5 border-gray-50 hover:border-blue-500 transition ease-in duration-200">
        <i className="fas fa-phone-alt"></i>
        <span className="absolute inline-flex w-full h-full border-4 rounded-full opacity-50 animate-ping"></span>
      </div>
    </div>
    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        ></path>
      </svg>
    </div>
    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </div>
  </div>
)

export default React.memo(CuttoutFooter)
