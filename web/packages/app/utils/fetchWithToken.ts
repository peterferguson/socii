import { fetcher } from "./fetcher"

export const fetchWithToken = (url: string, token: string, options) =>
  fetcher(url, {
    ...(options || {}),
    headers: {
      ...(options?.headers || {}),
      Authorization: `Basic ${token}`,
    },
  })
