"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Phone, Ban, Wind, Droplets, TrendingDown, Search } from "lucide-react";
import { heroBg } from "@/lib/images";
import { companyInfo } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "engine";
import { cn } from "@/lib/utils";

const issueOptions = [
  { id: "blocked-drain", label: "Blocked Drain", icon: Ban },
  { id: "bad-smells", label: "Bad Smells", icon: Wind },
  { id: "slow-drainage", label: "Slow Drainage", icon: Droplets },
  { id: "ground-sinking", label: "Ground Sinking", icon: TrendingDown },
  { id: "unsure", label: "Need Inspection", icon: Search },
];

const Hero = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", postcode: "", issueType: "", urgency: "", details: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = () => {
    if (!formData.name || !formData.postcode) {
      toast({ title: "Please fill in your name and postcode", variant: "destructive" });
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      toast({ title: "Please enter your phone number", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast({ title: "Enquiry Received!", description: "We'll call you back within 30 minutes." });
      setFormData({ name: "", phone: "", email: "", postcode: "", issueType: "", urgency: "", details: "" });
      setStep(1);
      setSubmitting(false);
    }, 500);
  };

  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24 lg:py-28">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Professional drainage engineers at work" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Copy & CTAs */}
          <div className="animate-fade-in">
            <h1 className="mb-5 font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
              Expert Drain Repair &amp; Drainage Solutions Across the UK
            </h1>
            <p className="mb-8 text-base text-primary-foreground/80 md:text-lg">
              24/7 emergency drainage services including drain collapse repair, CCTV drain surveys and pipe relining for residential and commercial properties.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button variant="highlight" size="lg" asChild>
                <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="gap-2" onClick={() => trackEvent("call_button_click")}>
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary-foreground/30 text-primary hover:bg-primary-foreground/10">
                <Link href="/contact">
                  Request Inspection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right — Two-Step Enquiry Form */}
          <div className="animate-fade-in opacity-0 [animation-delay:150ms]">
            <div className="rounded-xl border border-primary-foreground/10 bg-background p-6 shadow-2xl md:p-8">
              <h2 className="mb-1 font-display text-xl font-bold text-foreground">Get a Free Quote</h2>
              <p className="mb-5 text-sm text-muted-foreground">
                {step === 1 ? "Tell us about your issue." : "We'll call you back within 30 minutes."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {step === 1 ? (
                  <>
                    <Input
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    />
                    <Input
                      placeholder="Postcode *"
                      value={formData.postcode}
                      onChange={(e) => setFormData((p) => ({ ...p, postcode: e.target.value }))}
                    />

                    {/* Symptom Selector Cards */}
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">What issue are you experiencing?</p>
                      <div className="grid grid-cols-2 gap-2">
                        {issueOptions.map((option, i) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, issueType: option.id }))}
                            className={cn(
                              "flex items-center gap-2 rounded-md border p-2.5 text-left text-xs font-medium transition-colors",
                              formData.issueType === option.id
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/50",
                              i === issueOptions.length - 1 && issueOptions.length % 2 !== 0 && "col-span-2"
                            )}
                          >
                            <option.icon className="h-4 w-4 shrink-0" />
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button type="button" size="lg" variant="highlight" className="w-full text-base" onClick={handleContinue}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    />

                    <Select value={formData.urgency} onValueChange={(v) => setFormData((p) => ({ ...p, urgency: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Urgency Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine — within a week</SelectItem>
                        <SelectItem value="urgent">Urgent — within 24 hours</SelectItem>
                        <SelectItem value="emergency">Emergency — need help now</SelectItem>
                      </SelectContent>
                    </Select>

                    <Textarea
                      placeholder="Additional details (optional)"
                      value={formData.details}
                      onChange={(e) => setFormData((p) => ({ ...p, details: e.target.value }))}
                      className="min-h-[60px]"
                    />

                    <Button type="submit" size="lg" variant="highlight" className="w-full text-base" disabled={submitting}>
                      {submitting ? "Submitting…" : "Request a Callback"}
                      {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex w-full items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      Back
                    </button>
                  </>
                )}
              </form>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                No obligation · No call-out charge · Free CCTV quote
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
