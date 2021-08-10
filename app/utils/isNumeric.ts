export const isNumeric = (str: string) => {
  if (typeof str != "string") return false
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  )
}
