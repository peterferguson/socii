export const round = (num: number, places: number) =>
  Math.round((num + Number.EPSILON) * 10 ** places) / 10 ** places
