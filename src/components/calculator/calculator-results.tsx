import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { PiggyBank, TrendingUp, Gem } from "lucide-react";
import { Result, CurrencyInfo } from "@/types/calculator";
import { formatCurrency, formatYAxis } from "@/utils/currency";

interface CalculatorResultsProps {
  result: Result;
  currencyInfo: CurrencyInfo;
}

interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-background border rounded-lg shadow-lg">
        <p className="font-bold text-lg mb-2">Year {label}</p>
        <p className="text-primary">Total Value: {formatCurrency(payload[0].value, { locale: "en-IN", currency: "INR", symbol: "₹" })}</p>
        <p className="text-chart-2">Total Investment: {formatCurrency(payload[1].value, { locale: "en-IN", currency: "INR", symbol: "₹" })}</p>
      </div>
    );
  }
  return null;
}

export function CalculatorResults({ result, currencyInfo }: CalculatorResultsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <Gem className="w-4 h-4" /> Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(result.totalValue, currencyInfo)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <PiggyBank className="w-4 h-4" /> Invested Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(result.totalInvestment, currencyInfo)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" /> Wealth Gained
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(result.estimatedReturns, currencyInfo)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Investment Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-80 w-full p-2">
          <ResponsiveContainer>
            <AreaChart data={result.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tickFormatter={(val) => `Yr ${val}`} />
              <YAxis tickFormatter={(value) => formatYAxis(value, currencyInfo)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" />
              <Area 
                type="monotone" 
                dataKey="totalValue" 
                name="Total Value" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.2)" 
              />
              <Area 
                type="monotone" 
                dataKey="totalInvestment" 
                name="Investment" 
                stroke="hsl(var(--chart-2))" 
                fill="hsl(var(--chart-2) / 0.2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
