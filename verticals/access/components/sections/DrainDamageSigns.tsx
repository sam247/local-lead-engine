import Link from "next/link";
import { ArrowRight, Ban, Wind, Droplets, TrendingDown } from "lucide-react";

const signs = [
  {
    icon: Ban,
    title: "Frequent Blockages",
    description: "Recurring blocked drains often indicate a deeper issue such as a collapsed pipe or root ingress.",
    link: "/drain-symptoms/recurring-blockages",
  },
  {
    icon: Wind,
    title: "Bad Smells from Drains",
    description: "Persistent foul odours can signal cracked or broken pipes leaking waste beneath your property.",
    link: "/drain-symptoms/bad-smells-from-drains",
  },
  {
    icon: Droplets,
    title: "Slow Draining Sinks or Toilets",
    description: "Slow drainage across multiple fixtures often points to a main drain issue needing investigation.",
    link: "/drain-symptoms/slow-draining",
  },
  {
    icon: TrendingDown,
    title: "Ground Sinking in Garden or Driveway",
    description: "Subsidence or dips in the ground can be caused by a collapsed drain washing away soil underneath.",
    link: "/drain-symptoms/sinking-ground-or-patio",
  },
];

const DrainDamageSigns = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Warning Signs
          </span>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Common Signs of Drain Damage
          </h2>
          <p className="text-muted-foreground">
            Spot these symptoms early to avoid costly emergency repairs.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {signs.map((sign) => (
            <Link
              key={sign.title}
              href={sign.link}
              className="group rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary hover:shadow-md"
            >
              <sign.icon className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">{sign.title}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{sign.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
                Learn more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm font-medium text-destructive">
          Drain problems often worsen quickly if ignored. Speak to an engineer today.
        </p>
      </div>
    </section>
  );
};

export default DrainDamageSigns;
