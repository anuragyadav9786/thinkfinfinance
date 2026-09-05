
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import ScrollToTopButton from "@/components/common/scroll-to-top-button";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import ExploreTools from "@/components/tools/explore-tools";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, School, PiggyBank } from "lucide-react";

const formSchema = z.object({
  currentAge: z.coerce.number().min(1, "Current age must be at least 1").max(18, "Current age cannot exceed 18"),
  collegeAge: z.coerce.number().min(18, "College age must be at least 18").max(25, "College age cannot exceed 25"),
  currentCost: z.coerce.number().min(10000, "Current cost must be at least 10,000"),
  inflationRate: z.coerce.number().min(1, "Inflation rate must be at least 1%").max(15, "Inflation rate cannot exceed 15%"),
  expectedReturn: z.coerce.number().min(1, "Expected return must be at least 1%").max(20, "Expected return cannot exceed 20%"),
});

type FormValues = z.infer<typeof formSchema>;

interface Result {
  futureCost: number;
  monthlySip: number;
  totalInvestment: number;
  wealthGained: number;
  chartData: { year: number; totalInvestment: number; totalValue: number }[];
}

interface CurrencyInfo {
  locale: string;
  currency: string;
  symbol: string;
}

export default function ChildEducationPlanner() {
  const [result, setResult] = useState<Result | null>(null);
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo | null>(null);

  useEffect(() => {
    // Hardcode to en-IN for consistent Rupee symbol
    const locale = "en-IN";
    const currency = "INR";
    const symbol = "₹";
    setCurrencyInfo({ locale, currency, symbol });
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 1,
      collegeAge: 18,
      currentCost: 500000,
      inflationRate: 6,
      expectedReturn: 12,
    },
  });

  const { control, setValue, getValues } = form;

  useEffect(() => {
    const calculate = (data: FormValues) => {
      const parsedData = formSchema.safeParse(data);
      if (parsedData.success) {
        const { currentAge, collegeAge, currentCost, inflationRate, expectedReturn } = parsedData.data;
        const yearsToCollege = collegeAge - currentAge;
        if (yearsToCollege <= 0) {
          setResult(null);
          return;
        }

        const inflation = inflationRate / 100;
        const futureCost = currentCost * Math.pow(1 + inflation, yearsToCollege);

        const monthlyReturnRate = expectedReturn / 100 / 12;
        const numberOfMonths = yearsToCollege * 12;

        const monthlySip = (futureCost * monthlyReturnRate) / (Math.pow(1 + monthlyReturnRate, numberOfMonths) - 1);
        const totalInvestment = monthlySip * numberOfMonths;
        const wealthGained = futureCost - totalInvestment;

        const chartData = [];
        for (let i = 1; i <= yearsToCollege; i++) {
            const months = i * 12;
            const value = monthlySip * ((Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate);
            chartData.push({
                year: i,
                totalInvestment: monthlySip * months,
                totalValue: value,
            });
        }


        if (isFinite(monthlySip) && isFinite(totalInvestment) && isFinite(wealthGained)) {
          setResult({
              futureCost,
              monthlySip,
              totalInvestment,
              wealthGained,
              chartData
          });
        } else {
          setResult(null);
        }
      } else {
        setResult(null);
      }
    };
    
    const subscription = form.watch((value) => {
        calculate(value as FormValues);
    });
    calculate(getValues());
    return () => subscription.unsubscribe();
  }, [form, getValues]);

  const formatCurrency = (value: number) => {
    if (!currencyInfo) return value.toString();
    return new Intl.NumberFormat(currencyInfo.locale, {
      style: "currency",
      currency: currencyInfo.currency,
      maximumFractionDigits: 0,
    }).format(value);
  };
    
  const formatYAxis = (value: number) => {
    if (!currencyInfo) return value.toString();
    return new Intl.NumberFormat(currencyInfo.locale, {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1
    }).format(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-background border rounded-lg shadow-lg">
          <p className="font-bold text-lg mb-2">Year {label}</p>
          <p className="text-primary">Total Value: {formatCurrency(payload[0].value)}</p>
          <p className="text-chart-2">Total Investment: {formatCurrency(payload[1].value)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-sm py-1 px-3 rounded-full border-primary/50 text-primary">Calculator</Badge>
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mt-2">Child Education Planner</h1>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">{"Estimate the future cost of your child's education and plan your investments accordingly."}</p>
          </div>
            
            <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                    <Card className="shadow-lg h-full">
                        <CardHeader><CardTitle className="font-headline">Input Parameters</CardTitle></CardHeader>
                        <Form {...form}>
                        <CardContent>
                            <div className="space-y-6">
                                <FormField control={control} name="currentCost" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Current Cost</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{currencyInfo?.symbol} <Input type="number" className="inline-block w-24 p-0 border-0 shadow-none focus-visible:ring-0" {...field} onChange={e => setValue(field.name, Number(e.target.value))} /></div></div><Slider min={10000} max={5000000} step={10000} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /><FormMessage /></FormItem> )} />
                                <FormField control={control} name="currentAge" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>{"Child's Current Age"}</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value} yrs</div></div><Slider min={1} max={18} step={1} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /><FormMessage /></FormItem> )} />
                                <FormField control={control} name="collegeAge" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Funds Required At Age</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value} yrs</div></div><Slider min={18} max={25} step={1} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /><FormMessage /></FormItem> )} />
                                <FormField control={control} name="inflationRate" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Inflation Rate</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value}%</div></div><Slider min={1} max={15} step={0.5} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /><FormMessage /></FormItem> )} />
                                <FormField control={control} name="expectedReturn" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Expected Return</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value}%</div></div><Slider min={1} max={20} step={0.5} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /><FormMessage /></FormItem> )} />
                            </div>
                        </CardContent>
                        </Form>
                    </Card>
                </div>
                
                <div className="md:col-span-8">
                  {result && currencyInfo ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           <Card className="text-center">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"><School className="w-4 h-4" /> Future Cost</CardTitle></CardHeader>
                              <CardContent><p className="text-2xl font-bold text-primary">{formatCurrency(result.futureCost)}</p></CardContent>
                           </Card>
                           <Card className="text-center">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"><PiggyBank className="w-4 h-4" /> Monthly SIP</CardTitle></CardHeader>
                              <CardContent><p className="text-2xl font-bold">{formatCurrency(result.monthlySip)}</p></CardContent>
                           </Card>
                           <Card className="text-center">
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"><TrendingUp className="w-4 h-4" /> Wealth Gained</CardTitle></CardHeader>
                              <CardContent><p className="text-2xl font-bold">{formatCurrency(result.wealthGained)}</p></CardContent>
                           </Card>
                        </div>
                        <Card className="shadow-lg">
                           <CardHeader><CardTitle className="font-headline">Investment Growth Over Time</CardTitle></CardHeader>
                           <CardContent className="h-80 w-full p-2">
                               <ResponsiveContainer>
                                   <AreaChart data={result.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                       <CartesianGrid strokeDasharray="3 3" />
                                       <XAxis dataKey="year" tickFormatter={(val) => `Yr ${val}`} />
                                       <YAxis tickFormatter={formatYAxis} />
                                       <Tooltip content={<CustomTooltip />} />
                                       <Legend iconType="circle" />
                                       <Area type="monotone" dataKey="totalValue" name="Total Value" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                                       <Area type="monotone" dataKey="totalInvestment" name="Investment" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2) / 0.2)" />
                                   </AreaChart>
                               </ResponsiveContainer>
                           </CardContent>
                        </Card>
                      </div>
                  ) : (
                      <Card className="flex items-center justify-center h-full text-muted-foreground shadow-lg"><p>Enter valid details to see the calculation</p></Card>
                  )}
                </div>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 prose prose-lg dark:prose-invert max-w-none">
                     <h2 className="font-headline text-2xl font-bold">About the Child Education Planner</h2>
                     <p>{"Planning for your child's education is one of the most important financial goals for any parent. With rising education costs, it's crucial to start early and invest smartly. This calculator helps you estimate the future cost of education and the monthly investment (SIP) required to build the necessary corpus."}</p>
                     
                     <h3 className="font-headline text-xl font-bold">How it works?</h3>
                     <p>The calculator uses your inputs to project the future cost of education, factoring in inflation. It then calculates the required monthly SIP based on the expected rate of return on your investments. This provides a clear roadmap to achieving your goal.</p>
                     
                     <h3 className="font-headline text-xl font-bold">Key Terms:</h3>
                     <ul>
                         <li><strong>Current Cost of Education:</strong> The present-day cost for the desired course or degree.</li>
                         <li><strong>{"Child's Current Age:"}</strong> {"Your child's age today."}</li>
                         <li><strong>Age when funds are required:</strong> The age your child will be when they start higher education.</li>
                         <li><strong>Expected Inflation Rate:</strong> The annual rate at which you expect education costs to increase.</li>
                         <li><strong>Expected Annual Return:</strong> The rate of return you expect from your investments.</li>
                     </ul>
                </div>
                <aside className="md:col-span-1">
                    <ExploreTools />
                </aside>
            </div>
        </div>
      </main>
      <Footer contactMessage="" setContactMessage={() => {}} />
      <ScrollToTopButton />
    </div>
  );
}
