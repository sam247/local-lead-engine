import Link from "next/link";
import { hubPages, getCategoryPages } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, MapPin, HelpCircle } from "lucide-react";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTABanner from "@/components/sections/CTABanner";

const specialPages = [
  { title: "Collapsed Drains Complete Guide", description: "Our comprehensive authority guide covering signs, causes, inspection, repair methods, costs and insurance for collapsed drains.", href: "/collapsed-drains-complete-guide", icon: BookOpen },
  { title: "Do I Need a Drain Survey?", description: "Not sure if you need a professional survey? Use our decision helper to find out based on your symptoms.", href: "/do-i-need-a-drain-survey", icon: HelpCircle },
  { title: "Drainage FAQ", description: "Answers to the most common questions about drain problems, repairs, costs and insurance.", href: "/drainage-faq", icon: HelpCircle },
];

const nearMePages = [
  { title: "Drain Collapse Near Me", href: "/drain-collapse-near-me" },
  { title: "Drain Survey Near Me", href: "/drain-survey-near-me" },
  { title: "Emergency Drain Engineer Near Me", href: "/emergency-drain-engineer-near-me" },
  { title: "Drain Unblocking Near Me", href: "/drain-unblocking-near-me" },
  { title: "Collapsed Drain Repair Near Me", href: "/collapsed-drain-repair-near-me" },
];

export default function GuidesIndexContent() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Drainage Guides", url: "/drainage-guides" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Drainage Guides & Resources</h1>
            <p className="text-lg text-primary-foreground/80">Expert advice on drain problems, repair methods, costs and insurance. Everything you need to understand your drainage issue.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <h2 className="mb-8 font-display text-2xl font-bold">Featured Guides</h2>
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {specialPages.map((page) => (
              <Link key={page.href} href={page.href} className="group">
                <Card className="h-full border-border transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <page.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="font-display text-lg group-hover:text-primary">{page.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <h2 className="mb-8 font-display text-2xl font-bold">Topic Hubs</h2>
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hubPages.map((hub) => {
              const pages = getCategoryPages(hub.category);
              return (
                <Card key={hub.category} className="group border-border transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-display text-lg">{hub.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-sm text-muted-foreground">{hub.subtitle}</p>
                    <div className="mb-3 text-xs text-muted-foreground">{pages.length} articles</div>
                    <Link href={hub.basePath} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                      Explore Hub <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <h2 className="mb-6 font-display text-2xl font-bold">Find Local Services</h2>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {nearMePages.map((page) => (
              <Link key={page.href} href={page.href} className="flex items-center gap-3 rounded-lg border border-border p-4 transition-all hover:shadow-md">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium">{page.title}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
