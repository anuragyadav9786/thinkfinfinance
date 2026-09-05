"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/components/common/logo";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer id="contact" className="w-full bg-card border-t">
      <div className="container max-w-7xl px-4 py-16 md:px-6 lg:py-20 mx-auto">
        <div className="max-w-xl space-y-6">
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
                <p>Altf Coworking, A-100, Sector 58,<br />Noida 201301</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <p>+91 7503080522</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <p>info@thinkfinfinance.com</p>
            </div>
          </div>
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
