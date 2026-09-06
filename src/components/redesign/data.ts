export const goalVisuals: Record<string, { gradient: string; tagline: string }> = {
  retirement: {
    gradient: "linear-gradient(160deg, #081B33 0%, #123262 55%, #1D5EFF 130%)",
    tagline: "Retire on your own terms, not on what's left over.",
  },
  education: {
    gradient: "linear-gradient(160deg, #081B33 0%, #1B3F73 55%, #4A7DFF 130%)",
    tagline: "Give tuition day the answer it deserves.",
  },
  wealth: {
    gradient: "linear-gradient(160deg, #081B33 0%, #0F2A54 45%, #1D5EFF 120%)",
    tagline: "Build wealth with conviction, not guesswork.",
  },
  house: {
    gradient: "linear-gradient(160deg, #081B33 0%, #16386B 55%, #4A7DFF 130%)",
    tagline: "Walk into your own home, down payment ready.",
  },
  emergency: {
    gradient: "linear-gradient(160deg, #081B33 0%, #0D2A4F 55%, #1D5EFF 130%)",
    tagline: "A buffer that lets you sleep through the storm.",
  },
};

export const trustStats = [
  { value: 20, prefix: "₹", suffix: " Cr+", label: "Investments Facilitated" },
  { value: 400, prefix: "", suffix: "+", label: "Investors" },
  { value: 0, prefix: "", suffix: "", label: "Certified Financial Professionals", isText: true, textValue: "AMFI & IRDAI Certified" },
  { value: 0, prefix: "", suffix: "", label: "Our Approach", isText: true, textValue: "Goal-Based Investing" },
];

export const processSteps = [
  {
    number: "01",
    title: "Choose Your Goal",
    description: "Tell us what you are investing for — retirement, a home, your child's education, or something entirely your own.",
  },
  {
    number: "02",
    title: "Share Your Details",
    description: "Help us understand your income, timeline, and what you're already working with.",
  },
  {
    number: "03",
    title: "Discover Your Approach",
    description: "We analyse your inputs and risk preferences to shape a structured investment approach.",
  },
  {
    number: "04",
    title: "Start Your Journey",
    description: "Connect with ThinkFin and begin investing with a plan built around you.",
  },
];

export const productShowcaseSteps = [
  {
    title: "Selecting an investment goal",
    description: "Start by choosing exactly what you're investing for — the same five goals you've already explored.",
  },
  {
    title: "Choosing an investment horizon",
    description: "Tell us when you'll need this money. Your horizon shapes how much risk makes sense.",
  },
  {
    title: "Understanding investor preferences",
    description: "A short set of questions gets a clear read on your risk appetite — no jargon, no guesswork.",
  },
  {
    title: "Beginning the investment journey",
    description: "Your structured approach is ready. From here, you start investing with a plan behind every rupee.",
  },
];

export const ecosystemPillars = [
  {
    key: "invest",
    title: "INVEST",
    tagline: "Build long-term wealth.",
    detail: "Goal-based mutual fund portfolios structured around your timeline and risk profile.",
  },
  {
    key: "protect",
    title: "PROTECT",
    tagline: "Protect what matters.",
    detail: "Life, health, and asset cover sized to your actual needs — not oversold, not underinsured.",
  },
  {
    key: "plan",
    title: "PLAN",
    tagline: "Make better financial decisions.",
    detail: "Tax strategy and financial planning that turns scattered decisions into one coherent approach.",
  },
];

export const testimonials = [
  {
    name: "Devender Singh",
    role: "Retired Army JCO",
    initials: "DS",
    quote:
      "After retiring from the Army, I was worried about managing my pension benefits. ThinkFin provided a clear roadmap to invest my hard-earned money safely while ensuring long-term growth.",
  },
  {
    name: "Ankit Kumar",
    role: "Backend Developer",
    initials: "AK",
    quote:
      "My portfolio was scattered and inefficient. The team at ThinkFin helped me reshuffle my investments into the right assets based on my goals.",
  },
  {
    name: "Saroj Prasad",
    role: "Software Engineer",
    initials: "SP",
    quote:
      "I was overwhelmed by the number of investment options. ThinkFin's personalized recommendations helped me build a diversified portfolio that aligns with my risk tolerance.",
  },
];

// Reuses the real, already-published insight from each goal's detail page
// rather than inventing blog content that doesn't exist on the site.
export const insights = [
  {
    category: "Retirement",
    title: "The 10-Year Head Start Beats a Bigger Paycheck",
    description: "Why starting a decade earlier can matter more than earning more, once compounding takes over.",
    href: "/goals/retirement",
  },
  {
    category: "Education",
    title: "You're Inflating the Wrong Number",
    description: "Education costs rise faster than general inflation — most families plan around half the real cost.",
    href: "/goals/education",
  },
  {
    category: "Home Buying",
    title: "Your Down Payment Matters More Than Your EMI",
    description: "A bigger down payment can save more in interest than any rate negotiation ever will.",
    href: "/goals/house",
  },
];

export const faqs = [
  {
    question: "How do I get started?",
    answer:
      "Choose a goal on this page, or click \"Start Investing.\" You'll be taken to our advisor platform, where a short set of questions builds your investment profile.",
  },
  {
    question: "Is there a minimum investment amount?",
    answer:
      "There's no fixed minimum to get started. Many investors begin a SIP with as little as ₹500 a month, depending on the fund and approach that fits their goal.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "Just the basics — your goal, timeline, approximate income or investable amount, and a few questions about your comfort with risk. No lengthy paperwork upfront.",
  },
  {
    question: "What happens after I submit my details?",
    answer:
      "Your inputs shape a structured investment approach. From there, our team reviews it with you before anything is finalised — nothing is auto-invested without your confirmation.",
  },
  {
    question: "Can I invest for multiple goals?",
    answer:
      "Yes. Most investors we work with are planning for more than one goal at a time — retirement and a child's education, for instance — each with its own approach and timeline.",
  },
  {
    question: "How does ThinkFin understand my requirements?",
    answer:
      "Through the goal, horizon, and risk questions you answer on the advisor platform, combined with a conversation with our team to make sure the approach actually fits your life.",
  },
];
