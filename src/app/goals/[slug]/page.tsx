import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarClock } from "lucide-react";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import ScrollToTopButton from "@/components/common/scroll-to-top-button";
import GoalChart from "@/components/landing/goal-chart";
import Sparkline from "@/components/landing/sparkline";
import TrackGoalView from "@/components/landing/track-goal-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { goalPortfolios } from "@/components/landing/goal-portfolios";
import { goalDetails } from "@/components/landing/goal-details";
import { constants } from "@/components/common/constants";

const ALLOCATION_COLORS = ["bg-primary", "bg-[hsl(var(--chart-4))]", "bg-muted-foreground/40"];

export function generateStaticParams() {
  return goalPortfolios.map((goal) => ({ slug: goal.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const goal = goalPortfolios.find((g) => g.id === slug);
  if (!goal) return {};
  return {
    title: `${goal.name} Plan | ThinkFin`,
    description: goal.blurb,
  };
}

export default async function GoalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const goal = goalPortfolios.find((g) => g.id === slug);
  const detail = goalDetails[slug];

  if (!goal || !detail) {
    notFound();
  }

  const Icon = goal.icon;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <TrackGoalView slug={goal.id} />
      <Header />
      <main className="flex-1">
        <section className="w-full border-b bg-card py-12 md:py-16">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </div>
              <div>
                <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">{goal.name} Plan</h1>
                <p className="text-sm text-muted-foreground">
                  {goal.target} · {goal.horizon}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-muted-foreground">{goal.blurb}</p>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto space-y-10">
            <div>
              <h2 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">{detail.insightTitle}</h2>
              <p className="mt-3 text-muted-foreground">{detail.insightBody}</p>
              <Card className="mt-4 border-primary/30 bg-primary/5 p-4 text-sm">
                <span className="font-semibold text-foreground">Example: </span>
                <span className="text-muted-foreground">{detail.example}</span>
              </Card>
            </div>

            <Card className="p-4 md:p-6">
              <div className="h-72 w-full md:h-80">
                <GoalChart chart={detail.chart} />
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">{detail.chartCaption}</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-headline text-lg font-semibold">Sample {goal.name} Portfolio</h3>
              <div className="mt-4 space-y-2">
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  {goal.allocation.map((slice, i) => (
                    <div
                      key={slice.label}
                      className={ALLOCATION_COLORS[i % ALLOCATION_COLORS.length]}
                      style={{ width: `${slice.pct}%` }}
                      title={`${slice.label} ${slice.pct}%`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {goal.allocation.map((slice) => (
                    <span key={slice.label}>
                      {slice.label} {slice.pct}%
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                  Sample Top Pick
                </span>
                <p className="text-sm font-semibold text-foreground">{goal.topFund}</p>
                <Sparkline data={goal.growth} className="mt-2 h-10 w-full text-primary" />
                <p className="mt-1 text-xs text-muted-foreground/70">Illustrative growth only, not a guarantee.</p>
              </div>
            </Card>

            {detail.calculatorLink && (
              <p className="text-center text-sm text-muted-foreground">
                Want to run your own numbers?{" "}
                <Link href={detail.calculatorLink.href} className="font-medium text-primary hover:underline">
                  {detail.calculatorLink.label}
                </Link>
              </p>
            )}

            <Card className="flex flex-col items-center gap-4 p-8 text-center">
              <h3 className="font-headline text-xl font-semibold">Ready to start your {goal.name} plan?</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Get a personalised recommendation, or talk to us first if you'd rather ask questions before committing.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={constants.advisorAppLink}>
                    {goal.cta}
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/#schedule">
                    <CalendarClock />
                    Book a Free Call
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
