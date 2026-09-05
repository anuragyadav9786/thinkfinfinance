import { CurrencyInfo } from "@/types/calculator";

export function getCurrencyInfo(): CurrencyInfo {
  return {
    locale: "en-IN",
    currency: "INR",
    symbol: "₹"
  };
}

export function formatCurrency(value: number, currencyInfo: CurrencyInfo | null): string {
  if (!currencyInfo) return value.toString();
  
  return new Intl.NumberFormat(currencyInfo.locale, {
    style: "currency",
    currency: currencyInfo.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatYAxis(value: number, currencyInfo: CurrencyInfo | null): string {
  if (!currencyInfo) return value.toString();
  
  return new Intl.NumberFormat(currencyInfo.locale, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  }).format(value);
}
