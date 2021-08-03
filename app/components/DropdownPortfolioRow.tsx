import React from "react"

export function PortfolioSummary({ group }) {
  return (
    <div className="flex px-1 text-center grid-cols-3 bg-gray-50 grid shadow-s">
      <div className="w-1/5 align-middle text-brand-dark font-primary text-brand font-xl">
        {group}
      </div>
      <div className="w-auto px-5 bg-red-50">group members / total investments</div>
      <div className="w-1/12 px-5 bg-green-50">see more</div>
    </div>
  )
}
export function PortfolioDetails({ group }) {
  return (
    <div className="px-1 bg-gray-50 grid grid-cols-3 divide-x divide-green-500 shadow-s">
      <div className="w-1/2 ...">your portfolio here</div>
      <div className="w-1/2 px-5 ... bg-red-50">more portfolio etc</div>
    </div>
  )
}
