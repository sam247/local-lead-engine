import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";
import { companyInfo } from "@/lib/data";

const COVERED_PREFIXES = [
  "SW", "SE", "W", "NW", "N", "E", "EC", "WC",
  "TW", "KT", "SM", "CR", "BR", "DA", "EN", "HA",
  "IG", "RM", "UB", "SL", "GU", "RH", "TN", "ME",
];

const PostcodeCheck = () => {
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState<"covered" | "call" | null>(null);

  const handleCheck = () => {
    const cleaned = postcode.trim().toUpperCase().replace(/\s/g, "");
    if (!cleaned) return;
    const prefix = cleaned.match(/^[A-Z]{1,2}/)?.[0] || "";
    setResult(COVERED_PREFIXES.includes(prefix) ? "covered" : "call");
  };

  return (
    <div className="rounded-lg border border-border bg-secondary p-4">
      <p className="mb-3 text-sm font-semibold text-foreground">Check if we cover your area</p>
      <div className="flex gap-2">
        <Input
          placeholder="Enter postcode"
          value={postcode}
          onChange={(e) => { setPostcode(e.target.value); setResult(null); }}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
          className="bg-background"
        />
        <Button size="sm" onClick={handleCheck}>Check</Button>
      </div>
      {result === "covered" && (
        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-primary">
          <CheckCircle className="h-4 w-4" /> Great news — we cover your area!
        </p>
      )}
      {result === "call" && (
        <p className="mt-2 text-sm text-muted-foreground">
          Not sure about your area? Call us on{" "}
          <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
            <Phone className="h-3 w-3" /> {companyInfo.phone}
          </a>{" "}
          to check.
        </p>
      )}
    </div>
  );
};

export default PostcodeCheck;
