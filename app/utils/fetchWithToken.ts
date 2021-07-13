import { fetcher } from "./fetcher";

export const fetchWithToken = (url: string, token: string) => fetcher(url, {
  headers: {
    Authorization: `Basic ${token}`,
  },
});
