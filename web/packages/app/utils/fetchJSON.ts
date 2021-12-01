export const fetchJSON = async (url: RequestInfo) => (await fetch(url)).json()
