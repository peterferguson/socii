
export const currencyFormatter = (number: number, currency: string = "GBP"): string => new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(number || 0);
