import React from "react";

// TODO: Create a card for displaying the current holding information & splits by group on interaction
const TickerHoldingCard = ({ holding }) => {
  console.log(holding?.avgEntryPrice);
  console.log(holding?.qty);
  console.log(holding?.side);
  console.log(holding?.marketValue);
  console.log(holding?.costBasis);
  console.log(holding?.unrealizedPl);
  console.log(holding?.unrealizedPlpc);
  console.log(holding?.unrealizedIntradayPl);
  console.log(holding?.unrealizedIntradayPlpc);
  console.log(holding?.currentPrice);
  console.log(holding?.lastdayPrice);
  console.log(holding?.changeToday);

  return (
    <>
      <div className=""></div>
    </>
  );
};
