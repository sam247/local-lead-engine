import { ShieldCheck, Camera, Clock, Building2 } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "RICS-Linked Survey Partners" },
  { icon: Camera, label: "Land & Drone Surveying" },
  { icon: Clock, label: "Planning & Development Surveys" },
  { icon: Building2, label: "Fixed-Price Quotes" },
];

const TrustBadgeStrip = () => {
  return (
    <section className="border-b border-border bg-secondary py-4">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2">
              <badge.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-semibold text-foreground sm:text-sm">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgeStrip;
