export type GoalChartConfig =
  | {
      type: "line";
      xKey: string;
      data: Record<string, number>[];
      series: { key: string; name: string; color: string }[];
    }
  | {
      type: "bar";
      data: { label: string; value: number; tone: "muted" | "positive" | "warning" }[];
    };

export interface GoalDetail {
  insightTitle: string;
  insightBody: string;
  example: string;
  chart: GoalChartConfig;
  chartCaption: string;
  calculatorLink?: { label: string; href: string };
}

export const goalDetails: Record<string, GoalDetail> = {
  retirement: {
    insightTitle: "The 10-year head start beats a bigger paycheck",
    insightBody:
      "Most people believe they need to earn more to retire comfortably. What actually matters more is when you start — because the earliest money you invest has the most years to compound.",
    example:
      "₹10,000/month invested at 12% p.a., starting at age 30 vs. age 40, both investing until 60: starting at 30 means you put in ₹36L total and end up with ₹3.53 Cr. Starting at 40 means you put in ₹24L (33% less) and end up with only ₹1.0 Cr. Investing for just 10 more years produces 3.5x more wealth.",
    chart: {
      type: "line",
      xKey: "age",
      data: [
        { age: 30, start30: 0 },
        { age: 35, start30: 825000 },
        { age: 40, start30: 2323000, start40: 0 },
        { age: 45, start30: 5046000, start40: 825000 },
        { age: 50, start30: 9991000, start40: 2323000 },
        { age: 55, start30: 18976000, start40: 5046000 },
        { age: 60, start30: 35299000, start40: 9991000 },
      ],
      series: [
        { key: "start30", name: "Start at Age 30", color: "hsl(var(--primary))" },
        { key: "start40", name: "Start at Age 40", color: "hsl(var(--chart-4))" },
      ],
    },
    chartCaption: "Same ₹10,000/month SIP at 12% p.a. — a 10-year head start nearly quadruples the outcome.",
    calculatorLink: { label: "Try the Retirement Calculator", href: "/tools/retirement-calculator" },
  },
  education: {
    insightTitle: "You're inflating the wrong number",
    insightBody:
      "People usually estimate a future course fee using general inflation (around 6%). Education costs actually rise much faster — historically 10% or more a year — so the number most families plan around is roughly half of the real cost.",
    example:
      "A course that costs ₹10L today looks like ₹24L in 15 years at general inflation (6%). At real education inflation (10%), it's actually ₹42L — nearly double what most people plan for.",
    chart: {
      type: "bar",
      data: [
        { label: "Today", value: 1000000, tone: "muted" },
        { label: "6% Inflation", value: 2397000, tone: "muted" },
        { label: "10% Inflation", value: 4177000, tone: "warning" },
      ],
    },
    chartCaption: "A ₹10L course today, projected 15 years out at general vs. real education inflation.",
    calculatorLink: { label: "Try the Child Education Planner", href: "/tools/child-education-planner" },
  },
  wealth: {
    insightTitle: "A few % return difference isn't small, it's everything",
    insightBody:
      "People chase an extra 1-2% on a fixed deposit but ignore asset allocation, which matters far more over long horizons. A handful of percentage points of annual return compounds into a completely different outcome over 20 years.",
    example:
      "₹5L invested for 20 years: at 8% it becomes ₹23.3L; at 12% it becomes ₹48.2L; at 14% it becomes ₹68.8L. A 6-point difference in annual return roughly triples the final outcome.",
    chart: {
      type: "line",
      xKey: "year",
      data: [
        { year: 0, r8: 500000, r12: 500000, r14: 500000 },
        { year: 5, r8: 734700, r12: 881200, r14: 962900 },
        { year: 10, r8: 1079500, r12: 1552900, r14: 1853600 },
        { year: 15, r8: 1586100, r12: 2736600, r14: 3570600 },
        { year: 20, r8: 2330500, r12: 4823100, r14: 6878100 },
      ],
      series: [
        { key: "r8", name: "8% p.a.", color: "hsl(var(--chart-4))" },
        { key: "r12", name: "12% p.a.", color: "hsl(var(--primary))" },
        { key: "r14", name: "14% p.a.", color: "hsl(var(--chart-2))" },
      ],
    },
    chartCaption: "₹5L invested once, left untouched for 20 years, at three different annual return rates.",
    calculatorLink: { label: "Try the SIP Calculator", href: "/tools/sip-calculator" },
  },
  house: {
    insightTitle: "Your down payment matters more than your EMI negotiation",
    insightBody:
      "People spend hours negotiating a slightly lower interest rate but barely think about the down payment. A bigger down payment, built through disciplined saving before you buy, saves far more over the life of the loan.",
    example:
      "On an ₹80L house over a 20-year loan at 8.5%: a 20% down payment (₹16L) means an EMI of ₹55,540 and ₹69.3L paid in interest. A 40% down payment (₹32L) means a lower EMI of ₹41,650 and only ₹52.0L in interest — an extra ₹16L saved upfront saves ₹17.3L in interest.",
    chart: {
      type: "bar",
      data: [
        { label: "20% Down Payment", value: 6930000, tone: "warning" },
        { label: "40% Down Payment", value: 5196000, tone: "positive" },
      ],
    },
    chartCaption: "Total interest paid over a 20-year, 8.5% loan on an ₹80L house.",
    calculatorLink: { label: "Plan your down payment with the SIP Calculator", href: "/tools/sip-calculator" },
  },
  emergency: {
    insightTitle: "The real risk isn't the emergency, it's bad timing",
    insightBody:
      "Job losses tend to spike exactly when markets fall — recessions cause both at once. Without a cash buffer, an emergency forces you to sell your investments at the worst possible moment, turning a temporary market dip into a permanent loss.",
    example:
      "You lose your job when your equity portfolio is down 25%. Without an emergency fund, you sell ₹3L of it to cover expenses — locking in that loss for good. With an emergency fund, that ₹3L stays invested and recovers when markets do, typically within 12-18 months.",
    chart: {
      type: "bar",
      data: [
        { label: "No Emergency Fund", value: 300000, tone: "warning" },
        { label: "With Emergency Fund", value: 0, tone: "positive" },
      ],
    },
    chartCaption: "Loss locked in from selling ₹3L of equity during a 25% downturn — with vs. without a buffer.",
  },
};
