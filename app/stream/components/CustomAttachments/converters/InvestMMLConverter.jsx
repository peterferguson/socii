import LogoPriceCardHeader from "@components/LogoPriceCardHeader";
import React from "react";
import MMLButton from "../MML/Button";

export const InvestMMLConverter = ({ tickerSymbol, tickerState, canSell = true }) => (
  <>
    <LogoPriceCardHeader
      className="mb-2 ml-[-1.3rem]"
      tickerSymbol={tickerSymbol}
      tickerState={tickerState} />
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row">
        {canSell && (
          <MMLButton
            key={`sell-button`}
            name="sell"
            className="w-24 mx-2 outline-btn btn-transition"
            text="Sell" />
        )}
        <MMLButton
          key={`buy-button`}
          name="buy"
          className={`mx-2 outline-btn btn-transition ${canSell ? "w-24" : "w-52"}`}
          text={"Buy"} />
      </div>

      <MMLButton
        key={`cancel-button`}
        name="cancel"
        className="mx-2 w-52 outline-btn btn-transition hover:bg-red-400"
        text="Cancel" />
    </div>
  </>
);
