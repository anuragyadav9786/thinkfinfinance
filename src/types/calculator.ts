export interface Result {
  totalInvestment: number;
  estimatedReturns: number;
  totalValue: number;
  chartData: { year: number; totalInvestment: number; totalValue: number }[];
}

export interface CurrencyInfo {
  locale: string;
  currency: string;
  symbol: string;
}

export type CalculatorType = "monthly" | "lumpsum";

export interface FormValues {
  monthlyInvestment: number;
  expectedReturnRate: number;
  timePeriod: number;
}
