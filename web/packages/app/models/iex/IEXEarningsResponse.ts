import { IEXEarning } from "./IEXEarning"

export interface IEXEarningsResponse {
  asset: string
  earnings: IEXEarning[]
}
