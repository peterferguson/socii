export interface PortfolioHistory {
  timestamp?: Array<number>
  /**
   * equity value of the account in dollar amount as of the end of each time window
   */
  equity?: Array<number>
  /**
   * profit/loss in dollar from the base value
   */
  profitLoss?: Array<number>
  /**
   * profit/loss in percentage from the base value
   */
  profitLossPct?: Array<number>
  /**
   * basis in dollar of the profit loss calculation
   */
  baseValue?: number
  /**
   * time window size of each data element
   */
  timeframe?: string
}
