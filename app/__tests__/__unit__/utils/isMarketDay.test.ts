import { isMarketDay } from "@utils/isMarketDay"

// - All open dates are tested against:
// - 2021-01-07T15:00:00+00:00 (ISO 8601)
// - All closed dates are tested against:
// - 2021-01-01T15:00:00+00:00 (ISO 8601)
describe("utils/isMarketDay", () => {
  it("checks that a `Date` market day returns true", async () => {
    const marketDay = new Date(2021, 0, 7)
    expect(await isMarketDay(marketDay)).toBe(true)
  })
  it("checks that a `Date` market day returns false", async () => {
    const marketDay = new Date(2021, 0, 1)
    expect(await isMarketDay(marketDay)).toBe(false)
  })
  it("checks that a `Date` market day returns true", async () => {
    const marketDay = new Date(2021, 0, 7, 15, 0, 0)
    expect(await isMarketDay(marketDay)).toBe(true)
  })
  it("checks that a `Date` market day returns false", async () => {
    const marketDay = new Date(2021, 0, 1, 15, 0, 0)
    expect(await isMarketDay(marketDay)).toBe(false)
  })
  it("checks that a `string` market day returns true", async () => {
    const marketDay = "2021-01-07T15:00:00+00:00"
    expect(await isMarketDay(marketDay)).toBe(true)
  })
  it("checks that a `string` market day returns false", async () => {
    const marketDay = "2021-01-01T15:00:00+00:00"
    expect(await isMarketDay(marketDay)).toBe(false)
  })
  it("checks that a `string` market day returns true", async () => {
    const marketDay = "2021-01-07"
    expect(await isMarketDay(marketDay)).toBe(true)
  })
  it("checks that a `string` market day returns true", async () => {
    const marketDay = "2021-01-01"
    expect(await isMarketDay(marketDay)).toBe(false)
  })
  it("checks that a `Date` market day returns true", async () => {
    const marketDay = 1610031600
    expect(await isMarketDay(marketDay)).toBe(true)
  })
  it("checks that a `Date` market day returns true", async () => {
    const marketDay = 1609513200
    expect(await isMarketDay(marketDay)).toBe(false)
  })
})
