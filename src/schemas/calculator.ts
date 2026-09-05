import * as z from "zod";

export const sipFormSchema = z.object({
  monthlyInvestment: z.coerce.number().min(500, "Investment must be at least 500"),
  expectedReturnRate: z.coerce.number().min(1, "Return rate must be at least 1%").max(30, "Return rate cannot exceed 30%"),
  timePeriod: z.coerce.number().min(1, "Time period must be at least 1 year").max(50, "Time period cannot exceed 50 years"),
});

export const lumpsumFormSchema = z.object({
  monthlyInvestment: z.coerce.number().min(1000, "Lumpsum investment must be at least 1000"),
  expectedReturnRate: z.coerce.number().min(1, "Return rate must be at least 1%").max(30, "Return rate cannot exceed 30%"),
  timePeriod: z.coerce.number().min(1, "Time period must be at least 1 year").max(50, "Time period cannot exceed 50 years"),
});

export type SipFormValues = z.infer<typeof sipFormSchema>;
export type LumpsumFormValues = z.infer<typeof lumpsumFormSchema>;
