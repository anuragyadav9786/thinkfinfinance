import Link from "next/link";
import { PiggyBank, LineChart, GraduationCap, Receipt, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const calculators = [
  {
    icon: PiggyBank,
    title: "Retirement Calculator",
    description: "Find out how much you need to save each month to retire comfortably.",
    href: "/tools/retirement-calculator",
  },
  {
    icon: LineChart,
    title: "SIP Calculator",
    description: "Estimate the future value of your monthly SIP investments.",
    href: "/tools/sip-calculator",
  },
  {
    icon: GraduationCap,
    title: "Child Education Planner",
    description: "Plan ahead for your child's education costs, adjusted for inflation.",
    href: "/tools/child-education-planner",
  },
  {
    icon: Receipt,
    title: "Income Tax Calculator",
    description: "Compare the old and new tax regimes to see which saves you more.",
    href: "/tools/tax-calculator",
  },
];

export default function Calculators() {
  return (
    <section id="calculators" className="w-full py-20 md:py-24 lg:py-32 bg-card">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Free Tools</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            Plan With Our Free Calculators
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            No sign-up required. Run your own numbers in seconds and see exactly where you stand.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {calculators.map((calculator) => (
            <Link key={calculator.href} href={calculator.href} className="group block h-full">
              <Card className="flex h-full flex-col items-center p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                <CardHeader className="flex items-center justify-center p-0 mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <calculator.icon className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col p-0">
                  <h3 className="font-headline text-lg font-semibold mb-2">{calculator.title}</h3>
                  <p className="flex-1 text-sm text-muted-foreground">{calculator.description}</p>
                  <span className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-medium text-primary">
                    Calculate
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
