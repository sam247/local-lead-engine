"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type SelectedIssueContextValue = {
  selectedIssue: string | null;
  setSelectedIssue: (slug: string | null) => void;
};

const SelectedIssueContext = createContext<SelectedIssueContextValue | null>(null);

export function SelectedIssueProvider({ children }: { children: ReactNode }) {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setSelectedIssue(null);
    }
  }, [pathname]);

  const value = useMemo(
    () => ({ selectedIssue, setSelectedIssue }),
    [selectedIssue]
  );

  return (
    <SelectedIssueContext.Provider value={value}>
      {children}
    </SelectedIssueContext.Provider>
  );
}

export function useSelectedIssue(): SelectedIssueContextValue {
  const ctx = useContext(SelectedIssueContext);
  if (!ctx) {
    throw new Error("useSelectedIssue must be used within SelectedIssueProvider");
  }
  return ctx;
}
