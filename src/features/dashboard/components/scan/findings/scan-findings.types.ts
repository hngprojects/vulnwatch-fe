import { type LucideIcon } from 'lucide-react';

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
