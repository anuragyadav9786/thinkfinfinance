"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/components/redesign/data";

export default function RedesignFaq() {
  return (
    <section id="faq" className="w-full bg-white py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-3xl px-[5vw]">
        <h2 className="text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[#081B33]">
          Questions, answered.
        </h2>

        <Accordion type="single" collapsible className="mt-14 w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`} className="border-[#E6EAF0] py-2">
              <AccordionTrigger className="text-left text-[16px] font-semibold text-[#081B33] hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-[#667085]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
