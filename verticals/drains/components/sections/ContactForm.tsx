"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  postcode: z.string().trim().min(1, "Postcode is required").max(10),
  issueType: z.string().min(1, "Please select an issue type"),
  urgency: z.string().min(1, "Please select urgency level"),
  message: z.string().trim().max(2000).optional(),
});

type EnquiryData = z.infer<typeof enquirySchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryData, string>>>({});
  const [formData, setFormData] = useState<Partial<EnquiryData>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: keyof EnquiryData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = enquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }
    setTimeout(() => {
      toast({ title: "Enquiry Received", description: "We'll get back to you within 1 hour. For emergencies, call us directly." });
      setFormData({});
      setErrors({});
      setSubmitting(false);
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" value={formData.name || ""} onChange={(e) => updateField("name", e.target.value)} className={errors.name ? "border-destructive" : ""} />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={formData.email || ""} onChange={(e) => updateField("email", e.target.value)} className={errors.email ? "border-destructive" : ""} />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" type="tel" value={formData.phone || ""} onChange={(e) => updateField("phone", e.target.value)} className={errors.phone ? "border-destructive" : ""} />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor="postcode">Postcode *</Label>
          <Input id="postcode" value={formData.postcode || ""} onChange={(e) => updateField("postcode", e.target.value)} placeholder="e.g. SW1A 1AA" className={errors.postcode ? "border-destructive" : ""} />
          {errors.postcode && <p className="mt-1 text-xs text-destructive">{errors.postcode}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Type of Issue *</Label>
          <Select value={formData.issueType || ""} onValueChange={(v) => updateField("issueType", v)}>
            <SelectTrigger className={errors.issueType ? "border-destructive" : ""}>
              <SelectValue placeholder="Select issue type" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>{s.title}</SelectItem>
              ))}
              <SelectItem value="other">Other / Not Sure</SelectItem>
            </SelectContent>
          </Select>
          {errors.issueType && <p className="mt-1 text-xs text-destructive">{errors.issueType}</p>}
        </div>
        <div>
          <Label>Urgency Level *</Label>
          <Select value={formData.urgency || ""} onValueChange={(v) => updateField("urgency", v)}>
            <SelectTrigger className={errors.urgency ? "border-destructive" : ""}>
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="routine">Routine — within a week</SelectItem>
              <SelectItem value="urgent">Urgent — within 24 hours</SelectItem>
              <SelectItem value="emergency">Emergency — need help now</SelectItem>
            </SelectContent>
          </Select>
          {errors.urgency && <p className="mt-1 text-xs text-destructive">{errors.urgency}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="message">Additional Details</Label>
        <Textarea id="message" rows={4} value={formData.message || ""} onChange={(e) => updateField("message", e.target.value)} placeholder="Describe your drainage issue..." />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Enquiry"}
      </Button>
    </form>
  );
}
