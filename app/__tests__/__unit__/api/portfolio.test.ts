import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import { handlePortfolioHistory } from "@api/alpaca/portfolio"
import { performance } from "perf_hooks"
import { PortfolioHistory } from "@socii/shared/alpaca/index"

const portfolioTest = nextApiHandlerTest(
  handlePortfolioHistory,
  "/api/alpaca/portfolio"
)

describe.skip("/api/alpaca/portfolio", () => {
  it(
    "gets an accounts portfolio history",
    portfolioTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId: process.env.ALPACA_FIRM_ACCOUNT }),
      })
      const finishTime = performance.now()

      const portfolioResponse = await res.json()

      expect(res.status).toBe(200)
      expect(PortfolioHistory.from(portfolioResponse)).toBeInstanceOf(PortfolioHistory)
      expect(
        Object.keys(PortfolioHistory.from(portfolioResponse)).every((key) =>
          [
            "timestamp",
            "equity",
            "profit_loss",
            "profit_loss_pct",
            "base_value",
            "profitLoss",
            "profitLossPct",
            "baseValue",
            "timeframe",
          ].includes(key)
        )
      ).toBe(true)
      expect(finishTime - startTime).toBeLessThan(1000)
    })
  )
})
