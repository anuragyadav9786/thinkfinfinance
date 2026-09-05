import {
  PiggyBank,
  GraduationCap,
  TrendingUp,
  Home,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface GoalAllocation {
  label: string;
  pct: number;
}

export interface GoalPortfolio {
  id: string;
  name: string;
  icon: LucideIcon;
  target: string;
  horizon: string;
  allocation: GoalAllocation[];
  blurb: string;
  cta: string;
}

export const goalPortfolios: GoalPortfolio[] = [
  {
    id: "retirement",
    name: "Retirement",
    icon: PiggyBank,
    target: "₹2.5 Cr corpus by 60",
    horizon: "25 Yr horizon",
    allocation: [
      { label: "Equity", pct: 60 },
      { label: "Debt", pct: 30 },
      { label: "Gold", pct: 10 },
    ],
    blurb: "A steady, inflation-beating mix that compounds quietly for three decades.",
    cta: "Start Your Retirement Plan",
  },
  {
    id: "education",
    name: "Child's Education",
    icon: GraduationCap,
    target: "₹75 L by 2040",
    horizon: "15 Yr horizon",
    allocation: [
      { label: "Equity", pct: 70 },
      { label: "Debt", pct: 25 },
      { label: "Gold", pct: 5 },
    ],
    blurb: "Growth-tilted allocation that de-risks automatically as admission year nears.",
    cta: "Start Your Child's Education Plan",
  },
  {
    id: "wealth",
    name: "Wealth Creation",
    icon: TrendingUp,
    target: "₹1 Cr in 10 Yrs",
    horizon: "10 Yr horizon",
    allocation: [
      { label: "Equity", pct: 80 },
      { label: "Debt", pct: 15 },
      { label: "Gold", pct: 5 },
    ],
    blurb: "An aggressive, high-conviction portfolio built for long-term compounding.",
    cta: "Start Your Wealth Creation Plan",
  },
  {
    id: "house",
    name: "Buying a House",
    icon: Home,
    target: "₹40 L down payment",
    horizon: "5 Yr horizon",
    allocation: [
      { label: "Equity", pct: 40 },
      { label: "Debt", pct: 55 },
      { label: "Gold", pct: 5 },
    ],
    blurb: "Balanced allocation that protects capital as your target date approaches.",
    cta: "Start Your Home Buying Plan",
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    icon: ShieldCheck,
    target: "₹6 L liquid reserve",
    horizon: "1 Yr horizon",
    allocation: [
      { label: "Liquid Funds", pct: 80 },
      { label: "Sweep FD", pct: 20 },
    ],
    blurb: "Capital-safe, instantly accessible funds for life's unplanned moments.",
    cta: "Start Your Emergency Fund",
  },
];
