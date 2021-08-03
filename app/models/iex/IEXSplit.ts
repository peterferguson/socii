export interface IEXSplit {
  exDate: string
  declaredDate: string
  recordDate: string
  paymentDate: string
  ratio: number
  toFactor: number // TODO: API docs say string, but this looks to actually be a number
  forFactor: number // TODO: API docs say string, but this looks to actually be a number
}
