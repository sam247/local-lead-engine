import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { aboutTeam } from "@/lib/images";

const AboutPreview = () => {
  const highlights = [
    "24/7 emergency response across London",
    "Free CCTV surveys and no-obligation quotes",
    "Fully insured with insurance-backed guarantees",
    "Residential and commercial drainage experts",
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img
                src={aboutTeam}
                alt="Mainline Drains team at work"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-lg bg-primary p-6 text-primary-foreground md:block">
              <div className="font-display text-3xl font-bold">15K+</div>
              <div className="text-sm text-primary-foreground/80">Drains Repaired</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
              About Us
            </span>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              London's Trusted Drainage Experts
            </h2>
            <p className="mb-6 text-muted-foreground">
              Mainline Drains provides expert drain collapse repair, relining, CCTV surveys and emergency drainage services across London. Our team of experienced drainage engineers delivers fast, reliable solutions for residential and commercial properties — day or night.
            </p>
            <ul className="mb-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild>
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
