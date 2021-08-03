import { IEXEarning } from "./IEXEarning"

export interface IEXEarningsResponse {
  symbol: string
  earnings: IEXEarning[]
}
