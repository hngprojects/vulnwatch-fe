"use client";

import { useScanFindings } from "./ScanFindingsContext";
import { AllFindingsTab } from "./findings/AllFindingsTab";
import { ExposureTab } from "./findings/exposure/ExposureTab";
import { SslTab } from "./findings/ssl/SslTab";
import { DnsTab } from "./findings/dns/DnsTab";
import { FindingTabId } from "./findings/FindingsTabs";

export function ScanFindingsTabWrapper({ tab }: { tab: FindingTabId }) {
  const { report } = useScanFindings();

  if (!report) return null;

  switch (tab) {
    case "all":
      return <AllFindingsTab report={report} />;
    case "exposure":
      return <ExposureTab report={report} />;
    case "ssl":
      return <SslTab report={report} />;
    case "dns":
      return <DnsTab report={report} />;
    default:
      return null;
  }
}
