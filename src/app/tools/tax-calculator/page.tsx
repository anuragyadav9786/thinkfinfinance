
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import ScrollToTopButton from "@/components/common/scroll-to-top-button";
import ExploreTools from "@/components/tools/explore-tools";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const formSchema = z.object({
  grossIncome: z.coerce.number().min(0, "Income cannot be negative"),
  deductions: z.coerce.number().min(0, "Deductions cannot be negative"),
  age: z.enum(["below_60", "60_to_80", "above_80"]),
});

type FormValues = z.infer<typeof formSchema>;

interface Result {
  oldRegimeTax: number;
  newRegimeTax: number;
  recommended: "old" | "new" | "none";
}

interface CurrencyInfo {
  locale: string;
  currency: string;
  symbol: string;
}

export default function TaxCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo | null>(null);

  useEffect(() => {
    // Tax calculator is specific to India, so we hardcode INR.
    const locale = "en-IN";
    const currency = "INR";
    const symbol = "₹";
    setCurrencyInfo({ locale, currency, symbol });
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grossIncome: 1000000,
      deductions: 150000,
      age: "below_60",
    },
  });

  const { control, setValue, getValues } = form;

  useEffect(() => {
    const calculate = (data: FormValues) => {
      const calculateOldRegimeTax = (income: number, age: string) => {
        let exemptionLimit = 250000;
        if (age === "60_to_80") exemptionLimit = 300000;
        if (age === "above_80") exemptionLimit = 500000;
        
        let taxableIncomeAfterExemption = income - exemptionLimit;
        if(taxableIncomeAfterExemption < 0) taxableIncomeAfterExemption = 0;

        let tax = 0;

        // Rebate under Section 87A for income up to 5L
        if (income <= 500000) return 0;

        if (age === "below_60") {
          if (income <= 250000) tax = 0;
          else if (income <= 500000) tax = (income - 250000) * 0.05;
          else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.20;
          else tax = 112500 + (income - 1000000) * 0.30;
        } else if (age === "60_to_80") {
            if (income <= 300000) tax = 0;
            else if (income <= 500000) tax = (income - 300000) * 0.05;
            else if (income <= 1000000) tax = 10000 + (income-500000)*0.2;
            else tax = 110000 + (income - 1000000) * 0.3;
        } else if (age === "above_80") {
             if(income <= 500000) tax = 0;
             else if (income <= 1000000) tax = (income-500000)*0.2;
             else tax = 100000 + (income - 1000000) * 0.3;
        }

        if (tax > 0) {
            tax += tax * 0.04; // 4% Health and Education Cess
        }

        return tax;
      };
    
      const calculateNewRegimeTax = (income: number) => {
        // As per FY 2023-24 (AY 2024-25)
        if (income <= 750000) return 0; 
        
        const taxableIncome = income - 50000; // Standard deduction
        let tax = 0;

        if (taxableIncome > 300000 && taxableIncome <= 600000) tax = (taxableIncome - 300000) * 0.05;
        else if (taxableIncome > 600000 && taxableIncome <= 900000) tax = 15000 + (taxableIncome - 600000) * 0.10;
        else if (taxableIncome > 900000 && taxableIncome <= 1200000) tax = 45000 + (taxableIncome - 900000) * 0.15;
        else if (taxableIncome > 1200000 && taxableIncome <= 1500000) tax = 90000 + (taxableIncome - 1200000) * 0.20;
        else if (taxableIncome > 1500000) tax = 150000 + (taxableIncome - 1500000) * 0.30;
        
        if (tax > 0) {
            tax += tax * 0.04; // 4% Health and Education Cess
        }

        return tax;
      };

      const parsedData = formSchema.safeParse(data);
      if(parsedData.success) {
        const { grossIncome, deductions, age } = parsedData.data;
        const oldRegimeTaxableIncome = Math.max(0, grossIncome - deductions - 50000); // 50k standard deduction
        
        const oldRegimeTax = calculateOldRegimeTax(oldRegimeTaxableIncome, age);
        const newRegimeTax = calculateNewRegimeTax(grossIncome);
        
        setResult({
          oldRegimeTax,
          newRegimeTax,
          recommended: oldRegimeTax < newRegimeTax ? "old" : "new",
        });
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

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-sm py-1 px-3 rounded-full border-primary/50 text-primary">Calculator</Badge>
              <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mt-2">Income Tax Calculator (India)</h1>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">Compare the old and new tax regimes to find out which is more beneficial for you.</p>
            </div>
            
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                  <Card className="shadow-lg h-full">
                      <CardHeader><CardTitle className="font-headline">Your Financials</CardTitle></CardHeader>
                      <Form {...form}>
                      <CardContent>
                        <div className="space-y-6">
                            <FormField control={control} name="grossIncome" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Gross Annual Income</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{currencyInfo?.symbol} <Input type="number" className="inline-block w-28 p-0 border-0 shadow-none focus-visible:ring-0" {...field} onChange={e => setValue(field.name, Number(e.target.value))} /></div></div><Slider min={0} max={10000000} step={10000} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /><FormMessage /></FormItem> )} />
                            <FormField control={control} name="deductions" render={({ field }) => ( <FormItem><div className="flex justify-between items-center mb-2"><FormLabel>Total Deductions</FormLabel><div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">{currencyInfo?.symbol} <Input type="number" className="inline-block w-28 p-0 border-0 shadow-none focus-visible:ring-0" {...field} onChange={e => setValue(field.name, Number(e.target.value))} /></div></div><Slider min={0} max={500000} step={1000} value={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /><FormMessage /></FormItem> )} />
                            <FormField control={control} name="age" render={({ field }) => ( <FormItem><FormLabel>Age Group</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select age group" /></SelectTrigger></FormControl><SelectContent><SelectItem value="below_60">Below 60 years</SelectItem><SelectItem value="60_to_80">60 to 80 years</SelectItem><SelectItem value="above_80">Above 80 years</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
                        </div>
                      </CardContent>
                      </Form>
                  </Card>
              </div>
                        
              <div className="md:col-span-8">
                  {result && currencyInfo ? (
                      <div className="flex flex-col h-full gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
                           <Card className={`flex flex-col p-6 text-center border-2 ${result.recommended === "old" ? "border-primary bg-primary/5" : ""}`}>
                              <CardTitle className="font-headline text-xl mb-2">Old Regime</CardTitle>
                              <div className="flex-grow flex items-center justify-center">
                                <p className="text-4xl font-bold">{formatCurrency(result.oldRegimeTax)}</p>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">Tax Liability</p>
                           </Card>
                           <Card className={`flex flex-col p-6 text-center border-2 ${result.recommended === "new" ? "border-primary bg-primary/5" : ""}`}>
                              <CardTitle className="font-headline text-xl mb-2">New Regime</CardTitle>
                              <div className="flex-grow flex items-center justify-center">
                                <p className="text-4xl font-bold">{formatCurrency(result.newRegimeTax)}</p>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">Tax Liability</p>
                           </Card>
                        </div>
                        <Card className="p-6 text-center bg-secondary/50">
                          <CardTitle className="font-headline text-xl flex items-center justify-center gap-2"><Check className="text-green-500"/> Recommended Regime</CardTitle>
                          <p className="mt-2 text-lg">Based on your inputs, the <span className="font-bold text-primary capitalize">{result.recommended} Regime</span> is more beneficial, potentially saving you more on taxes.</p>
                        </Card>
                      </div>
                  ) : (
                      <Card className="flex items-center justify-center h-full text-muted-foreground shadow-lg"><p>Enter valid details to see the calculation</p></Card>
                  )}
              </div>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 prose prose-lg dark:prose-invert max-w-none">
                     <h2 className="font-headline text-2xl font-bold">About the Income Tax Calculator</h2>
                     <p>{"Navigating India's tax system can be complex, especially with the choice between the old and new tax regimes. This calculator helps you compare your tax liability under both regimes, allowing you to make an informed decision and potentially save money."}</p>
                     
                     <h3 className="font-headline text-xl font-bold">How it works?</h3>
                     <p>Enter your gross annual income, total eligible deductions (like those under Section 80C, 80D, etc.), and your age group. The calculator will compute your tax liability under both the old regime (which allows for various deductions) and the new regime (which offers lower tax rates but fewer deductions). It will then recommend the more tax-efficient option for you. This calculator is for FY 2023-24 (AY 2024-25).</p>
                     
                     <h3 className="font-headline text-xl font-bold">Key Terms:</h3>
                     <ul>
                        <li><strong>Gross Annual Income:</strong> Your total income before any deductions.</li>
                        <li><strong>Total Deductions:</strong> The sum of all tax-saving investments and expenses you are eligible to claim under the old tax regime.</li>
                        <li><strong>Old Regime vs. New Regime:</strong> Two parallel tax structures in India. The old regime has higher rates but allows for numerous deductions, while the new regime has lower slab rates but forgoes most deductions.</li>
                     </ul>
                </div>
                <aside className="md:col-span-1">
                    <ExploreTools />
                </aside>
            </div>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
