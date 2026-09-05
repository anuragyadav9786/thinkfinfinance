import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalculatorType, Result, CurrencyInfo, FormValues } from "@/types/calculator";
import { sipFormSchema, lumpsumFormSchema } from "@/schemas/calculator";
import { calculateMonthlySIP, calculateLumpsumSIP, isValidResult } from "@/utils/calculator";
import { getCurrencyInfo } from "@/utils/currency";

export function useCalculator(type: CalculatorType) {
  const [result, setResult] = useState<Result | null>(null);
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo | null>(null);

  useEffect(() => {
    setCurrencyInfo(getCurrencyInfo());
  }, []);

  const schema = type === "monthly" ? sipFormSchema : lumpsumFormSchema;
  const defaultValues = {
    monthlyInvestment: type === "monthly" ? 5000 : 100000,
    expectedReturnRate: 12,
    timePeriod: 10,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { control, setValue, getValues, watch } = form;

  useEffect(() => {
    const calculate = (data: FormValues) => {
      const parsedData = schema.safeParse(data);
      if (parsedData.success) {
        const calculationResult = type === "monthly" 
          ? calculateMonthlySIP(parsedData.data)
          : calculateLumpsumSIP(parsedData.data);

        if (isValidResult(calculationResult)) {
          setResult(calculationResult);
        } else {
          setResult(null);
        }
      } else {
        setResult(null);
      }
    };

    const subscription = watch((value) => {
      calculate(value as FormValues);
    });
    
    calculate(getValues());

    return () => subscription.unsubscribe();
  }, [watch, getValues, schema, type]);

  return {
    form,
    control,
    setValue,
    result,
    currencyInfo,
  };
}
