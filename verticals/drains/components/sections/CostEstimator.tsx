"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const problemTypes = [
  { id: "collapse", label: "Collapsed Drain" },
  { id: "blockage", label: "Blocked Drain" },
  { id: "relining", label: "Drain Relining" },
  { id: "excavation", label: "Drain Excavation" },
  { id: "survey", label: "CCTV Survey" },
];

const pipeLocations = [
  { id: "garden", label: "Under Garden" },
  { id: "driveway", label: "Under Driveway" },
  { id: "house", label: "Under House/Building" },
  { id: "road", label: "Under Road" },
];

const depths = [
  { id: "shallow", label: "Shallow (under 1m)" },
  { id: "medium", label: "Medium (1-2m)" },
  { id: "deep", label: "Deep (over 2m)" },
];

const costMatrix: Record<string, Record<string, Record<string, [number, number]>>> = {
  collapse: {
    garden: { shallow: [1500, 3000], medium: [2500, 5000], deep: [4000, 8000] },
    driveway: { shallow: [2000, 4000], medium: [3500, 6500], deep: [5000, 10000] },
    house: { shallow: [3000, 6000], medium: [5000, 9000], deep: [7000, 15000] },
    road: { shallow: [4000, 8000], medium: [6000, 12000], deep: [8000, 20000] },
  },
  blockage: {
    garden: { shallow: [150, 300], medium: [200, 400], deep: [300, 600] },
    driveway: { shallow: [200, 400], medium: [300, 500], deep: [400, 700] },
    house: { shallow: [200, 400], medium: [300, 600], deep: [500, 900] },
    road: { shallow: [300, 500], medium: [400, 700], deep: [600, 1000] },
  },
  relining: {
    garden: { shallow: [1000, 2000], medium: [1500, 3000], deep: [2000, 4000] },
    driveway: { shallow: [1200, 2500], medium: [2000, 3500], deep: [2500, 5000] },
    house: { shallow: [1500, 3000], medium: [2500, 4500], deep: [3500, 6000] },
    road: { shallow: [2000, 4000], medium: [3000, 5500], deep: [4000, 8000] },
  },
  excavation: {
    garden: { shallow: [1500, 3000], medium: [2500, 5000], deep: [4000, 8000] },
    driveway: { shallow: [2500, 5000], medium: [4000, 7000], deep: [6000, 12000] },
    house: { shallow: [3500, 7000], medium: [5500, 10000], deep: [8000, 16000] },
    road: { shallow: [5000, 9000], medium: [7000, 13000], deep: [10000, 22000] },
  },
  survey: {
    garden: { shallow: [200, 350], medium: [200, 350], deep: [250, 400] },
    driveway: { shallow: [200, 350], medium: [250, 400], deep: [300, 450] },
    house: { shallow: [250, 400], medium: [300, 450], deep: [350, 500] },
    road: { shallow: [300, 450], medium: [350, 500], deep: [400, 600] },
  },
};

const CostEstimator = () => {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState("");
  const [location, setLocation] = useState("");
  const [depth, setDepth] = useState("");

  const estimate = problem && location && depth ? costMatrix[problem]?.[location]?.[depth] : null;

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
        <h3 className="font-display text-xl font-bold">Drain Repair Cost Estimator</h3>
      </div>

      {step === 0 && (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">Select the type of drainage problem:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {problemTypes.map((p) => (
              <button
                key={p.id}
                onClick={() => { setProblem(p.id); setStep(1); }}
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
          <p className="mb-4 text-sm text-muted-foreground">Where is the pipe located?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {pipeLocations.map((l) => (
              <button
                key={l.id}
                onClick={() => { setLocation(l.id); setStep(2); }}
                className="rounded-md border border-border p-3 text-left text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(0)} className="mt-3 text-sm text-muted-foreground hover:text-foreground">← Back</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">Approximate pipe depth:</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {depths.map((d) => (
              <button
                key={d.id}
                onClick={() => { setDepth(d.id); setStep(3); }}
                className="rounded-md border border-border p-3 text-left text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
              >
                {d.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="mt-3 text-sm text-muted-foreground hover:text-foreground">← Back</button>
        </div>
      )}

      {step === 3 && estimate && (
        <div className="text-center">
          <p className="mb-2 text-sm text-muted-foreground">Typical repair range:</p>
          <p className="mb-2 font-display text-3xl font-bold text-primary">
            £{estimate[0].toLocaleString()} – £{estimate[1].toLocaleString()}
          </p>
          <p className="mb-2 text-sm text-muted-foreground">
            Most drainage issues require a CCTV inspection before repair work begins.
          </p>
          <p className="mb-6 text-xs font-medium text-destructive">
            Drain problems often worsen quickly if ignored.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="highlight" asChild>
              <Link href="/contact">Book a Drain Inspection</Link>
            </Button>
            <Button variant="outline" onClick={reset}>
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostEstimator;
