"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Stethoscope, CheckSquare, Square } from "lucide-react";

export interface DiagnosisOutcome {
  problem: string;
  description: string;
  severity: "low" | "medium" | "high";
  links: { label: string; url: string }[];
}

export interface DiagnosisToolProps {
  symptoms: { id: string; label: string }[];
  getDiagnosis: (selectedIds: string[]) => DiagnosisOutcome;
  title?: string;
  prompt?: string;
  ctaText?: string;
}

const severityColors = {
  low: "text-green-600 bg-green-50 border-green-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  high: "text-red-600 bg-red-50 border-red-200",
};

export function DiagnosisTool({
  symptoms,
  getDiagnosis,
  title = "Diagnosis Tool",
  prompt = "Select all symptoms you're experiencing:",
  ctaText = "Get Diagnosis",
}: DiagnosisToolProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setShowResult(false);
  };

  const diagnosis = getDiagnosis(selected);

  return (
    <div className="rounded-lg border border-border bg-background p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Stethoscope className="h-6 w-6 text-primary" />
        <h3 className="font-display text-xl font-bold">{title}</h3>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">{prompt}</p>

      <div className="mb-6 grid gap-2 sm:grid-cols-2">
        {symptoms.map((s) => (
          <button
            key={s.id}
            onClick={() => toggle(s.id)}
            className={`flex items-center gap-2 rounded-md border p-3 text-left text-sm transition-colors ${
              selected.includes(s.id)
                ? "border-primary bg-primary/5 font-medium"
                : "border-border hover:border-primary/50"
            }`}
          >
            {selected.includes(s.id) ? (
              <CheckSquare className="h-4 w-4 shrink-0 text-primary" />
            ) : (
              <Square className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
            {s.label}
          </button>
        ))}
      </div>

      {!showResult && selected.length > 0 && (
        <Button onClick={() => setShowResult(true)} className="w-full">
          {ctaText}
        </Button>
      )}

      {showResult && (
        <div
          className={`mt-4 rounded-lg border p-6 ${severityColors[diagnosis.severity]}`}
        >
          <h4 className="mb-2 font-display text-lg font-bold">{diagnosis.problem}</h4>
          <p className="mb-4 text-sm">{diagnosis.description}</p>
          <div className="flex flex-wrap gap-2">
            {diagnosis.links.map((link) => (
              <Button
                key={link.url}
                variant="outline"
                size="sm"
                asChild
                className="border-current"
              >
                <Link href={link.url}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
