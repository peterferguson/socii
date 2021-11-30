interface WebSearchNewsProvider {
    name: string
    favIcon: string
    favIconBase64Encoding: string
  }

interface WebSearchImage {
    url: string
    height: number
    width: number
    thumbnail: string
    thumbnailHeight: number
    thumbnailWidth: number
    base64Encoding: string
    name: string
    title: string
    provider: WebSearchNewsProvider
    imageWebSearchUrl: string
    webpageUrl: string
  }

export interface WebSearchNewsItem {
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
    provider: WebSearchNewsProvider
    image?: WebSearchImage
  }
  
  export interface WebSearchNewsResult {
    _type: string
    didUMean: string
    totalCount: number
    relatedSearch: WebSearchNewsItem[]
    value: WebSearchNewsItem[]
  }
  