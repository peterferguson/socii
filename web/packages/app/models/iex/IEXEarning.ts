
export interface IEXEarning {
  actualEPS: number;
  consensusEPS: number;
  estimatedEPS: number;
  announceTime: string; // TODO: API docs don't mention this, but this can probably be an enum
  numberOfEstimates: number;
  EPSSurpriseDollar: number;
  EPSReportDate: string;
  fiscalPeriod: string;
  fiscalEndDate: string;
}
