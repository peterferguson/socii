import { ActivityItem } from "@socii/shared/alpaca"
import { tw } from "@utils/tw"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import React from "react"
import { FaHome } from "react-icons/fa"
import { BsPeopleFill } from "react-icons/bs"
dayjs.extend(calendar)

const NTAActivityMapping: { [key: string]: string } = {
  ACATC: "ACATS IN/OUT (Cash)",
  ACATS: "ACATS IN/OUT (Securities)",
  CSD: "Deposit",
  CSR: "Cash receipt (-)",
  CSW: "Cash withdrawable",
  DIV: "Dividend",
  DIVCGL: "Dividend (capital gain long term)",
  DIVCGS: "Dividend (capital gain short term)",
  DIVNRA: "Dividend adjusted (NRA Withheld)",
  DIVROC: "Dividend return of capital",
  DIVTXEX: "Dividend (tax exempt)",
  INT: "Interest (credit/margin)",
  JNLC: "Journal entry (cash)",
  JNLS: "Journal entry (stock)",
  MA: "Merger/Acquisition",
  NC: "Name change",
  PTC: "Pass thru change",
  REORG: "Reorg CA",
  SSO: "Stock spinoff",
  SSP: "Stock split",
}

export const NTAActivityCard = ({ activity }: { activity: ActivityItem }) => (
  <li
    key={activity.id}
    className="relative flex items-center p-3 rounded-xl hover:bg-gray-50"
  >
    <div className="flex items-center justify-center w-10 h-10 text-white rounded-full shadow-lg bg-gradient-to-br from-brand-pink to-brand">
      {activity.status?.toLowerCase() !== "queued" ? (
        <FaHome className="w-5 h-5" />
      ) : (
        <BsPeopleFill className="w-5 h-5" />
      )}
    </div>

    <div className="ml-4 hover:bg-gray-50">
      <h4 className="font-medium text-gray-500 capitalize text-tiniest leading-5">
        {activity.status}
      </h4>
      <h3 className="text-sm font-medium capitalize leading-5">
        {NTAActivityMapping[activity.activityType] || activity.activityType}
      </h3>

      <ul className="flex mt-1 font-normal text-gray-500 text-tiny space-x-1 leading-4">
        <li> {dayjs(activity.date).calendar()}</li>
        {activity.description && (
          <>
            <li>&middot;</li>
            <li className="text-tiniest overflow-ellipsis">{activity.description}</li>
          </>
        )}
      </ul>
    </div>
    <div
      className={tw(
        "absolute right-0 mr-4 text-sm flex flex-col justify-center text-center"
      )}
    >
      ${activity.netAmount}
    </div>
  </li>
)
