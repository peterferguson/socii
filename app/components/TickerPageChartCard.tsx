import { TickerPageLineChartDynamic } from "@components/TickerPageLineChart/TickerPageLineChart.dynamic"
import { Tab } from "@headlessui/react"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { pctChange } from "@utils/pctChange"
import { pnlTextColor } from "@utils/pnlTextColor"
import React, { Fragment, useEffect, useState } from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { useMediaQuery } from "react-responsive"
import is from "is_js"
import { getYahooTimeseries, IntervalEnum, PeriodEnum } from "@utils/getYahooTimeseries"

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
    "1D": timeseries,
    "7D": [],
    "1M": [],
    "6M": [],
    "1Y": [],
    MAX: [],
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
        setTabs((prevTabs) => ({ ...prevTabs, [activeTab]: ts }))
      )
  }, [activeTab, tabs, tickerSymbol])

  const deserialisedTimeseries = tabs[activeTab]?.map((d) => ({
    x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
    y: d.close,
  }))

  // * Show the pct change of highlighted value versus today
  const highlightedClose = deserialisedTimeseries?.[crosshairIndexValue]?.y
  const latestClose = deserialisedTimeseries?.[deserialisedTimeseries.length - 1]?.y
  const highlightedChange = pctChange(latestClose, highlightedClose)

  return (
    <div className="flex items-center justify-center w-full h-2/3 ">
      <div className="relative w-full p-2 m-4 bg-white shadow-lg rounded-xl">
        <Tab.Group onChange={(index) => setActiveTab(Object.keys(tabs)[index])}>
          <div className="flex justify-between w-full h-20">
            {crosshairIndexValue !== tabs[activeTab]?.length - 1 && (
              <div className="flex-none p-2 sm:p-4">
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
            <div className="flex-grow"></div>
          </div>
          {deserialisedTimeseries ? (
            <TickerPageLineChartDynamic
              timeseries={deserialisedTimeseries}
              color={color}
              highlightedChange={highlightedChange}
              crosshairIndexValue={crosshairIndexValue}
              setCrosshairIndexValue={setCrosshairIndexValue}
              heightScale={is1Col ? 0.35 : 0.6}
              widthScale={is1Col ? 0.8 : 0.75}
            />
          ) : (
            // TODO: Replace with skeleton loader
            <div>Loading</div>
          )}
          <Tab.List className="absolute flex h-12 pt-3 pr-2 text-sm bottom-7 font-secondary space-x-0.5 md:space-x-1 sm:pr-3 sm:pt-6 md:p-6 sm:text-base sm:top-0 sm:right-0">
            {Object.keys(tabs).map((tab, i) => (
              <Tab key={`tab-${i}`} as={Fragment}>
                {({ selected }) => (
                  <button
                    className="flex items-center p-4 my-2 font-thin uppercase border-b-4 focus:outline-none transition-colors duration-200 text-brand-cyan-vivid"
                    style={{
                      color,
                      borderColor: selected ? color : "transparent",
                      backgroundImage:
                        selected && is.not.safari()
                          ? `linear-gradient(to bottom, #fff, ${color}20)`
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
