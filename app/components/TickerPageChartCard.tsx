import { TickerPageLineChartDynamic } from "@components/TickerPageLineChart/TickerPageLineChart.dynamic"
import { Tab } from "@headlessui/react"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { getYahooTimeseries, IntervalEnum, PeriodEnum } from "@utils/getYahooTimeseries"
import { pctChange } from "@utils/pctChange"
import { pnlTextColor } from "@utils/pnlTextColor"
import { tw } from "@utils/tw"
import is from "is_js"
import React, { Fragment, useEffect, useState } from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { useMediaQuery } from "react-responsive"
import { LoadingIndicator } from "stream-chat-react"

interface ITickerPageLineChartProps {
  tickerSymbol: string
  timeseries: OHLCTimeseries
  color: string
}

const TickerPageChartCard: React.FC<ITickerPageLineChartProps> = ({
  tickerSymbol,
  timeseries,
  color,
}) => {
  const [tabs, setTabs] = useState({
    "1D": { [tickerSymbol]: timeseries },
    "7D": {},
    "1M": {},
    "6M": {},
    "1Y": {},
    MAX: {},
  })
  const [activeTab, setActiveTab] = useState("1D")
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const [crosshairIndexValue, setCrosshairIndexValue] = useState(
    tabs[activeTab]?.length - 1
  )

  useEffect(() => {
    const getTimeseries = async () => {
      const timeseries = await getYahooTimeseries({
        tickers: [tickerSymbol],
        period: PeriodEnum[activeTab],
        interval:
          IntervalEnum[
            activeTab === "1D"
              ? "5m"
              : activeTab.includes("D")
              ? "30m"
              : activeTab.includes("MAX")
              ? "1W"
              : "1D"
          ],
      })

      return timeseries[tickerSymbol].map((tick) => ({
        ...tick,
        timestamp: tick.timestamp.valueOf(),
      }))
    }

    if (!tabs[activeTab]?.length)
      getTimeseries().then((ts) =>
        setTabs((prevTabs) => ({ ...prevTabs, [activeTab]: { [tickerSymbol]: ts } }))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, tickerSymbol])

  const deserialisedTimeseries = tabs[activeTab]?.[tickerSymbol]?.map((d) => ({
    x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
    y: d.close,
  }))

  // * Show the pct change of highlighted value versus today
  const highlightedClose = deserialisedTimeseries?.[crosshairIndexValue]?.y
  const latestClose = deserialisedTimeseries?.[deserialisedTimeseries.length - 1]?.y
  const highlightedChange = pctChange(latestClose, highlightedClose)

  return (
    <div className="flex items-center justify-center w-full h-2/3 ">
      <div className="relative flex flex-col items-center justify-center w-full p-2 my-4 bg-white shadow-lg min-h-[400px] rounded-xl">
        <Tab.Group onChange={(index) => setActiveTab(Object.keys(tabs)[index])}>
          <div className="flex justify-between w-full h-20">
            {crosshairIndexValue !== tabs[activeTab]?.length - 1 && (
              <div
                className={tw("flex-none p-2 sm:p-4", !highlightedClose && "invisible")}
              >
                <span className="z-10 text-lg text-left text-gray-700 dark:text-gray-100 leading-4 sm:text-4xl">
                  ${highlightedClose?.toFixed(2)}
                </span>
                <p className={`flex text-tiny ${pnlTextColor(highlightedChange)}`}>
                  {highlightedChange > 0 ? (
                    <FaArrowUp className="mr-0.5" />
                  ) : (
                    <FaArrowDown className="mr-0.5" />
                  )}
                  {`${highlightedChange?.toFixed(2)}%`}
                  {deserialisedTimeseries && (
                    <span className="text-gray-400 text-tiny">
                      {` since ${deserialisedTimeseries?.[
                        crosshairIndexValue
                      ]?.x.toLocaleDateString()}`}
                    </span>
                  )}
                </p>
              </div>
            )}
            <div className="flex-grow" />
          </div>
          {deserialisedTimeseries ? (
            <TickerPageLineChartDynamic
              timeseries={deserialisedTimeseries}
              color={color}
              highlightedChange={highlightedChange}
              crosshairIndexValue={crosshairIndexValue}
              setCrosshairIndexValue={setCrosshairIndexValue}
              heightScale={is1Col ? 0.35 : 0.5} // TODO: reduce size once we add other stock information
              widthScale={0.8}
            />
          ) : (
            <div
              className="grid place-items-center"
              style={{ height: `calc(100vh * ${is1Col ? 0.35 : 0.5})` }}
            >
              <LoadingIndicator color="#3fba" size={80} />
            </div>
          )}
          <Tab.List
            className={tw(
              "flex h-12 -mt-8 sm:mt-0 text-sm bottom-7 right-6 left-6 font-secondary md:space-x-1 sm:pr-3 sm:pt-6 md:p-6 sm:text-base",
              "sm:absolute sm:top-0 sm:right-0 sm:left-auto z-50"
            )}
          >
            {Object.keys(tabs).map((tab, i) => (
              <Tab key={`tab-${i}`} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={tw(
                      "flex items-center p-4 my-2 font-thin uppercase border-b-4 focus:outline-none",
                      "transition-colors duration-200 text-brand-cyan-vivid",
                      `umami--click--stock-line-chart-tab-${tab}`
                    )}
                    style={{
                      color,
                      borderColor: selected ? color : "transparent",
                      backgroundImage:
                        selected && is.not.safari()
                          ? `linear-gradient(to bottom, #fff, ${color}10)`
                          : "",
                    }}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  )
}

export default TickerPageChartCard
