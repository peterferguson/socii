
export interface IEXDividend {
  exDate: string;
  paymentDate: string;
  recordDate: string;
  declaredDate: string;
  amount: number;
  flag: string; // TODO: API docs don't mention this, but this can probably be an enum
  type: "Dividend income" |
  "Interest income" |
  "Stock dividend" |
  "Short term capital gain" |
  "Medium term capital gain" |
  "Long term capital gain" |
  "Unspecified term capital gain";
  qualified: "P" | "Q" | "N" | "" | null; // TODO: API Docs say null here, but we need to confirm if that ever happens
  indicated: string; // TODO: API docs don't mention this, but this can probably be an enum
}
