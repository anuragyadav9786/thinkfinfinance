"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { getCurrencyInfo, formatCurrency, formatYAxis } from "@/utils/currency";
import type { GoalChartConfig } from "@/components/landing/goal-details";

const TONE_COLORS: Record<"muted" | "positive" | "warning", string> = {
  muted: "hsl(var(--muted-foreground) / 0.4)",
  positive: "hsl(var(--primary))",
  warning: "hsl(var(--destructive))",
};

interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string | number;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  const currencyInfo = getCurrencyInfo();
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        {label !== undefined && <p className="mb-1 text-sm font-semibold">{label}</p>}
        {payload.map((entry) => (
          <p key={entry.dataKey} className="text-sm" style={{ color: entry.color || entry.payload?.fill }}>
            {entry.name}: {formatCurrency(entry.value, currencyInfo)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function GoalChart({ chart }: { chart: GoalChartConfig }) {
  const currencyInfo = getCurrencyInfo();

  if (chart.type === "line") {
    return (
      <ResponsiveContainer>
        <AreaChart data={chart.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={chart.xKey} />
          <YAxis tickFormatter={(value) => formatYAxis(value, currencyInfo)} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" />
          {chart.series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              fill={s.color.replace(/\)$/, " / 0.15)")}
              connectNulls={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer>
      <BarChart data={chart.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(value) => formatYAxis(value, currencyInfo)} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" name="Amount" radius={[6, 6, 0, 0]}>
          {chart.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={TONE_COLORS[entry.tone]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
