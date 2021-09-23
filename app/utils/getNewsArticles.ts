interface RapidApiNewsProvider {
  name: string
  favIcon: string
  favIconBase64Encoding: string
}

interface RapidApiImage {
  url: string
  height: number
  width: number
  thumbnail: string
  thumbnailHeight: number
  thumbnailWidth: number
  base64Encoding: string
  name: string
  title: string
  provider: RapidApiNewsProvider
  imageWebSearchUrl: string
  webpageUrl: string
}

export interface RapidApiNewsItem {
  id: string
  title: string
  url: string
  description: string
  body: string
  snippet: string
  keywords: string
  language: string
  isSafe: boolean
  datePublished: string
  provider: RapidApiNewsProvider
  image: RapidApiImage
}

export interface RapidApiNewsResult {
  _type: string
  didUMean: string
  totalCount: number
  relatedSearch: RapidApiNewsItem[]
  value: RapidApiNewsItem[]
}

export const getNewsArticles = async (
  query: string,
  numberOfArticles: number = 5,
  includeThumbnails: boolean = true,
  fromDate: string = null,
  endDate: string = null // -"2015-05-16T05:50:06"
): Promise<RapidApiNewsResult> => {
  const hostUrl = process.env.RAPID_API_NEWS_URL || ""

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
        "x-rapidapi-key": process.env.RAPID_API_NEWS_KEY,
      },
    })
  ).json()
}
