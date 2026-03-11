"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Phone, FileCheck, Home, Map, Camera, Search } from "lucide-react";
import { heroBg } from "@/lib/images";
import { companyInfo } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "engine";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = ["Topographical survey", "Drone survey", "Measured building survey", "Utility survey", "Advice / not sure"] as const;

const issueOptions = [
  { id: "planning", label: "Planning application", icon: FileCheck },
  { id: "extension", label: "Extension design", icon: Home },
  { id: "development", label: "Development feasibility", icon: Map },
  { id: "drone", label: "Drone survey", icon: Camera },
  { id: "unsure", label: "Not sure", icon: Search },
];

const Hero = () => {
  const { toast } = useToast();
  const [utmSource, setUtmSource] = useState<string | undefined>(undefined);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    postcode: "",
    town: "",
    service: "",
    issueType: "",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get("utm_source")?.trim();
      setUtmSource(v || undefined);
    } catch {
      // ignore
    }
  }, []);

  const handleContinue = () => {
    if (!formData.firstName || !formData.lastName || !formData.postcode || !formData.town) {
      toast({ title: "Please fill in your first name, last name, postcode and town", variant: "destructive" });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      toast({ title: "Please enter your phone number", variant: "destructive" });
      return;
    }
    if (!formData.service) {
      toast({ title: "Please select a service", variant: "destructive" });
      return;
    }
    if (!formData.details.trim()) {
      toast({ title: "Please describe your project or survey requirement", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      trackEvent("lead_form_submit");
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          postcode: formData.postcode,
          town: formData.town,
          service: formData.service,
          description: formData.details,
          source_site: "surveys",
          utm_source: utmSource,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        postcode: "",
        town: "",
        service: "",
        issueType: "",
        details: "",
      });
      setStep(1);
      toast({
        title: "Thanks for your enquiry.",
        description: "A survey specialist will contact you shortly.",
      });
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24 lg:py-28">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Land and drone surveying for planning and development" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Copy & CTAs */}
          <div className="animate-fade-in">
            <h1 className="mb-5 font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
              Professional Land &amp; Drone Surveys
            </h1>
            <p className="mb-3 text-xl font-medium text-primary-foreground md:text-2xl">
              Across London &amp; the South East
            </p>
            <p className="mb-8 text-base text-primary-foreground/80 md:text-lg">
              Topographical, measured building, utility and drone surveys for planning, development and construction. Request a survey quote or speak with a survey specialist.
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
                  Request a Survey Quote
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
                {step === 1 ? "Tell us about your project." : "We'll call you back within 30 minutes."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {step === 1 ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="First name *"
                        value={formData.firstName}
                        onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                      />
                      <Input
                        placeholder="Last name *"
                        value={formData.lastName}
                        onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Town *"
                        value={formData.town}
                        onChange={(e) => setFormData((p) => ({ ...p, town: e.target.value }))}
                      />
                      <Input
                        placeholder="Postcode *"
                        value={formData.postcode}
                        onChange={(e) => setFormData((p) => ({ ...p, postcode: e.target.value }))}
                      />
                    </div>

                    {/* Symptom Selector Cards */}
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">What best describes your project?</p>
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

                    <Select value={formData.service} onValueChange={(v) => setFormData((p) => ({ ...p, service: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="What survey do you need? *" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Textarea
                      placeholder="Describe your project or survey requirement *"
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
                No obligation · Free survey quote
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
