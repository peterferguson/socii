import { PortfolioHistory } from "@alpaca/models"
import dayjs from "dayjs"
import { PortfolioHistoryTimeseries } from "../models/PortfolioHistoryTimeseries"

export const portfolioHistoryToTimeseries = (
  history: PortfolioHistory
): PortfolioHistoryTimeseries => {
  const { timestamp, equity, profitLoss, profitLossPct } = history

  return {
    equity: equity?.map((e, i) => ({ x: dayjs.unix(timestamp[i]), y: e })),
    pnl: profitLoss?.map((p, i) => ({ x: dayjs.unix(timestamp[i]), y: p })),
    pnl_pct: profitLossPct?.map((p, i) => ({ x: dayjs.unix(timestamp[i]), y: p })),
  }
}
