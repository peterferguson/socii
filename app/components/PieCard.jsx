import DonutChart from "@components/DonutChart"
import Link from "next/link"
import React from "react"

export default function PieCard({ className, groupName, data, scaling, radius, text }) {
  return (
    <div
      className={`w-88 sm:w-full items-center justify-center flex flex-col \
                  bg-white rounded sm:rounded-xl shadow-2xl m-0 sm:m-4 mb-2 sm:mb-4 \
                  ${className}
    `}
    >
      <Link href={`/groups/${groupName}`}>
        <a>
          <div className="relative z-10 text-4xl text-center cursor-pointer top-2 text-brand font-primary">
            {groupName}
          </div>
        </a>
      </Link>
      <DonutChart
        className="z-0 -mt-8"
        data={data}
        scaling={scaling}
        radius={radius}
        text={text}
      />
    </div>
  )
}

export function PieCardSkeleton({ scaling, radius }) {
  const text = {
    main: (
      <div className="w-16 h-4 mx-auto mb-4 bg-gray-200 rounded-sm animate-pulse" />
    ),
    sub: <div className="w-12 h-4 mx-auto mb-4 bg-gray-200 rounded-sm animate-pulse" />,
  }
  return (
    <div className="m-0 mb-2 rounded-none shadow-md bg-gray-50 sm:rounded-xl sm:m-4 sm:mb-4">
      <div className="pt-4 -mb-8 text-xl text-center font-primary">
        <div className="w-16 h-6 mx-auto mb-4 bg-gray-200 rounded-sm animate-pulse" />
      </div>
      <DonutChart
        className="z-0 animate-pulse"
        data={[
          { theta: 1, color: "#E5E7EB" },
          { theta: 2, color: "#E5E7EB" },
        ]}
        scaling={scaling}
        radius={radius}
        skeleton={true}
        text={text}
      />
    </div>
  )
}
