export const isNumeric = (str: string) =>
  typeof str != "string" ? false : !isNaN(parseFloat(str))
