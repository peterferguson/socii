import TickerLogo from "@components/TickerLogo"
import { useTickerPrice } from "@hooks"
import { GroupTradeItem } from "@lib/firebase/client/db/getGroupTradeHistory"
import { ActivityItem } from "@socii/shared/alpaca"
import { pnlTextColor } from "@utils/pnlTextColor"
import { tw } from "@utils/tw"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import React, { useMemo } from "react"
dayjs.extend(calendar)

//* TODO 
// - MAKE UK TIME format!!
// - Add live update for change on each trade
// - Tidy + add group trade specific items to the cards

export const TradeActivityCard = ({ activity }: { activity: GroupTradeItem }) => {
  const { price } = useTickerPrice(activity.symbol)

  // const priceChange = useMemo(
  //   () => (100 * (price.latestPrice - parseFloat(activity.price))) / price.latestPrice,
  //   [price.latestPrice, activity.price]
  // )

  return (
    <li
      key={activity.messageId}
      className="relative flex items-center p-3 rounded-xl hover:bg-gray-200"
    >
      {activity.symbol ? (
        <TickerLogo tickerSymbol={activity.symbol} className="w-10 h-10" />
      ) : (
        <div className="w-10 h-10 bg-gray-200 rounded-full shadow-lg animate-pulse" />
      )}

      <div className="ml-4 hover:bg-gray-50">
        <h4 className="font-medium text-gray-500 text-tiniest leading-5">
          {/* {activity.activityType === "JNLS"
            ? "Reward"
            : activity.orderStatus.replace(/_/g, " ")} */}
          {/* ${activity.notional}  */}
        </h4>
        <h3 className="text-sm font-medium capitalize leading-5">
          {activity.side} {activity.symbol}
        </h3>

        <ul className="flex mt-1 font-normal text-gray-500 text-tiny space-x-1 leading-4">
          {/* <li className="capitalize">
            {activity.activityType === "JNLS"
              ? "Reward"
              : activity.orderStatus.replace(/_/g, " ")}
          </li> */}
          {/* <li>submitted</li> */}
          <li> {dayjs(new Date(activity?.timestamp.seconds*1000)).calendar()}</li>
        </ul>
      </div>
      <div
        className={tw(
          "absolute right-0 mr-4 text-sm flex flex-col justify-center text-center"
        )}
      >

        ${activity.notional}
        <br />
{/* 
        <span className={tw("text-tiny", pnlTextColor(priceChange))}>
          {priceChange > 0 ? <FaArrowUp /> : <FaArrowDown />
          {priceChange > 0 ? "+" : ""}
          {priceChange.toFixed(2)}%
        </span> */}
        
      </div>
    </li>
  )
}
