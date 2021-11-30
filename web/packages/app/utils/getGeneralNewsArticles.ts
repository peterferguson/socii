import { FreeNewsResult } from "app/models/rapidNews/FreeNews"

export const getGeneralNewsArticles = async (
  query: string,
  numberOfArticles: number = 5,
  page: number = 1
  //fromDate: string = null,
  //endDate: string = null // -"2015-05-16T05:50:06"
): Promise<FreeNewsResult> => {
  const hostUrl = process.env.NEXT_PUBLIC_RAPID_API_General_NEWS_URL || ""
  const params = {
    q: query,
    page: page,
    page_size: numberOfArticles,
    lang: "en",
  }

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  const url = "https://" + hostUrl + "/v1/search?" + queryString

  return await (
    await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": hostUrl,
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_General_NEWS_KEY,
      },
    })
  ).json()
}
