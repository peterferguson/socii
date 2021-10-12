import fetch from "isomorphic-unfetch"

export async function fetcher<JSON = any>(
  url: string,
  options?: object
): Promise<JSON> {
  const res = await fetch(url, options)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error()
    // Attach extra info to the error object.
    error.message = await res.json()
    error["statusCode"] = res.status
    throw error
  }

  return await res.json()
}

