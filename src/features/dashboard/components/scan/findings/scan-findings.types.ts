import { type LucideIcon } from 'lucide-react';
import { type FindingDto } from '../../../../scans/services/scan.service';

export type Severity = "Critical" | "High" | "Medium" | "Low" | "Pass";

export type FindingModule = 'Exposure' | 'SSL' | 'DNS';

export type FindingSummary = {
  id: string;
  severity: Severity;
  title: string;
  module: FindingModule;
};

export type FindingStat = {
  label: string;
  count: number;
  description: string;
  className: string;
  countClassName: string;
};

export type SecuritySummaryItem = {
  id: string;
  before?: string;
  emphasis: string;
  emphasisClassName: string;
  after: string;
};

export type ExposureCheck = {
  path: string;
  status: string;
  note?: string;
  severity: Severity;
};

export type ExposureFinding = {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  icon: LucideIcon;
  isOpen: boolean;
  checks?: ExposureCheck[];
};

export const mapFindingDtoToSummary = (finding: FindingDto, defaultModule: FindingModule = "Exposure"): FindingSummary => {
  let findingModule: FindingModule = defaultModule;
  const surface = finding.surface.toLowerCase();
  if (surface === "dns") findingModule = "DNS";
  if (surface === "ssl") findingModule = "SSL";
  
  let severity: Severity = "Medium";
  const sev = finding.severity.toLowerCase();
  if (sev === "critical") severity = "Critical";
  else if (sev === "high") severity = "High";
  else if (sev === "medium") severity = "Medium";
  else if (sev === "low") severity = "Low";

  return {
    id: finding.id,
    severity,
    title: finding.title,
    module: findingModule,
  };
};
