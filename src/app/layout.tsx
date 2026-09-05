/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TopLoader from "@/components/common/top-loader";
import LeadCaptureModal from "@/components/landing/lead-capture-modal";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ThinkFin",
  description: "Your Path to Financial Freedom Starts Here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"  />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        {children}
        <Toaster />
        <LeadCaptureModal />
        <WhatsAppButton />
      </body>
    </html>
  );
}
