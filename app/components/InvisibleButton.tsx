import React from "react";

// - To avoid the focus bug problem
export const InvisibleButton = ({ buttonRef }) => (
  <div className="absolute top-1 right-1">
    <button
      ref={buttonRef}
      type="button"
      className="text-transparent  focus:outline-none focus-visible:ring-0"
    >
      X
    </button>
  </div>
);
