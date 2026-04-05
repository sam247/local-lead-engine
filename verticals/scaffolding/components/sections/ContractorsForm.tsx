"use client";

import { useState } from "react";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { leadEmailField, leadPhoneField, issuesToFieldErrorMap } from "engine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    const result = contractorSchema.safeParse({
      company: form.company,
      contact: form.contact,
      phone: form.phone,
      email: form.email,
      areas: form.areas.trim() ? form.areas : undefined,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<ContractorFieldKey, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string" && (key === "company" || key === "contact" || key === "phone" || key === "email" || key === "areas")) {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contractors", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (response.status === 400) {
        const data = (await response.json().catch(() => null)) as {
          issues?: { path: (string | number)[]; message: string }[];
        } | null;
        if (data?.issues?.length) {
          setErrors(issuesToFieldErrorMap(data.issues) as Partial<Record<ContractorFieldKey, string>>);
          return;
        }
      }

      if (!response.ok) {
        toast({
          title: "Submission failed",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
        return;
      }

      setSubmitted(true);
      setForm(emptyForm);
      setErrors({});
      toast({
        title: "Application received",
        description: "Thanks — we'll review your details and be in touch.",
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
            We&apos;ve received your contractor details and will be in touch if we&apos;d like to move forward.
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
          onChange={(event) => updateField("company", event.target.value)}
          className={errors.company ? "border-destructive" : ""}
          aria-invalid={!!errors.company}
        />
        {errors.company ? <p className="mt-1 text-xs text-destructive">{errors.company}</p> : null}
      </div>
      <div>
        <Input
          placeholder="Contact Name *"
          value={form.contact}
          onChange={(event) => updateField("contact", event.target.value)}
          className={errors.contact ? "border-destructive" : ""}
          aria-invalid={!!errors.contact}
        />
        {errors.contact ? <p className="mt-1 text-xs text-destructive">{errors.contact}</p> : null}
      </div>
      <div>
        <Input
          type="tel"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className={errors.phone ? "border-destructive" : ""}
          aria-invalid={!!errors.phone}
        />
        {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone}</p> : null}
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email Address *"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className={errors.email ? "border-destructive" : ""}
          aria-invalid={!!errors.email}
        />
        {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email}</p> : null}
      </div>
      <div>
        <Textarea
          placeholder="Areas / Postcodes You Cover"
          value={form.areas}
          onChange={(event) => updateField("areas", event.target.value)}
          className={cn("min-h-[80px]", errors.areas && "border-destructive")}
          aria-invalid={!!errors.areas}
        />
        {errors.areas ? <p className="mt-1 text-xs text-destructive">{errors.areas}</p> : null}
      </div>
      <Button type="submit" size="lg" variant="highlight" className="w-full text-base" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Application"}
        {!submitting ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
      </Button>
    </form>
  );
}
