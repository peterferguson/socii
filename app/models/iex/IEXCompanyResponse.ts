import { IEXIssueType } from "./IEXIssueType"

export interface IEXCompanyResponse {
  symbol: string
  companyName: string
  exchange: string
  industry: string
  website: string
  description: string
  CEO: string
  issueType: IEXIssueType
  sector: string
  tags: string[]
}
