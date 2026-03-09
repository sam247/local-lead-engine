import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Testimonials
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground">
            Don't just take our word for it – hear from some of our satisfied clients.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.author}
              className="border-border bg-card animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/20" />
                <p className="mb-6 text-foreground">{testimonial.quote}</p>
                <div>
                  <div className="font-display font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
