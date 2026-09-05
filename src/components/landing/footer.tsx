"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, addDays, startOfToday } from "date-fns";

import { submitForm } from "@/app/actions/submit-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/logo";


const istTimeSlots = [
  "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  date: z.date({ required_error: "Please select a date." }),
  timeSlot1: z.string({ required_error: "Please select a time slot." }),
  timeSlot2: z.string({ required_error: "Please select a second time slot." }),
}).refine((data) => data.timeSlot1 !== data.timeSlot2, {
  message: "Time slots must be different.",
  path: ["timeSlot2"],
});

interface FooterProps {
  contactMessage: string;
  setContactMessage: (message: string) => void;
}

export default function Footer({ contactMessage, setContactMessage }: FooterProps) {
  const { toast } = useToast();
  const [year, setYear] = useState<number | null>(null);
  const [timeZone, setTimeZone] = useState<string | null>(null);
  const [convertedTimeSlots, setConvertedTimeSlots] = useState<{ value: string, label: string }[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    setYear(new Date().getFullYear());
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(userTimeZone);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    if (contactMessage) {
      form.setValue("message", contactMessage);
    }
  }, [contactMessage, form]);

  const selectedDate = form.watch("date");
  const timeSlot1Value = form.watch("timeSlot1");

  useEffect(() => {
    if (selectedDate && timeZone) {
      const localFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timeZone,
      });
  
      const labelFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const newSlots = istTimeSlots.map(slot => {
        const [hours, minutes] = slot.split(":").map(Number);
        
        const dateInUtc = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate()));
        
        const istFormatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata",
        });

        const istDateString = istFormatter.format(dateInUtc);
        
        const [datePart] = istDateString.split(",");
        const istDateTimeString = `${datePart}, ${hours}:${minutes}:00`;

        const dateInIST = new Date(istDateTimeString + " GMT+0530");
        
        return {
          value: localFormatter.format(dateInIST),
          label: labelFormatter.format(dateInIST)
        };
      });
      setConvertedTimeSlots(newSlots);
      form.resetField("timeSlot1");
      form.resetField("timeSlot2");
    }
  }, [selectedDate, timeZone, form]);


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await submitForm(data);

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you shortly.",
        });
        form.reset();
        setContactMessage("");
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.message,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
       toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  const today = startOfToday();
  const nextWeek = addDays(today, 7);

  return (
    <footer id="contact" className="w-full bg-card border-t">
      <div className="container max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 px-4 py-16 md:px-6 lg:py-24 mx-auto">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-headline text-2xl font-bold">ThinkFin</span>
          </Link>
          <div className="text-muted-foreground space-y-1">
             <p className="font-semibold">ARN-309973</p>
             <p>Amfi Registered Mutual Fund Distributor</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-semibold">Registered Office:</p>
                <p>Rz 26, Ground Floor, Lane no. 3, Kailashpuri Extn. Dwarka Sec 1A,<br />New Delhi (110045)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <p>
                +91 7290010081
                <br />
                +91 7290010082
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <p>info@thinkfinfinance.com</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-headline text-2xl font-semibold">Get in Touch</h3>
          <p className="text-muted-foreground">
            Have questions or ready to start your financial journey? Send us a message.
          </p>
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
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                        <Input type="text" placeholder="+91" className="w-16" defaultValue="+91" disabled={isSubmitting} />
                        <FormControl>
                            <Input type="tel" placeholder="Your Phone Number" {...field} disabled={isSubmitting} />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={isSubmitting}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsCalendarOpen(false);
                            }}
                            disabled={(date) =>
                              date < today || date > nextWeek || isSubmitting
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="timeSlot1"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value || ""} disabled={!selectedDate || isSubmitting}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Preferred Time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {convertedTimeSlots.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeSlot2"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value || ""} disabled={!selectedDate || isSubmitting}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Alternate Time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {convertedTimeSlots.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value} disabled={slot.value === timeSlot1Value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Your Message" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Book a free consultation"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="border-t">
        <div className="container max-w-7xl flex items-center justify-between h-16 px-4 md:px-6 text-sm text-muted-foreground mx-auto">
          {year && <p>&copy; {year} ThinkFin. All rights reserved.</p>}
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
