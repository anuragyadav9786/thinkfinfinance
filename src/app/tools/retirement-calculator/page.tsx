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
import { TrendingUp, Target, PiggyBank } from "lucide-react";

const formSchema = z.object({
  currentAge: z.coerce.number().min(18, "Must be at least 18").max(60, "Cannot exceed 60"),
  retirementAge: z.coerce.number().min(40, "Must be at least 40").max(70, "Cannot exceed 70"),
  monthlyExpenses: z.coerce.number().min(1000, "Must be at least 1,000"),
  expectedInflation: z.coerce.number().min(1, "Must be at least 1%").max(15, "Cannot exceed 15%"),
  preRetirementReturn: z.coerce.number().min(1, "Must be at least 1%").max(20, "Cannot exceed 20%"),
  postRetirementReturn: z.coerce.number().min(1, "Must be at least 1%").max(15, "Cannot exceed 15%"),
  lifeExpectancy: z.coerce.number().min(70, "Must be at least 70").max(100, "Cannot exceed 100"),
});

type FormValues = z.infer<typeof formSchema>;

interface Result {
  retirementCorpus: number;
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

export default function RetirementCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo | null>(null);

  useEffect(() => {
    const locale = "en-IN";
    const currency = "INR";
    const symbol = "₹";
    setCurrencyInfo({ locale, currency, symbol });
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 25,
      retirementAge: 60,
      monthlyExpenses: 50000,
      expectedInflation: 6,
      preRetirementReturn: 12,
      postRetirementReturn: 7,
      lifeExpectancy: 85,
    },
  });

  const { control, setValue, getValues } = form;

  useEffect(() => {
    const calculate = (data: FormValues) => {
      const parsedData = formSchema.safeParse(data);
      if(parsedData.success) {
        const { currentAge, retirementAge, monthlyExpenses, expectedInflation, preRetirementReturn, postRetirementReturn, lifeExpectancy } = parsedData.data;
        const yearsToRetire = retirementAge - currentAge;
        const retirementYears = lifeExpectancy - retirementAge;

        if (yearsToRetire <= 0 || retirementYears <= 0) {
            setResult(null);
            return;
        }

        const futureMonthlyExpense = monthlyExpenses * Math.pow(1 + expectedInflation / 100, yearsToRetire);
        const futureAnnualExpense = futureMonthlyExpense * 12;

        const rate = (1 + postRetirementReturn / 100) / (1 + expectedInflation / 100) - 1;
        const retirementCorpus = (futureAnnualExpense * (1 + rate) * (Math.pow(1 + rate, retirementYears) - 1)) / (rate * Math.pow(1 + rate, retirementYears));
        
        const monthlyReturnRate = preRetirementReturn / 100 / 12;
        const numberOfMonths = yearsToRetire * 12;

        const monthlySip = (retirementCorpus * monthlyReturnRate) / (Math.pow(1 + monthlyReturnRate, numberOfMonths) - 1);
        const totalInvestment = monthlySip * numberOfMonths;
        const wealthGained = retirementCorpus - totalInvestment;
        
        const chartData = [];
        for (let i = 1; i <= yearsToRetire; i++) {
            const months = i * 12;
            const value = monthlySip * ((Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate);
            chartData.push({
                year: currentAge + i,
                totalInvestment: monthlySip * months,
                totalValue: value,
            });
        }

        if (isFinite(monthlySip) && isFinite(totalInvestment) && isFinite(wealthGained) && retirementCorpus > 0) {
          setResult({
              retirementCorpus,
              monthlySip,
              totalInvestment,
              wealthGained,
              chartData,
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
          <p className="font-bold text-lg mb-2">Age {label}</p>
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
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mt-2">Retirement Saving Plan Calculator</h1>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">Plan for your golden years. Calculate the corpus you need and the monthly investment required.</p>
          </div>

            <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                    <Card className="shadow-lg h-full">
                        <CardHeader><CardTitle className="font-headline">Input Parameters</CardTitle></CardHeader>
                        <Form {...form}>
                        <CardContent>
                          <div className="space-y-6">
                            <FormField control={control} name="currentAge" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Current Age</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value} yrs</div></div><Slider min={18} max={60} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /><FormMessage /></FormItem> )} />
                            <FormField control={control} name="retirementAge" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Retirement Age</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value} yrs</div></div><Slider min={40} max={70} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /><FormMessage /></FormItem> )} />
                            <FormField control={control} name="monthlyExpenses" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Monthly Expenses</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{currencyInfo?.symbol} <Input type="number" className="inline-block w-24 p-0 border-0 shadow-none focus-visible:ring-0" {...field} onChange={e => setValue(field.name, Number(e.target.value))} /></div></div><Slider min={1000} max={200000} step={1000} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /><FormMessage /></FormItem> )} />
                            <FormField control={control} name="expectedInflation" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Inflation Rate</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value}%</div></div><Slider min={1} max={15} step={0.5} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /><FormMessage /></FormItem> )} />
                            <FormField control={control} name="preRetirementReturn" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Pre-Retirement Return</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value}%</div></div><Slider min={1} max={20} step={0.5} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /><FormMessage /></FormItem> )} />
                            <FormField control={control} name="postRetirementReturn" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Post-Retirement Return</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value}%</div></div><Slider min={1} max={15} step={0.5} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /><FormMessage /></FormItem> )} />
                            <FormField control={control} name="lifeExpectancy" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Life Expectancy</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{field.value} yrs</div></div><Slider min={70} max={100} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /><FormMessage /></FormItem> )} />
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
                              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"><Target className="w-4 h-4" /> Corpus Needed</CardTitle></CardHeader>
                              <CardContent><p className="text-2xl font-bold text-primary">{formatCurrency(result.retirementCorpus)}</p></CardContent>
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
                           <CardHeader><CardTitle className="font-headline">Retirement Corpus Growth</CardTitle></CardHeader>
                           <CardContent className="h-80 w-full p-2">
                               <ResponsiveContainer>
                                   <AreaChart data={result.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                       <CartesianGrid strokeDasharray="3 3" />
                                       <XAxis dataKey="year" tickFormatter={(val) => `Age ${val}`} />
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
                     <h2 className="font-headline text-2xl font-bold">About the Retirement Calculator</h2>
                     <p>{"Planning for retirement is crucial for financial independence in your golden years. This calculator helps you determine the total amount of money (corpus) you'll need to accumulate by the time you retire, based on your current lifestyle, age, and financial expectations. It also calculates the Systematic Investment Plan (SIP) amount you need to invest monthly to reach that goal."}</p>
                     
                     <h3 className="font-headline text-xl font-bold">How it works?</h3>
                     <p>The calculator projects your future expenses by adjusting your current monthly expenses for inflation over the years until your retirement. It then calculates the total retirement corpus required to sustain those expenses throughout your post-retirement life, considering a conservative return on investment. Finally, it tells you the monthly SIP required to build this corpus.</p>
                     
                     <h3 className="font-headline text-xl font-bold">Key Terms:</h3>
                     <ul>
                         <li><strong>Pre-Retirement Return:</strong> The expected annual return on your investments before you retire (usually higher as you can take more risk).</li>
                         <li><strong>Post-Retirement Return:</strong> The expected annual return on your investments after you retire (usually lower and more conservative).</li>
                         <li><strong>Life Expectancy:</strong> The age up to which you expect to live, to plan for your expenses.</li>
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
