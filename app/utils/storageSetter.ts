import Cookie from "js-cookie";


export const storageSetter = (k: string, v: string | object, asCookie: boolean) => {
  return asCookie
    ? Cookie.set(k, JSON.stringify(v))
    : localStorage.setItem(k, JSON.stringify(v));
};
