
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import ScrollToTopButton from "@/components/common/scroll-to-top-button";
import ExploreTools from "@/components/tools/explore-tools";
import { Badge } from "@/components/ui/badge";
import { CalculatorForm } from "@/components/calculator/calculator-form";
import { CalculatorResults } from "@/components/calculator/calculator-results";
import { useCalculator } from "@/hooks/use-calculator";
import { CalculatorType } from "@/types/calculator";

export default function SipCalculator() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("monthly");
  
  const monthlyCalculator = useCalculator("monthly");
  const lumpsumCalculator = useCalculator("lumpsum");
  
  const currentCalculator = activeTab === "monthly" ? monthlyCalculator : lumpsumCalculator;

  const handleTabChange = (value: string) => {
    if (value === "monthly" || value === "lumpsum") {
      setActiveTab(value);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-sm py-1 px-3 rounded-full border-primary/50 text-primary">
              Calculator
            </Badge>
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
              SIP Calculator
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
              Forecast the future value of your investments with our Systematic Investment Plan (SIP) calculator.
            </p>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <Card className="shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="font-headline">Input Parameters</CardTitle>
                  <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mt-4">
                      <TabsTrigger value="monthly">Monthly SIP</TabsTrigger>
                      <TabsTrigger value="lumpsum">Lumpsum Investment</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <Form {...currentCalculator.form} key={activeTab}>
                  <CardContent>
                    <CalculatorForm
                      control={currentCalculator.control}
                      setValue={currentCalculator.setValue}
                      currencyInfo={currentCalculator.currencyInfo}
                      type={activeTab}
                    />
                  </CardContent>
                </Form>
              </Card>
            </div>
            
            <div className="md:col-span-8">
              {currentCalculator.result && currentCalculator.currencyInfo ? (
                <CalculatorResults
                  result={currentCalculator.result}
                  currencyInfo={currentCalculator.currencyInfo}
                />
              ) : (
                <Card className="flex items-center justify-center h-full text-muted-foreground shadow-lg">
                  <p>Enter valid details to see the calculation</p>
                </Card>
              )}
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 prose prose-lg dark:prose-invert max-w-none">
              <h2 className="font-headline text-2xl font-bold">About the SIP Calculator</h2>
              <p>
                A Systematic Investment Plan (SIP) is a disciplined way of investing a fixed amount of money at 
                regular intervals (usually monthly) in mutual funds. It helps in averaging out the cost of 
                investment and harnessing the power of compounding. This calculator helps you forecast the 
                potential returns on your SIP investments.
              </p>
              
              <h3 className="font-headline text-xl font-bold">How it works?</h3>
              <p>
                By providing the monthly investment amount, the expected rate of return, and the investment 
                duration, the calculator projects the total value of your investment. It breaks down the final 
                amount into your total investment and the estimated returns, giving you a clear picture of your 
                wealth creation journey.
              </p>
              
              <h3 className="font-headline text-xl font-bold">Key Terms:</h3>
              <ul>
                <li><strong>Monthly Investment:</strong> The fixed amount you plan to invest every month.</li>
                <li><strong>Expected Annual Return Rate:</strong> The average annual return you expect from your mutual fund investment. This is an estimate and not a guarantee.</li>
                <li><strong>Time Period:</strong> The total duration in years for which you plan to stay invested.</li>
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
