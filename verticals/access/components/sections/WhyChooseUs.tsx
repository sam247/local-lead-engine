import { Siren, Camera, Layers, PoundSterling, ShieldCheck, MapPin } from "lucide-react";
import { whyChooseUs } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Siren,
  Camera,
  Layers,
  PoundSterling,
  ShieldCheck,
  MapPin,
};

const WhyChooseUs = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Why Choose Us
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            The Mainline Access Difference
          </h2>
          <p className="text-muted-foreground">
            What sets us apart from other security and access control providers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon] || Siren;
            return (
              <div
                key={item.title}
                className="flex gap-4 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
