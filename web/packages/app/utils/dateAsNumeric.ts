export const dateAsNumeric = (date: Date) => date.toISOString().replace(/[^0-9]/g, "")
