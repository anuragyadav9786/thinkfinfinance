"use client";

import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import { Separator } from "@/components/ui/separator";
import ScrollToTopButton from "@/components/common/scroll-to-top-button";

export default function PrivacyPolicy() {
  // Dummy props for Footer, as it might require them
  // In a real app, you might want a more generic footer or layout
  const handleSetMessage = (message: string) => {
    // In a real app, you might want to handle this differently
    console.log("Set message to:", message);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <Separator className="mb-8" />
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p>
              Welcome to ThinkFin Finserve Pvt Ltd! Your privacy is of utmost importance to us. This policy outlines how we collect, use, protect, and handle your Personally Identifiable Information (PII) in accordance with our website.
            </p>

            <h2 className="font-headline text-2xl font-bold">1. What Personal Information Do We Collect?</h2>
            <p>
              When you visit our website, place an order, register, or interact with our site in any way, we may collect information such as your name, email address, mailing address, phone number, and credit card details.
            </p>

            <h2 className="font-headline text-2xl font-bold">2. When Do We Collect Information?</h2>
            <p>
              We collect information from you when you register, place an order, fill out a form, use our Live Chat feature, or interact with our website.
            </p>

            <h2 className="font-headline text-2xl font-bold">3. How Do We Use Your Information?</h2>
            <p>
              We use the information we collect to personalize your experience, process transactions efficiently, and provide you with relevant updates and offers. Additionally, we may use your information for various purposes such as improving our services, sending important notices, and contacting you for feedback.
            </p>

            <h2 className="font-headline text-2xl font-bold">4. How Do We Protect Your Information?</h2>
            <p>
              Your privacy and security are paramount. We employ industry-standard measures to safeguard your personal information, including encryption technology and restricted access to authorized personnel.
            </p>

            <h2 className="font-headline text-2xl font-bold">5. Do We Use Cookies?</h2>
            <p>
              No, we do not use cookies for tracking purposes.
            </p>

            <h2 className="font-headline text-2xl font-bold">6. Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or transfer your Personally Identifiable Information to outside parties.
            </p>

            <h2 className="font-headline text-2xl font-bold">7. Third-Party Links</h2>
            <p>
              While we may occasionally include third-party products or services on our website, we are not responsible for the content or activities of these linked sites.
            </p>

            <h2 className="font-headline text-2xl font-bold">8. CAN-SPAM Act Compliance</h2>
            <p>
              We comply with the CAN-SPAM Act and strive to provide transparency and choice regarding email communications. You can unsubscribe from our mailing list at any time using the link provided in our emails.
            </p>

            <h2 className="font-headline text-2xl font-bold">9. Contacting Us</h2>
            <p>
              If you have any questions or concerns regarding our privacy policy, please feel free to contact us at the following address:
            </p>
            <address className="not-italic">
              ThinkFin Finserve Pvt. Ltd.<br />
              RZ-439/12B, Flat No. 7, Lane No. 13<br />
              Kailashpuri West, New Delhi 110045, India<br />
              Email: info@thinkfinfinance.com
            </address>
          </div>
        </div>
      </main>
      {/* 
        This is a simplified footer for the privacy page. 
        It needs the props that the original footer component expects.
      */}
      <Footer contactMessage="" setContactMessage={handleSetMessage} />
      <ScrollToTopButton />
    </div>
  );
}
