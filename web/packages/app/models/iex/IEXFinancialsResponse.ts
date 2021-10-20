import { IEXFinancial } from "./IEXFinancial"

export interface IEXFinancialsResponse {
  asset: string
  financials: IEXFinancial[]
}
