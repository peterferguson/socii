import { MarketDay } from "@alpaca/models"
import { lastMarketDay } from "@utils/lastMarketDay"

describe("utils/lastMarketDay", () => {
  it("checks that a `MarketDay` is returned", async () => {
    expect(await lastMarketDay()).toBeInstanceOf(MarketDay)
  })
})
