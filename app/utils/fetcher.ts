import fetch from "isomorphic-unfetch";


export async function fetcher<JSON = any>(
  url: string,
  options?: object
): Promise<JSON> {
  const res = await fetch(url, options);
  return res.json();
}
