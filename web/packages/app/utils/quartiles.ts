export const quantile = (array: number[], percentile: number): number | null => {
  if (!array || array?.length === 0) return
  array.sort((a: number, b: number) => a - b)
  const index = percentile * (array.length - 1)
  if (Math.floor(index) == index) {
    return array[index]
  } else {
    const i = Math.floor(index)
    const fraction = index - i
    return array[i] + (array[i + 1] - array[i]) * fraction
  }
}

export const lowerQaurtile = (arr: number[]) => quantile(arr, 0.25)
export const median = (arr: number[]) => quantile(arr, 0.5)
export const upperQuartile = (arr: number[]) => quantile(arr, 0.75)

export const getQuartiles = (array: number[]) =>
  [0, 0.25, 0.5, 0.75, 1].map(percentile => quantile(array, percentile))
