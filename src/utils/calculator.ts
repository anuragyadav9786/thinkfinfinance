import { Result, FormValues } from "@/types/calculator";

export function calculateMonthlySIP(data: FormValues): Result {
  const { monthlyInvestment, expectedReturnRate, timePeriod } = data;

  // Use EFFECTIVE monthly rate, not nominal/12:
  // i = (1 + annualRate)^(1/12) - 1
  const annualRate = expectedReturnRate / 100;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

  const totalMonths = timePeriod * 12;

  // Handle 0% return cleanly
  const growthFactor =
    monthlyRate === 0
      ? totalMonths
      : (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;

  // SIP (annuity-due): M * growthFactor * (1 + i)
  const totalValue = monthlyInvestment * growthFactor * (1 + monthlyRate);

  const totalInvestment = monthlyInvestment * totalMonths;
  const estimatedReturns = totalValue - totalInvestment;

  const chartData: Array<{ year: number; totalInvestment: number; totalValue: number }> = [];
  for (let year = 1; year <= timePeriod; year++) {
    const m = year * 12;

    const yearGrowth =
      monthlyRate === 0
        ? m
        : (Math.pow(1 + monthlyRate, m) - 1) / monthlyRate;

    const value = monthlyInvestment * yearGrowth * (1 + monthlyRate);

    chartData.push({
      year,
      totalInvestment: monthlyInvestment * m,
      totalValue: value,
    });
  }

  return {
    totalInvestment,
    estimatedReturns,
    totalValue,
    chartData,
  };
}


export function calculateLumpsumSIP(data: FormValues): Result {
  const { monthlyInvestment: lumpsumAmount, expectedReturnRate, timePeriod } = data;
  const annualRate = expectedReturnRate / 100;
  
  // Compound interest formula: P * (1 + r)^t
  const totalValue = lumpsumAmount * Math.pow(1 + annualRate, timePeriod);
  const totalInvestment = lumpsumAmount;
  const estimatedReturns = totalValue - totalInvestment;

  const chartData = [];
  for (let i = 1; i <= timePeriod; i++) {
    const value = lumpsumAmount * Math.pow(1 + annualRate, i);
    chartData.push({
      year: i,
      totalInvestment: lumpsumAmount,
      totalValue: value,
    });
  }

  return {
    totalInvestment,
    estimatedReturns,
    totalValue,
    chartData
  };
}

export function isValidResult(result: Result): boolean {
  return (
    isFinite(result.totalValue) && 
    isFinite(result.totalInvestment) && 
    isFinite(result.estimatedReturns)
  );
}
