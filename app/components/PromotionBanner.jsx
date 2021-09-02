import React from "react"

export const PromotionBanner = () => (
  <div
    className={`absolute bottom-0 w-full h-16 p-4 text-tiny text-center text-white 
    align-middle bg-brand-cyan-green font-secondary leading-6 sm:leading-0 sm:text-base 
    animate-fade-in-down flex items-center justify-center`}
  >
    <span>
      👋 We are currently in private alpha mode.
      <span className="flex items-center justify-center -mt-2 sm:-mt-1">
        You will need to join the waitlist!
      </span>
    </span>
  </div>
)
