import { BadgeCheck, ShieldCheck, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: BadgeCheck,
    value: "ARN-309973",
    label: "AMFI Registered MF Distributor",
  },
  {
    icon: ShieldCheck,
    value: "IRDAI Certified",
    label: "Insurance Advisory",
  },
  {
    icon: Users,
    value: "400+",
    label: "Families Advised",
  },
  {
    icon: TrendingUp,
    value: "₹20 Cr+",
    label: "Investments Facilitated",
  },
];

export default function TrustStrip() {
  return (
    <section className="w-full border-y bg-secondary/30 py-6">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <stat.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
              <p className="font-headline text-xl font-bold sm:text-2xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
