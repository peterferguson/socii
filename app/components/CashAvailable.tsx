import { useGroups } from "@hooks/useGroups"
import { useTradingAccount } from "@hooks/useTradingAccount"
import { tw } from "@utils/tw"
import React, { useEffect, useState } from "react"
import { HiOutlineCash } from "react-icons/hi"
import { useMediaQuery } from "react-responsive"
import InformationTag, { InformationIconTag } from "./InformationTag/InformationTag"

// TODO: add skeleton loader
export const CashAvailable = () => {
  const { account, error } = useTradingAccount()
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const is2Col = !useMediaQuery({ minWidth: 1024 })
  const groups = useGroups()
  const [totalGroupsCashBalance, setTotalGroupsCashBalance] = useState(0)

  useEffect(
    () =>
      setTotalGroupsCashBalance(
        Object.values(groups || {})?.reduce(
          (acc, { cashBalance }) => acc + cashBalance,
          0
        )
      ),
    [groups]
  )

  const cashColor =
    parseFloat(account?.cash) != 0
      ? parseFloat(account?.cash) >= totalGroupsCashBalance
        ? "green"
        : "red"
      : "red"

  // - tw jit classes text-green-600 bg-green-50 text-red-500 bg-red-300
  const CashIcon = ({ onClick }: { onClick?: () => void }) => (
    <div
      className={tw(
        "flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full lg:mx-0 lg:h-8 lg:w-8",
        `bg-${cashColor}-100`,
        `text-${cashColor}-600`
      )}
      onClick={onClick}
    >
      <HiOutlineCash className="w-6 h-6" aria-hidden="true" />
    </div>
  )

  const informationTagProps = {
    InformationModalIcon: CashIcon,
    informationTitle: `Cash Available: $${account?.cash}`,
    InformationText: () => (
      <div className="text-gray-600">
        When the icon is <span className="text-green-600">green</span> then have met the
        cash requirements of all your groups.
        <br />
        <br />
        When <span className="text-red-600">red</span> then you don&#39;t have enough
        cash to meet the requirements of all your groups.
        <br />
        <br />
        You can always add more cash to your account to avoid missing out on any group
        decisions.
      </div>
    ),
  }

  return (
    <div className="w-full p-1 mb-1 sm:p-4 sm:mb-4 grid grid-cols-[1fr,6fr] sm:grid-cols-1 lg:grid-cols-[1fr,6fr,1fr] place-items-end sm:place-items-center">
      {is2Col && !is1Col ? (
        <InformationIconTag InformationIcon={CashIcon} {...informationTagProps} />
      ) : (
        <CashIcon />
      )}
      <div className="inline-flex items-center justify-end pl-1 font-light align-middle sm:hidden lg:inline-flex">
        <h3 className="text-xl text-right sm:text-left sm:text-sm text-brand-black leading-4">
          <span className="text-sm sm:text-tiny">$</span>
          {parseFloat(account?.cash)?.toFixed(2)}
          <p className="text-gray-500 capitalize sm:text-gray-300 text-tiny">
            cash available
          </p>
        </h3>
      </div>
      <div className="hidden mx-auto lg:inline-flex">
        <InformationTag
          className={"h-4 w-4 text-tiniest p-2"}
          {...informationTagProps}
        />
      </div>
    </div>
  )
}
