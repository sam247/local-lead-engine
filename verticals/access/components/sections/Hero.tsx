"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Phone, Ban, Wind, Droplets, TrendingDown, Search } from "lucide-react";
import { heroBg } from "@/lib/images";
import { companyInfo } from "@/lib/data";
import { verticalConfig } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, getVariantIndex, TrackablePhoneLink } from "engine";
import { cn } from "@/lib/utils";

const HERO_ABOUT_LABELS = ["Learn more about our team", "How we work with clients"] as const;

const SERVICE_OPTIONS = ["Access control systems", "Commercial CCTV", "IP cameras", "Perimeter security", "Security integration", "Advice"] as const;
const PROJECT_STAGE_OPTIONS = ["planning", "ready", "exploring"] as const;

const issueOptions = [
  { id: "new-install", label: "New installation", icon: Ban },
  { id: "upgrade", label: "Upgrade / Extension", icon: Wind },
  { id: "maintenance", label: "Maintenance", icon: Droplets },
  { id: "quote", label: "Quote only", icon: TrendingDown },
  { id: "unsure", label: "Not sure", icon: Search },
];

const Hero = () => {
  const aboutLabelIndex = getVariantIndex(`about:home:${verticalConfig.verticalId}`, HERO_ABOUT_LABELS.length);
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
    projectStage: "",
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

  const getPathMetadata = () => {
    const pagePath = window.location.pathname || "";
    const segments = pagePath.split("/").filter(Boolean);
    return {
      page_path: pagePath,
      service_slug: segments[0] ?? "",
      location_slug: segments[1] ?? "",
    };
  };

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
      toast({ title: "Please describe the issue", variant: "destructive" });
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
          project_stage: formData.projectStage || "",
          source_site: "access",
          utm_source: utmSource,
          ...getPathMetadata(),
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
        projectStage: "",
        details: "",
      });
      setStep(1);
      toast({
        title: "Thanks for your enquiry.",
        description: "A security specialist will contact you shortly.",
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
        <img src={heroBg} alt="Commercial access control and security systems" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Copy & CTAs */}
          <div className="animate-fade-in">
            <h1 className="mb-5 font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
              Commercial Access Control and Security Systems
            </h1>
            <p className="mb-4 text-base text-primary-foreground/80 md:text-lg">
              We design and install access control, CCTV and integrated security systems for operationally demanding sites.
            </p>
            <p className="mb-4 text-base text-primary-foreground/80 md:text-lg">
              Our work supports facilities managers, estates teams and business owners across London and wider UK service areas.
            </p>
            <p className="mb-8 text-xs text-primary-foreground/60">
              <Link href="/about" className="underline-offset-2 hover:underline">
                {HERO_ABOUT_LABELS[aboutLabelIndex]}
              </Link>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button variant="highlight" size="lg" asChild>
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={verticalConfig.verticalId}
                  serviceSlug={null}
                  locationSlug={null}
                  className="gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </TrackablePhoneLink>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary-foreground/30 text-primary hover:bg-primary-foreground/10">
                <Link href="/contact">
                  {verticalConfig.heroSecondaryCtaText ?? "Request Inspection"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 space-y-2 pt-1">
              <p className="text-left text-xs leading-snug text-primary-foreground/75">
                Vetted contractors · Fully insured · UK-wide
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <img
                  src="/citb.png"
                  alt="CITB"
                  width={149}
                  height={47}
                  className="h-3 w-auto max-w-[50px] object-contain opacity-90 md:h-10 md:max-w-[148px]"
                />
                <img
                  src="/dbs.png"
                  alt="DBS disclosure check"
                  width={149}
                  height={47}
                  className="h-3 w-auto max-w-[50px] object-contain opacity-90 md:h-10 md:max-w-[148px]"
                />
                <img
                  src="/trustmark.png"
                  alt="TrustMark"
                  width={149}
                  height={47}
                  className="h-3 w-auto max-w-[50px] object-contain opacity-90 md:h-10 md:max-w-[148px]"
                />
                <img
                  src="/fmb.png"
                  alt="Federation of Master Builders"
                  width={149}
                  height={47}
                  className="h-3 w-auto max-w-[50px] object-contain opacity-90 md:h-10 md:max-w-[148px]"
                />
              </div>
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
                      <p className="mb-2 text-sm font-medium text-muted-foreground">What do you need?</p>
                      <div className="grid grid-cols-2 gap-2">
                        {issueOptions.map((option, i) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, issueType: option.id }))}
                            className={cn(
                              "flex items-center gap-2 rounded-md border p-2.5 text-left text-sm font-medium transition-colors",
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
                        <SelectValue placeholder="What service do you need? *" />
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
                      placeholder="Describe your requirements *"
                      value={formData.details}
                      onChange={(e) => setFormData((p) => ({ ...p, details: e.target.value }))}
                      className="min-h-[60px]"
                    />
                    <div>
                      <p className="mb-2 text-sm font-medium text-muted-foreground">Project stage (optional)</p>
                      <div className="grid grid-cols-3 gap-2">
                        {PROJECT_STAGE_OPTIONS.map((option) => (
                          <label key={option} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm capitalize">
                            <input
                              type="radio"
                              name="project_stage"
                              value={option}
                              checked={formData.projectStage === option}
                              onChange={(e) => setFormData((p) => ({ ...p, projectStage: e.target.value }))}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>

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
                No obligation · Free site survey · Fixed-price quotes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
