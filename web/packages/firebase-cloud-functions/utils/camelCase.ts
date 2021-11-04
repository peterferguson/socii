import { isUpperCase } from "./isUpperCase";


export const camelCase = (str: string): string => {
  if (isUpperCase(str))
    return str;
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (/\s+/.test(match))
      return "";
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};
