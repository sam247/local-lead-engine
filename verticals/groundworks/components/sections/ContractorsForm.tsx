"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { leadEmailField, leadPhoneField, issuesToFieldErrorMap } from "engine";

const contractorSchema = z.object({
  company: z.string().trim().min(1, "Company name is required").max(200),
  contact: z.string().trim().min(1, "Contact name is required").max(100),
  email: leadEmailField,
  phone: leadPhoneField,
  areas: z.string().trim().max(2000).optional(),
});

type ContractorFieldKey = "company" | "contact" | "phone" | "email" | "areas";

const emptyForm = { company: "", contact: "", phone: "", email: "", areas: "" };

export default function ContractorsForm() {
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<ContractorFieldKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: ContractorFieldKey, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contractorSchema.safeParse({
      company: form.company,
      contact: form.contact,
      phone: form.phone,
      email: form.email,
      areas: form.areas.trim() ? form.areas : undefined,
    });
    if (!result.success) {
      const fe: Partial<Record<ContractorFieldKey, string>> = {};
      result.error.issues.forEach((issue) => {
        const k = issue.path[0];
        if (typeof k === "string" && (k === "company" || k === "contact" || k === "phone" || k === "email" || k === "areas")) {
          fe[k] = issue.message;
        }
      });
      setErrors(fe);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contractors", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as {
          issues?: { path: (string | number)[]; message: string }[];
        } | null;
        if (data?.issues?.length) {
          setErrors(issuesToFieldErrorMap(data.issues) as Partial<Record<ContractorFieldKey, string>>);
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

      setForm(emptyForm);
      setErrors({});
      setSubmitted(true);
      toast({
        title: "Application received",
        description: "Thanks — we'll be in touch after we review your details.",
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

  if (submitted) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-foreground">
          <p className="font-medium">Thanks for your application.</p>
          <p className="mt-2 text-muted-foreground">
            We&apos;ve emailed you a confirmation. Our team will review your details and be in touch if we&apos;d like to move forward.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            setSubmitted(false);
            setForm(emptyForm);
            setErrors({});
          }}
        >
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Input
          placeholder="Company Name *"
          value={form.company}
          onChange={(e) => updateField("company", e.target.value)}
          className={errors.company ? "border-destructive" : ""}
          aria-invalid={!!errors.company}
        />
        {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
      </div>
      <div>
        <Input
          placeholder="Contact Name *"
          value={form.contact}
          onChange={(e) => updateField("contact", e.target.value)}
          className={errors.contact ? "border-destructive" : ""}
          aria-invalid={!!errors.contact}
        />
        {errors.contact && <p className="mt-1 text-xs text-destructive">{errors.contact}</p>}
      </div>
      <div>
        <Input
          type="tel"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={errors.phone ? "border-destructive" : ""}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email Address *"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={errors.email ? "border-destructive" : ""}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
      </div>
      <div>
        <Textarea
          placeholder="Areas / Postcodes You Cover"
          value={form.areas}
          onChange={(e) => updateField("areas", e.target.value)}
          className={cn("min-h-[80px]", errors.areas && "border-destructive")}
          aria-invalid={!!errors.areas}
        />
        {errors.areas && <p className="mt-1 text-xs text-destructive">{errors.areas}</p>}
      </div>
      <Button type="submit" size="lg" variant="highlight" className="w-full text-base" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Application"}
        {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
}
