
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const toolLinks = [
  { href: "/tools/retirement-calculator", label: "Retirement Saving Plan" },
  { href: "/tools/sip-calculator", label: "SIP Calculator" },
  { href: "/tools/child-education-planner", label: "Child Education Planner" },
  { href: "/tools/tax-calculator", label: "Income Tax Calculator" },
];

export default function ExploreTools() {
  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Explore More Tools</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ul className="space-y-1 p-2">
          {toolLinks.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className="flex items-center justify-between p-3 rounded-md hover:bg-secondary transition-colors group">
                <span className="font-medium text-sm">{tool.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
