import Link from "next/link";
import {
  ArrowRight,
  HardHat,
  Home,
  Building2,
  Triangle,
  Cloud,
  Layers,
  Package,
  Zap,
  Flame,
} from "lucide-react";
import { services } from "@/lib/data";
import { getServiceUrl } from "engine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HardHat,
  Home,
  Building2,
  Triangle,
  Cloud,
  Layers,
  Package,
  Zap,
  Flame,
};

const prioritySlugs = [
  "scaffolding-contractors",
  "domestic-scaffolding",
  "commercial-scaffolding",
  "roof-scaffolding",
  "chimney-scaffolding",
  "emergency-scaffolding",
];

const serviceBenefits: Record<string, string[]> = {
  "scaffolding-contractors": ["NASC-accredited and fully insured", "Design and erect capability", "TG20 compliance on every structure"],
  "domestic-scaffolding": ["Quick erection — typically 1–2 days", "All house types covered", "Full inspection certification"],
  "commercial-scaffolding": ["Bespoke designs for complex facades", "Documented inspection regime", "Programme-led delivery"],
  "roof-scaffolding": ["Full edge protection to current standards", "Pitched, flat and complex profiles", "Temporary roofing available"],
  "chimney-scaffolding": ["Specialist chimney scaffold designs", "All chimney types covered", "Roof loading calculations provided"],
  "emergency-scaffolding": ["24/7 callout — including weekends", "Rapid mobilisation within hours", "Works with insurers and loss adjusters"],
};

const ServicesGrid = () => {
  const priorityServices = services.filter((s) => prioritySlugs.includes(s.slug));
  const otherServices = services.filter((s) => !prioritySlugs.includes(s.slug));

  return (
    <section className="section-padding bg-secondary">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            What We Do
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            Our Scaffolding Services
          </h2>
          <p className="text-muted-foreground">
            NASC-accredited scaffolding for domestic, commercial and specialist projects. All structures designed, erected and certified to TG20.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {priorityServices.map((service, index) => {
            const Icon = iconMap[service.icon] || HardHat;
            const benefits = serviceBenefits[service.slug] || service.benefits?.slice(0, 3) || [];
            return (
              <Card
                key={service.id}
                className="group border-border bg-card transition-all hover:border-primary hover:shadow-lg animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-display text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  {benefits.length > 0 && (
                    <ul className="mb-4 space-y-1.5">
                      {benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={getServiceUrl(service.slug)}
                    className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:underline"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {otherServices.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {otherServices.map((service) => (
              <Link
                key={service.id}
                href={getServiceUrl(service.slug)}
                className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {(() => {
                    const Icon = iconMap[service.icon] || HardHat;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
                <div>
                  <div className="font-display text-sm font-semibold group-hover:text-primary">{service.title}</div>
                  <div className="text-xs text-muted-foreground">{service.shortDescription.slice(0, 50)}…</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:underline"
          >
            View All Services
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
