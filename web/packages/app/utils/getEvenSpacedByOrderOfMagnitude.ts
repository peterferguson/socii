import { orderOfMagnitude } from "./orderOfMagnitude"

export const getEvenSpacedByOrderOfMagnitude = (numList: number[]) => {
  // TODO: better edge case handling
  if (numList?.length < 2 || [...new Set(numList)]?.length < 2) return numList

  enum RoundingDirection {
    UP = "UP",
    DOWN = "DOWN",
  }

  const difference = Math.max(...numList) - Math.min(...numList)
  const differenceOrder = orderOfMagnitude(difference)

  const roundToOrder = (num: number, direction: RoundingDirection, order = null) => {
    if (!order) order = orderOfMagnitude(num)
    return direction === RoundingDirection.UP
      ? Math.ceil(num / order) * order
      : Math.floor(num / order) * order
  }

  const linspace = (start: number, stop: number, num: number, endpoint = true) => {
    const div = endpoint ? num - 1 : num
    const step = (stop - start) / div
    return Array.from({ length: num }, (_, i) => start + step * i)
  }

  return linspace(
    roundToOrder(
      numList[0] - roundToOrder(difference, RoundingDirection.DOWN),
      RoundingDirection.DOWN,
      differenceOrder
    ),
    roundToOrder(
      numList[numList.length - 1] + roundToOrder(difference, RoundingDirection.UP),
      RoundingDirection.UP,
      differenceOrder
    ),
    5
  )
}
