import { MarketDay } from "@socii/shared/alpaca/models"
import { lastMarketDay } from "@utils/lastMarketDay"

describe("utils/lastMarketDay", () => {
  it("checks that a `MarketDay` is returned", async () => {
    expect(
      Object.keys(await lastMarketDay()).every((key) =>
        MarketDay.getAttributeTypeMap()
          .map(({ name }) => name)
          .includes(key)
      )
    ).toBe(true)
  })
})
