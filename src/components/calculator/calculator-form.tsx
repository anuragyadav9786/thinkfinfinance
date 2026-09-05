import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FormValues, CurrencyInfo, CalculatorType } from "@/types/calculator";

interface CalculatorFormProps {
  control: Control<FormValues>;
  setValue: (name: keyof FormValues, value: number) => void;
  currencyInfo: CurrencyInfo | null;
  type: CalculatorType;
}

export function CalculatorForm({ control, setValue, currencyInfo, type }: CalculatorFormProps) {
  const isLumpsum = type === "lumpsum";
  const investmentLabel = isLumpsum ? "Lumpsum Investment" : "Monthly Investment";
  const minInvestment = isLumpsum ? 1000 : 500;
  const maxInvestment = isLumpsum ? 1000000 : 100000;
  const stepValue = isLumpsum ? 1000 : 500;

  return (
    <div className="space-y-6">
      <FormField 
        control={control} 
        name="monthlyInvestment" 
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between items-center mb-2">
              <FormLabel>{investmentLabel}</FormLabel>
              <div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">
                {currencyInfo?.symbol} 
                <Input 
                  type="number" 
                  className="inline-block w-24 p-0 border-0 shadow-none focus-visible:ring-0" 
                  {...field} 
                  onChange={e => setValue(field.name, Number(e.target.value))} 
                />
              </div>
            </div>
            <Slider 
              min={minInvestment} 
              max={maxInvestment} 
              step={stepValue} 
              value={[field.value]} 
              onValueChange={(vals) => field.onChange(vals[0])} 
            />
            <FormMessage />
          </FormItem>
        )} 
      />
      
      <FormField 
        control={control} 
        name="expectedReturnRate" 
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between items-center mb-2">
              <FormLabel>Expected Return Rate</FormLabel>
              <div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">
                {field.value}%
              </div>
            </div>
            <Slider 
              min={1} 
              max={30} 
              step={0.1} 
              value={[field.value]} 
              onValueChange={(vals) => field.onChange(vals[0])} 
            />
            <FormMessage />
          </FormItem>
        )} 
      />
      
      <FormField 
        control={control} 
        name="timePeriod" 
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between items-center mb-2">
              <FormLabel>Time Period (Years)</FormLabel>
              <div className="px-4 py-2 rounded-md border border-input font-semibold text-sm">
                {field.value} yrs
              </div>
            </div>
            <Slider 
              min={1} 
              max={50} 
              step={1} 
              value={[field.value]} 
              onValueChange={(vals) => field.onChange(vals[0])} 
            />
            <FormMessage />
          </FormItem>
        )} 
      />
    </div>
  );
}
