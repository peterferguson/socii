
export const uncamelCase = (str: string) => str
  .replace(/^./, (s: string) => s.toUpperCase())
  .replace(/([a-z])([A-Z])/g, "$1 $2")
  .replace(/([A-Z])([a-z])/g, " $1$2")
  .replace(/ +/g, " ");
