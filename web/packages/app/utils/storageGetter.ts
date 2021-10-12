import Cookie from "js-cookie";


export const storageGetter = (k: string, asCookie: boolean) => asCookie ? Cookie.getJSON(k) : JSON.parse(localStorage.getItem(k));
