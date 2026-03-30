import Link from "next/link";
import { hubPages, getCategoryPages } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, MapPin, HelpCircle, PoundSterling } from "lucide-react";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTABanner from "@/components/sections/CTABanner";

const specialPages = [
  { title: "Groundworks FAQ", description: "Answers to the most common questions about foundations, piling, excavation, site clearance and project costs.", href: "/faq", icon: HelpCircle },
  { title: "Groundworks Cost Guide", description: "Understand typical costs for foundations, piling, excavation and other groundworks services across the UK.", href: "/companies-cost", icon: PoundSterling },
  { title: "Homeowner Groundworks Guide", description: "Everything homeowners need to know about groundworks for extensions, new builds and renovation projects.", href: "/homeowners", icon: BookOpen },
];

const nearMePages = [
  { title: "Groundworks Contractors Near Me", href: "/groundworks-contractors-near-me" },
  { title: "Coverage by Region", href: "/service-areas" },
];

export default function GuidesIndexContent() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Guides", url: "/guides" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Groundworks Guides & Resources</h1>
            <p className="text-lg text-primary-foreground/80">Expert advice on foundations, piling, excavation, ground conditions and project costs. Everything you need to plan your groundworks project.</p>
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
