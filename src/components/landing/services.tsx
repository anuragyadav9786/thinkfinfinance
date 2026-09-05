"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle as CardTitlePrimitive } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Landmark, ShieldCheck, Calculator, Umbrella } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Financial Planning",
    description: "Comprehensive strategies to help you achieve your short and long-term financial goals.",
    detailedDescription: "Our financial planning service provides a holistic view of your financial situation. We work with you to create a personalized roadmap covering budgeting, saving, debt management, and goal setting. Whether you're saving for a house, your children's education, or a big life event, our plan will provide the clarity and direction you need."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: "Investment Management",
    description: "Personalized investment portfolios designed to grow your wealth and manage risk.",
    detailedDescription: "We build and manage diversified investment portfolios tailored to your risk tolerance and financial objectives. Our team actively monitors market trends and adjusts your portfolio to capitalize on opportunities while mitigating risks, ensuring your investments are always working towards your long-term growth."
  },
  {
    icon: <Landmark className="h-10 w-10 text-primary" />,
    title: "Retirement Planning",
    description: "Secure your future with our expert retirement planning and income strategies.",
    detailedDescription: "Retirement planning is more than just saving money. We help you create a sustainable income stream for your retirement years. Our strategies include 401(k) and IRA management, pension analysis, and Social Security optimization to ensure you can enjoy a comfortable and worry-free retirement."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Estate Planning",
    description: "Protect your legacy and ensure your assets are distributed according to your wishes.",
    detailedDescription: "Our estate planning specialists guide you through creating wills, trusts, and powers of attorney. We help you minimize estate taxes and ensure a smooth transfer of assets to your beneficiaries, providing peace of mind that your legacy is protected and your final wishes are honored."
  },
  {
    icon: <Calculator className="h-10 w-10 text-primary" />,
    title: "Tax Strategy",
    description: "Optimize your tax position with proactive planning and expert advice from our specialists.",
    detailedDescription: "Taxes can significantly impact your financial health. Our team provides proactive tax planning to identify opportunities for deductions and credits, helping you minimize your tax liability. We stay up-to-date with the latest tax laws to ensure you are always in the most advantageous position."
  },
  {
    icon: <Umbrella className="h-10 w-10 text-primary" />,
    title: "Insurance Advisory",
    description: "Find the right insurance coverage to protect you, your family, and your assets.",
    detailedDescription: "Life is unpredictable, but your financial security doesn't have to be. We assess your insurance needs, including life, disability, and long-term care coverage. Our goal is to find the most suitable and cost-effective policies to protect you and your loved ones from unforeseen events."
  },
];

type Service = typeof services[0];

interface ServicesProps {
  onLetsTalk: (serviceTitle: string) => void;
}

export default function Services({ onLetsTalk }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });

  const handleLetsTalk = () => {
    if (selectedService) {
      onLetsTalk(selectedService.title);
      setSelectedService(null);
    }
  };

  const handleOpenDialog = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseDialog = () => {
    setSelectedService(null);
  };

  return (
    <section id="services" ref={ref} className="w-full py-20 md:py-24 lg:py-32">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div
          className={cn("flex flex-col items-center justify-center space-y-4 text-center mb-12 animated-component")}
          data-in-view={isIntersecting}
        >
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Services</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            Financial Guidance Tailored for You
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We offer a wide range of services to meet your unique financial needs. Our team is dedicated to providing you with the expert advice and support you need to succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Card
              key={service.title}
              className={cn(
                "flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer animated-component"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
              data-in-view={isIntersecting}
              onClick={() => handleOpenDialog(service)}
            >
              <CardHeader className="flex items-center justify-center p-0 mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  {service.icon}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitlePrimitive className="font-headline text-xl font-semibold mb-2">{service.title}</CardTitlePrimitive>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedService} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">{selectedService.title}</DialogTitle>
                <DialogDescription className="text-left pt-2">
                  {selectedService.detailedDescription}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start pt-4">
                <Button type="button" onClick={handleLetsTalk}>
                  {"Let's talk"}
                </Button>
                <Button type="button" variant="secondary" onClick={handleCloseDialog}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
