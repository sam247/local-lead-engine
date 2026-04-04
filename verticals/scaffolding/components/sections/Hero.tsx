"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Home, Building2, Flame, Zap, HardHat } from "lucide-react";
import { heroBg } from "@/lib/images";
import { services } from "@/lib/data";
import { verticalConfig } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  trackEvent,
  getVariantIndex,
  leadEmailField,
  leadPhoneField,
  leadPostcodeField,
  mapLeadApiErrorsToHeroUi,
  issuesToFieldErrorMap,
  zodIssuesToFieldErrorMap,
  QUOTE_FORM_ELEMENT_ID,
  QuoteFormPrimaryCta,
  getCtaVariant,
  getLastCtaFromSession,
} from "engine";
import { z } from "zod";
import { cn } from "@/lib/utils";

const HERO_ABOUT_LABELS = ["Learn more about our team", "How we work with clients"] as const;

const SERVICE_OPTIONS = [
  "Scaffolding Contractors",
  "Domestic Scaffolding",
  "Commercial Scaffolding",
  "Roof Scaffolding",
  "Temporary Roofing",
  "Access Scaffolding",
  "Scaffolding Hire",
  "Emergency Scaffolding",
  "Chimney Scaffolding",
  "Advice",
] as const;
const PROJECT_STAGE_OPTIONS = ["planning", "ready", "exploring"] as const;

const projectTypeOptions = [
  { id: "domestic", label: "Domestic", icon: Home },
  { id: "commercial", label: "Commercial", icon: Building2 },
  { id: "chimney", label: "Chimney", icon: Flame },
  { id: "emergency", label: "Emergency", icon: Zap },
  { id: "other", label: "Other", icon: HardHat },
];

type HeroErrorKey =
  | "firstName"
  | "lastName"
  | "phone"
  | "email"
  | "postcode"
  | "town"
  | "service"
  | "details"
  | "projectStage";

const initialForm = {
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
};

const formKeyToErrorKey: Partial<Record<keyof typeof initialForm, HeroErrorKey>> = {
  firstName: "firstName",
  lastName: "lastName",
  phone: "phone",
  email: "email",
  postcode: "postcode",
  town: "town",
  service: "service",
  projectStage: "projectStage",
  details: "details",
};

const heroStep1Schema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(50),
  last_name: z.string().trim().min(1, "Last name is required").max(50),
  town: z.string().trim().min(1, "Town is required").max(100),
  postcode: leadPostcodeField,
});

function buildHeroLeadSchema() {
  return z.object({
    first_name: z.string().trim().min(1, "First name is required").max(50),
    last_name: z.string().trim().min(1, "Last name is required").max(50),
    email: leadEmailField,
    phone: leadPhoneField,
    postcode: leadPostcodeField,
    town: z.string().trim().min(1, "Town is required").max(100),
    service: z.enum(SERVICE_OPTIONS, { message: "Please select a service" }),
    description: z.string().trim().min(1, "Please describe your scaffolding requirement").max(2000),
    project_stage: z.enum(PROJECT_STAGE_OPTIONS).optional(),
  });
}

const Hero = () => {
  const aboutLabelIndex = getVariantIndex(`about:home:${verticalConfig.verticalId}`, HERO_ABOUT_LABELS.length);
  const homeCtaSeed = `${verticalConfig.verticalId}-home`;
  const homeCtaLabel = getCtaVariant(homeCtaSeed, verticalConfig.ctaVariants, {
    serviceSlug: services[0]?.slug,
  });
  const { toast } = useToast();
  const [utmSource, setUtmSource] = useState<string | undefined>(undefined);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<HeroErrorKey, string>>>({});
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

  const patchForm = (patch: Partial<typeof formData>) => {
    setFormData((p) => ({ ...p, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(patch) as (keyof typeof initialForm)[]) {
        const ek = formKeyToErrorKey[k];
        if (ek) delete next[ek];
      }
      return next;
    });
  };

  const handleContinue = () => {
    setErrors({});
    const step1 = heroStep1Schema.safeParse({
      first_name: formData.firstName,
      last_name: formData.lastName,
      town: formData.town,
      postcode: formData.postcode,
    });
    if (!step1.success) {
      setErrors(mapLeadApiErrorsToHeroUi(zodIssuesToFieldErrorMap(step1.error.issues)) as Partial<Record<HeroErrorKey, string>>);
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const heroLeadSchema = buildHeroLeadSchema();
    const parsed = heroLeadSchema.safeParse({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      postcode: formData.postcode,
      town: formData.town,
      service: formData.service || undefined,
      description: formData.details,
      project_stage: formData.projectStage || undefined,
    });
    if (!parsed.success) {
      setErrors(mapLeadApiErrorsToHeroUi(zodIssuesToFieldErrorMap(parsed.error.issues)) as Partial<Record<HeroErrorKey, string>>);
      return;
    }

    setSubmitting(true);
    try {
      trackEvent("lead_form_submit");
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          project_stage: parsed.data.project_stage ?? "",
          description: parsed.data.description,
          source_site: "scaffolding",
          utm_source: utmSource,
          ...getPathMetadata(),
          ...getLastCtaFromSession(),
        }),
      });

      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as { issues?: { path: (string | number)[]; message: string }[] } | null;
        if (data?.issues?.length) {
          setErrors(mapLeadApiErrorsToHeroUi(issuesToFieldErrorMap(data.issues)) as Partial<Record<HeroErrorKey, string>>);
          return;
        }
      }

      if (!res.ok) {
        toast({
          title: "Submission failed",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
        return;
      }

      setFormData(initialForm);
      setErrors({});
      setStep(1);
      toast({
        title: "Thanks for your enquiry.",
        description: "A scaffolding specialist will contact you shortly.",
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
        <img src={heroBg} alt="Scaffolding contractors on site" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in">
            <h1 className="mb-5 font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
              NASC Accredited Scaffolding Contractors Across the UK
            </h1>
            <p className="mb-4 text-base text-primary-foreground/80 md:text-lg">
              Domestic and commercial scaffolding — designed, erected, inspected and certified to TG20. Rapid mobilisation for planned works and 24/7 emergency callout.
            </p>
            <p className="mb-4 text-base text-primary-foreground/80 md:text-lg">
              Homeowners, builders, main contractors and facilities managers use our scaffolding teams across UK project locations.
            </p>
            <p className="mb-8 text-xs text-primary-foreground/60">
              <Link href="/about" className="underline-offset-2 hover:underline">
                {HERO_ABOUT_LABELS[aboutLabelIndex]}
              </Link>
            </p>

            <div>
              <QuoteFormPrimaryCta
                contactPath="/contact"
                variant="highlight"
                size="lg"
                ctaText={homeCtaLabel}
                ctaSeed={homeCtaSeed}
              >
                <span className="inline-flex items-center">
                  {homeCtaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </QuoteFormPrimaryCta>
            </div>
          </div>

          <div className="animate-fade-in opacity-0 [animation-delay:150ms]">
            <div className="rounded-xl border border-primary-foreground/10 bg-background p-6 shadow-2xl md:p-8">
              <h2 className="mb-1 font-display text-xl font-bold text-foreground">Get a Free Quote</h2>
              <p className="mb-5 text-sm text-muted-foreground">
                {step === 1 ? "Tell us about your scaffolding requirements." : "We'll call you back to discuss the details."}
              </p>

              <form id={QUOTE_FORM_ELEMENT_ID} onSubmit={handleSubmit} className="space-y-3">
                {step === 1 ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Input
                          placeholder="First name *"
                          value={formData.firstName}
                          onChange={(e) => patchForm({ firstName: e.target.value })}
                          className={errors.firstName ? "border-destructive" : ""}
                          aria-invalid={!!errors.firstName}
                        />
                        {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Input
                          placeholder="Last name *"
                          value={formData.lastName}
                          onChange={(e) => patchForm({ lastName: e.target.value })}
                          className={errors.lastName ? "border-destructive" : ""}
                          aria-invalid={!!errors.lastName}
                        />
                        {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Input
                          placeholder="Town *"
                          value={formData.town}
                          onChange={(e) => patchForm({ town: e.target.value })}
                          className={errors.town ? "border-destructive" : ""}
                          aria-invalid={!!errors.town}
                        />
                        {errors.town && <p className="mt-1 text-xs text-destructive">{errors.town}</p>}
                      </div>
                      <div>
                        <Input
                          placeholder="Postcode *"
                          value={formData.postcode}
                          onChange={(e) => patchForm({ postcode: e.target.value })}
                          className={errors.postcode ? "border-destructive" : ""}
                          aria-invalid={!!errors.postcode}
                        />
                        {errors.postcode && <p className="mt-1 text-xs text-destructive">{errors.postcode}</p>}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-medium text-muted-foreground">What type of project?</p>
                      <div className="grid grid-cols-2 gap-2">
                        {projectTypeOptions.map((option, i) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, issueType: option.id }))}
                            className={cn(
                              "flex items-center gap-2 rounded-md border p-2.5 text-left text-sm font-medium transition-colors",
                              formData.issueType === option.id
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/50",
                              i === projectTypeOptions.length - 1 && projectTypeOptions.length % 2 !== 0 && "col-span-2"
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
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone number *"
                        value={formData.phone}
                        onChange={(e) => patchForm({ phone: e.target.value })}
                        className={errors.phone ? "border-destructive" : ""}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email address *"
                        value={formData.email}
                        onChange={(e) => patchForm({ email: e.target.value })}
                        className={errors.email ? "border-destructive" : ""}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div>
                      <Select value={formData.service} onValueChange={(v) => patchForm({ service: v })}>
                        <SelectTrigger className={errors.service ? "border-destructive" : ""} aria-invalid={!!errors.service}>
                          <SelectValue placeholder="Select service *" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
                    </div>

                    <div>
                      <Textarea
                        placeholder="Describe your scaffolding requirement *"
                        value={formData.details}
                        onChange={(e) => patchForm({ details: e.target.value })}
                        className={cn("min-h-[60px]", errors.details && "border-destructive")}
                        aria-invalid={!!errors.details}
                      />
                      {errors.details && <p className="mt-1 text-xs text-destructive">{errors.details}</p>}
                    </div>
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
                              onChange={(e) => patchForm({ projectStage: e.target.value })}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                      {errors.projectStage && <p className="mt-1 text-xs text-destructive">{errors.projectStage}</p>}
                    </div>

                    <Button type="submit" size="lg" variant="highlight" className="w-full text-base" disabled={submitting}>
                      {submitting ? "Submitting…" : "Request a Callback"}
                      {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setErrors({});
                      }}
                      className="flex w-full items-center justify-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      Back
                    </button>
                  </>
                )}
              </form>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                No obligation · Free scaffolding quote
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
