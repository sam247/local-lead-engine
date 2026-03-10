import Link from "next/link";
import { ArrowRight, Map, Building2, Waves, Network, Camera, AlertTriangle } from "lucide-react";
import { services } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map,
  Building2,
  Waves,
  Network,
  SquareDashed: Map,
  ScanLine: Camera,
  Drone: Camera,
  Building: Building2,
  Mountain: Map,
  Construction: Building2,
  AlertTriangle,
};

const prioritySlugs = ["topographical-survey", "drone-survey", "measured-building-survey", "utility-survey"];

const ServicesGrid = () => {
  const priorityServices = services.filter((s) => prioritySlugs.includes(s.slug));

  return (
    <section className="section-padding bg-secondary">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            What We Do
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            Land &amp; Drone Surveying Services
          </h2>
          <p className="text-muted-foreground">
            Topographical, measured building, utility and drone surveys for planning, development and construction.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {priorityServices.map((service, index) => {
            const Icon = iconMap[service.icon] || AlertTriangle;
            const benefits = (service.benefits ?? []).slice(0, 3);
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
                    href={`/services/${service.slug}`}
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

        <div className="mt-12 text-center">
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
