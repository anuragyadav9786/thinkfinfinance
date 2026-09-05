"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useLeadCaptureTrigger } from "@/hooks/use-lead-capture-trigger";
import { captureLead } from "@/app/actions/capture-lead";
import { goalPortfolios } from "@/components/landing/goal-portfolios";
import { constants } from "@/components/common/constants";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function LeadCaptureModal() {
  const { isOpen, close } = useLeadCaptureTrigger();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Snapshotted once when the modal opens, not read fresh on every render —
  // the hero carousel keeps auto-advancing in the background, so reading
  // sessionStorage live could silently change which goal gets submitted
  // partway through the user filling out the form.
  const [goalIdAtOpen, setGoalIdAtOpen] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  useEffect(() => {
    if (isOpen) {
      setGoalIdAtOpen(sessionStorage.getItem("lastGoal"));
    }
  }, [isOpen]);

  const goal = goalPortfolios.find((g) => g.id === goalIdAtOpen);
  const goalLabel = goal ? goal.name : "Investment";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await captureLead({ name: data.name, email: data.email, goal: goal?.id ?? "unspecified", source: "exit-intent-modal" });
    } catch (error) {
      console.error("Lead capture failed:", error);
    }

    setIsSubmitted(true);
    setIsSubmitting(false);

    window.setTimeout(() => {
      const params = new URLSearchParams({ name: data.name, email: data.email });
      if (goal) params.set("goal", goal.id);
      // advisor.thinkfinfinance.com doesn't consume these query params yet,
      // but is expected to add pre-fill support later — safe to send regardless.
      window.location.href = `${constants.advisorAppLink}?${params.toString()}`;
    }, 1200);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {isSubmitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <p className="font-medium">Thanks! Taking you to complete your {goalLabel} plan...</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-xl">Get Your Free {goalLabel} Plan</DialogTitle>
              <DialogDescription className="text-left pt-1">
                Share your details and our advisor will review your goal and send you a personalised recommendation.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Email" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Get My Free Plan"}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
