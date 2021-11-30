import { WebSearchNewsResult } from "app/models/rapidNews/WebSearchNews"

export const getNewsArticles = async (
  query: string,
  numberOfArticles: number = 5,
  includeThumbnails: boolean = true,
  fromDate: string = null,
  endDate: string = null // -"2015-05-16T05:50:06"
): Promise<WebSearchNewsResult> => {
  const hostUrl = process.env.NEXT_PUBLIC_RAPID_API_NEWS_URL || ""

  const params = {
    q: query,
    pageNumber: 1,
    pageSize: numberOfArticles,
    autoCorrect: true,
    withThumbnails: includeThumbnails,
    fromPublishedDate: fromDate,
    toPublishedDate: endDate,
  }

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  const url = new URL(`https://${hostUrl}/api/search/NewsSearchAPI?${queryString}`).href

  return await (
    await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": hostUrl,
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_NEWS_KEY,
      },
    })
  ).json()
}
