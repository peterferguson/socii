export const alphaVantageApiKey = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY

export const alphaVantageQuery = (queryType: string, params: object) => {
  const queryParmsString: string = Object.keys(params)
    .map((key) => `&${key}=${params[key]}`)
    .join("")

  return `https://www.alphavantage.co/query?function=${queryType}${queryParmsString}&apikey=${alphaVantageApiKey}`
}
