"use client";

import { createContext, useContext } from "react";
import { ScanReport } from "@/features/scans/services/scan.service";

interface ScanFindingsContextValue {
  report: ScanReport | null;
  loading: boolean;
  error: string | null;
  scanId: string | null;
}

export const ScanFindingsContext = createContext<ScanFindingsContextValue | undefined>(undefined);

export function useScanFindings() {
  const context = useContext(ScanFindingsContext);
  if (context === undefined) {
    throw new Error("useScanFindings must be used within a ScanFindingsProvider");
  }
  return context;
}
