import React from "react";
import MMLButton from "../MML/Button";

/* Converters */
export const InvestConfirmationMMLConverter = () => (
  <>
    <div className="flex items-center justify-center w-full mx-auto space-x-2">
      <MMLButton
        key={`no-button`}
        name="no"
        className="w-1/2 mx-2 outline-btn btn-transition hover:bg-red-400"
        text="No" />
      <MMLButton
        key={`yes-button`}
        name="yes"
        className="w-1/2 mx-2 outline-btn btn-transition"
        text={"Yes"} />
    </div>
  </>
);
