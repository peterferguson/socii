import "jest"

import { getAlpacaBuyPower } from "../../src/utils/getAlpacaBuyPower"

describe("getAlpacaBuyPower", () => {
  it("should return a mapping with numberic values", async () => {
    const account = await getAlpacaBuyPower("039e64b6-a4eb-409e-b9dc-17cc7a2dd6ce")

    expect(Object.values(account).every((num) => typeof num === "number")).toEqual(true)
  })
})
