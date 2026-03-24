"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackEvent, getServiceUrl } from "engine";
import { Stethoscope, CheckSquare, Square } from "lucide-react";

const symptoms = [
  { id: "slow-drainage", label: "Slow draining sinks, baths or toilets" },
  { id: "smells", label: "Foul smells from drains" },
  { id: "gurgling", label: "Gurgling noises from pipes" },
  { id: "sinkhole", label: "Sinkhole or depression in garden/driveway" },
  { id: "backing-up", label: "Water backing up from drains" },
  { id: "damp", label: "Damp patches on walls or floors" },
  { id: "recurring", label: "Recurring blockages" },
  { id: "rats", label: "Rat or pest activity near drains" },
];

interface Diagnosis {
  problem: string;
  description: string;
  severity: "low" | "medium" | "high";
  links: { label: string; url: string }[];
}

const getDiagnosis = (selected: string[]): Diagnosis => {
  const hasSinkhole = selected.includes("sinkhole");
  const hasBackingUp = selected.includes("backing-up");
  const hasDamp = selected.includes("damp");
  const hasSmells = selected.includes("smells");
  const hasRats = selected.includes("rats");
  const hasGurgling = selected.includes("gurgling");
  const hasSlowDrainage = selected.includes("slow-drainage");
  const hasRecurring = selected.includes("recurring");

  if (hasSinkhole || (hasDamp && hasSmells && selected.length >= 3)) {
    return {
      problem: "Possible Drain Collapse",
      description: "Your symptoms suggest a collapsed or severely damaged drain. This requires urgent professional inspection to prevent further property damage.",
      severity: "high",
      links: [
        { label: "Signs of Collapsed Drain", url: "/drain-problems/signs-of-collapsed-drain" },
        { label: "Collapsed Drain Under Garden", url: "/drain-collapse/under-garden" },
        { label: "Book CCTV Survey", url: "/contact" },
      ],
    };
  }

  if (hasBackingUp || hasRats) {
    return {
      problem: "Significant Drainage Problem",
      description: "Water backing up or pest activity indicates a serious blockage or structural issue. A CCTV survey is recommended to diagnose the exact cause.",
      severity: "high",
      links: [
        { label: "Why Water Backs Up", url: "/drain-problems/why-is-water-backing-up-in-drains" },
        { label: "Drain Backing Up Into Garden", url: "/drain-problems/drain-backing-up-garden" },
        { label: "Book CCTV Survey", url: "/contact" },
      ],
    };
  }

  if (hasSmells && !hasGurgling && !hasSlowDrainage && selected.length <= 2) {
    return {
      problem: "Possible Drain Seal or Trap Issue",
      description: "Foul smells without other symptoms may indicate a broken seal, dry trap, or cracked pipe allowing sewer gas to escape. A professional inspection will identify the source.",
      severity: "medium",
      links: [
        { label: "Bad Smells From Drains", url: "/drain-problems/bad-smells-from-drains" },
        { label: "Why Do My Drains Smell?", url: "/drain-problems/why-do-my-drains-smell" },
        { label: "Book CCTV Survey", url: "/contact" },
      ],
    };
  }

  if (hasGurgling) {
    return {
      problem: "Ventilation or Partial Blockage Issue",
      description: "Gurgling indicates air pressure imbalances in your drainage. This is often caused by a partial blockage, poor venting, or a developing structural problem.",
      severity: "medium",
      links: [
        { label: "Why Do Drains Gurgle?", url: "/drain-problems/why-do-drains-gurgle" },
        { label: "Gurgling Drains and Pipes", url: "/drain-problems/gurgling-drains-pipes" },
        { label: "Book CCTV Survey", url: "/contact" },
      ],
    };
  }

  if (hasSlowDrainage) {
    return {
      problem: "Developing Blockage or Root Intrusion",
      description: "Slow drainage may indicate a partial blockage, tree root ingress, or pipe damage restricting flow. Early investigation prevents escalation.",
      severity: "medium",
      links: [
        { label: "Slow Draining Sinks & Toilets", url: "/drain-problems/slow-draining-sinks-toilets" },
        { label: "Tree Roots in Drains", url: "/drain-causes/tree-roots-in-drains" },
        { label: "Book CCTV Survey", url: "/contact" },
      ],
    };
  }

  if (hasRecurring || selected.length >= 3) {
    return {
      problem: "Developing Drainage Issue",
      description: "Multiple symptoms suggest an underlying problem in your drainage system. A professional CCTV survey will identify the cause before it worsens.",
      severity: "medium",
      links: [
        { label: "Recurring Blockages", url: "/drain-problems/recurring-drain-blockages" },
        { label: "Why Is My Drain Blocking?", url: "/drain-problems/why-is-my-drain-blocking" },
        { label: "Book CCTV Survey", url: "/contact" },
      ],
    };
  }

  return {
    problem: "Minor Drainage Issue",
    description: "Your symptoms may indicate a simple blockage or minor issue. If the problem persists, a professional inspection can rule out anything more serious.",
    severity: "low",
    links: [
      { label: "Blocked Drains", url: getServiceUrl("blocked-drains") },
      { label: "Drain Jetting", url: getServiceUrl("drain-jetting") },
      { label: "Book an Inspection", url: "/contact" },
    ],
  };
};

const severityColors = {
  low: "text-green-600 bg-green-50 border-green-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  high: "text-red-600 bg-red-50 border-red-200",
};

const DiagnosisTool = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      if (prev.length === 0 && next.length === 1) trackEvent("diagnosis_started");
      return next;
    });
    setShowResult(false);
  };

  const diagnosis = getDiagnosis(selected);

  return (
    <div className="rounded-lg border border-border bg-background p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Stethoscope className="h-6 w-6 text-primary" />
        <h3 className="font-display text-xl font-bold">Drain Diagnosis Tool</h3>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">Select all symptoms you're experiencing:</p>

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
        <Button
          onClick={() => {
            trackEvent("diagnosis_completed");
            setShowResult(true);
          }}
          className="w-full"
        >
          Get Diagnosis
        </Button>
      )}

      {showResult && (
        <div className={`mt-4 rounded-lg border p-6 ${severityColors[diagnosis.severity]}`}>
          <h4 className="mb-2 font-display text-lg font-bold">{diagnosis.problem}</h4>
          <p className="mb-4 text-sm">{diagnosis.description}</p>
          <div className="flex flex-wrap gap-2">
            {diagnosis.links.map((link) => (
              <Button key={link.url} variant="outline" size="sm" asChild className="border-current">
                <Link href={link.url}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisTool;
