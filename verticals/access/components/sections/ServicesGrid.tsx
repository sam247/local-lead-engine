import Link from "next/link";
import { ArrowRight, Lock, Camera, Video, Shield, Network } from "lucide-react";
import { services } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lock,
  Camera,
  Video,
  Shield,
  Network,
};

const prioritySlugs = ["access-control-systems", "commercial-cctv-installation", "ip-camera-systems", "perimeter-security-systems"];
const homepageFeaturedSlugs = ["security-system-integration"] as const;

const homepageServiceImages: Record<(typeof homepageFeaturedSlugs)[number], string> = {
  "security-system-integration": "/images/projects/project-access-1.jpg",
};

const serviceBenefits: Record<string, string[]> = {
  "access-control-systems": ["Card, fob and biometric entry", "Multi-site centralised management", "Full audit trail and reporting"],
  "commercial-cctv-installation": ["HD and 4K camera systems", "Remote monitoring and playback", "Night vision and analytics"],
  "ip-camera-systems": ["PoE network cameras", "Scalable multi-site coverage", "Cloud and on-premise storage"],
  "perimeter-security-systems": ["Fence detection and thermal imaging", "Integrated CCTV and access alerts", "BS EN compliant installations"],
};

const ServicesGrid = () => {
  const priorityServices = services.filter((s) => prioritySlugs.includes(s.slug));
  const homepageFeaturedServices = services.filter((s) =>
    homepageFeaturedSlugs.includes(s.slug as (typeof homepageFeaturedSlugs)[number])
  );

  return (
    <section className="section-padding bg-secondary">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            What We Do
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            Our Core Security Services
          </h2>
          <p className="text-muted-foreground">
            We deliver access, CCTV and integrated security packages for business-critical sites with compliance and operational uptime requirements.
            Projects include new fit-outs, phased upgrades and multi-system integration for healthcare, education, logistics and commercial estates.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {priorityServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Lock;
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

        {homepageFeaturedServices.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 text-center">
              <h3 className="font-display text-2xl font-bold text-foreground">Integrated Security Solutions</h3>
              <p className="mt-2 text-muted-foreground">
                For multi-system environments and complex compliance requirements, our integration service brings access, CCTV and perimeter security together.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {homepageFeaturedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <img
                      src={homepageServiceImages[service.slug as (typeof homepageFeaturedSlugs)[number]]}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />
                    <div className="absolute bottom-0 p-4">
                      <h4 className="font-display text-xl font-semibold text-white">{service.title}</h4>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-3 text-sm text-muted-foreground">{service.shortDescription}</p>
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

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
