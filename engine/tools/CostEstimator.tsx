"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Calculator } from "lucide-react";

export interface CostEstimatorOption {
  id: string;
  label: string;
}

export interface CostEstimatorProps {
  problemTypes: CostEstimatorOption[];
  pipeLocations: CostEstimatorOption[];
  depths: CostEstimatorOption[];
  costMatrix: Record<
    string,
    Record<string, Record<string, [number, number]>>
  >;
  title?: string;
  stepLabels?: {
    problem?: string;
    location?: string;
    depth?: string;
  };
  resultDisclaimer?: string;
  resultWarning?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function CostEstimator({
  problemTypes,
  pipeLocations,
  depths,
  costMatrix,
  title = "Cost Estimator",
  stepLabels = {},
  resultDisclaimer = "Most issues require a professional inspection before repair work begins.",
  resultWarning = "Problems often worsen quickly if ignored.",
  ctaText = "Book an Inspection",
  ctaLink = "/contact",
}: CostEstimatorProps) {
  const {
    problem: problemLabel = "Select the type of problem:",
    location: locationLabel = "Where is it located?",
    depth: depthLabel = "Approximate depth:",
  } = stepLabels;

  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState("");
  const [location, setLocation] = useState("");
  const [depth, setDepth] = useState("");

  const estimate =
    problem && location && depth
      ? costMatrix[problem]?.[location]?.[depth]
      : null;

  const reset = () => {
    setStep(0);
    setProblem("");
    setLocation("");
    setDepth("");
  };

  return (
    <div className="rounded-lg border border-border bg-background p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Calculator className="h-6 w-6 text-primary" />
        <h3 className="font-display text-xl font-bold">{title}</h3>
      </div>

      {step === 0 && (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">{problemLabel}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {problemTypes.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setProblem(p.id);
                  setStep(1);
                }}
                className="rounded-md border border-border p-3 text-left text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">{locationLabel}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {pipeLocations.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setLocation(l.id);
                  setStep(2);
                }}
                className="rounded-md border border-border p-3 text-left text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(0)}
            className="mt-3 text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">{depthLabel}</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {depths.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setDepth(d.id);
                  setStep(3);
                }}
                className="rounded-md border border-border p-3 text-left text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
              >
                {d.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            className="mt-3 text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back
          </button>
        </div>
      )}

      {step === 3 && estimate && (
        <div className="mt-6 text-center">
          <p className="mb-2 text-sm text-muted-foreground">Typical range:</p>
          <p className="mb-2 font-display text-3xl font-bold text-primary">
            £{estimate[0].toLocaleString()} – £{estimate[1].toLocaleString()}
          </p>
          <p className="mb-2 text-sm text-muted-foreground">{resultDisclaimer}</p>
          {resultWarning && (
            <p className="mb-6 text-xs font-medium text-destructive">
              {resultWarning}
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="highlight" asChild>
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
            <Button variant="outline" onClick={reset}>
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
