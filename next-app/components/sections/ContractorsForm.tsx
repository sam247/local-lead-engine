"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

export default function ContractorsForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ company: "", contact: "", phone: "", email: "", areas: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.contact || !form.phone || !form.email) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast({ title: "Application Received!", description: "We'll be in touch within 48 hours." });
      setForm({ company: "", contact: "", phone: "", email: "", areas: "" });
      setSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input placeholder="Company Name *" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} />
      <Input placeholder="Contact Name *" value={form.contact} onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))} />
      <Input type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
      <Input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
      <Textarea placeholder="Areas / Postcodes You Cover" value={form.areas} onChange={(e) => setForm((p) => ({ ...p, areas: e.target.value }))} className="min-h-[80px]" />
      <Button type="submit" size="lg" variant="highlight" className="w-full text-base" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Application"}
        {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
}
