import fetch from "isomorphic-unfetch"

export const fetchJSON = async (url: RequestInfo) => (await fetch(url)).json()
