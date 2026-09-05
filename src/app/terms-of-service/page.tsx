/* eslint-disable react/no-unescaped-entities */
"use client";

import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import { Separator } from "@/components/ui/separator";
import ScrollToTopButton from "@/components/common/scroll-to-top-button";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <Separator className="mb-8" />
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the ThinkFin website (the "Service") operated by ThinkFin Finserve Pvt Ltd ("us", "we", or "our").
            </p>

            <h2 className="font-headline text-2xl font-bold">1. Agreement to Terms</h2>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2 className="font-headline text-2xl font-bold">2. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of ThinkFin Finserve Pvt Ltd and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
            </p>

            <h2 className="font-headline text-2xl font-bold">3. Financial Tools and Calculators</h2>
            <p>
              The financial calculators and tools provided on our website are for informational and illustrative purposes only. They are not intended to provide financial advice. The results are based on the inputs you provide and certain assumptions. ThinkFin is not responsible for any decisions made based on the use of these tools. We strongly recommend consulting with a qualified financial advisor before making any financial decisions.
            </p>

            <h2 className="font-headline text-2xl font-bold">4. Links To Other Web Sites</h2>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by ThinkFin Finserve Pvt Ltd. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
            </p>

            <h2 className="font-headline text-2xl font-bold">5. Limitation Of Liability</h2>
            <p>
              In no event shall ThinkFin Finserve Pvt Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2 className="font-headline text-2xl font-bold">6. Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
            </p>

            <h2 className="font-headline text-2xl font-bold">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="font-headline text-2xl font-bold">8. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="font-headline text-2xl font-bold">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at info@thinkfinfinance.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
