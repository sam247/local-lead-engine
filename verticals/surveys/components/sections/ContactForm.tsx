"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "engine";
import { z } from "zod";

const SERVICE_OPTIONS = ["Topographical survey", "Drone survey", "Measured building survey", "Utility survey", "Advice / not sure"] as const;

const enquirySchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(50),
  last_name: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  postcode: z.string().trim().min(1, "Postcode is required").max(16),
  town: z.string().trim().min(1, "Town is required").max(100),
  service: z.enum(SERVICE_OPTIONS, { message: "Please select a service" }),
  description: z.string().trim().min(1, "Please describe the issue").max(2000),
  source_site: z.literal("surveys"),
});

type EnquiryData = z.infer<typeof enquirySchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [utmSource, setUtmSource] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryData, string>>>({});
  const [formData, setFormData] = useState<Partial<EnquiryData>>({});
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

  const updateField = (field: keyof EnquiryData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = enquirySchema.safeParse({ ...formData, source_site: "surveys" });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }
    trackEvent("lead_form_submit");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...result.data, utm_source: utmSource }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      setFormData({});
      setErrors({});
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="first_name">First name *</Label>
          <Input id="first_name" value={formData.first_name || ""} onChange={(e) => updateField("first_name", e.target.value)} className={errors.first_name ? "border-destructive" : ""} />
          {errors.first_name && <p className="mt-1 text-xs text-destructive">{errors.first_name}</p>}
        </div>
        <div>
          <Label htmlFor="last_name">Last name *</Label>
          <Input id="last_name" value={formData.last_name || ""} onChange={(e) => updateField("last_name", e.target.value)} className={errors.last_name ? "border-destructive" : ""} />
          {errors.last_name && <p className="mt-1 text-xs text-destructive">{errors.last_name}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={formData.email || ""} onChange={(e) => updateField("email", e.target.value)} className={errors.email ? "border-destructive" : ""} />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" type="tel" value={formData.phone || ""} onChange={(e) => updateField("phone", e.target.value)} className={errors.phone ? "border-destructive" : ""} />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="town">Town *</Label>
          <Input id="town" value={formData.town || ""} onChange={(e) => updateField("town", e.target.value)} className={errors.town ? "border-destructive" : ""} />
          {errors.town && <p className="mt-1 text-xs text-destructive">{errors.town}</p>}
        </div>
        <div>
          <Label htmlFor="postcode">Postcode *</Label>
          <Input id="postcode" value={formData.postcode || ""} onChange={(e) => updateField("postcode", e.target.value)} placeholder="e.g. SW1A 1AA" className={errors.postcode ? "border-destructive" : ""} />
          {errors.postcode && <p className="mt-1 text-xs text-destructive">{errors.postcode}</p>}
        </div>
      </div>
      <div>
        <Label>What service do you need? *</Label>
        <Select value={formData.service || ""} onValueChange={(v) => updateField("service", v)}>
          <SelectTrigger className={errors.service ? "border-destructive" : ""}>
            <SelectValue placeholder="Select a service" />
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
        <Label htmlFor="description">Description of issue *</Label>
        <Textarea
          id="description"
          rows={4}
          value={formData.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Describe your project or survey requirement..."
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Enquiry"}
      </Button>
    </form>
  );
}
