import { IEXFinancial } from "./IEXFinancial"

export interface IEXFinancialsResponse {
  symbol: string
  financials: IEXFinancial[]
}
