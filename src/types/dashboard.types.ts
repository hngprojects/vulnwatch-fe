export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type ScanType = "Quick Scan" | "Full Scan";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type ScanStatus = "Complete" | "In Progress" | "Failed";

export interface Scan {
  id: string;
  date: string;
  scanType: ScanType;
  riskLevel: RiskLevel;
  status: ScanStatus;
}

export interface SecurityIssue {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: string;
}

export interface AIAction {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: string;
}

export interface DashboardData {
  domain: string;
  securityScore: number;
  primaryAlert: SecurityIssue;
  issues: SecurityIssue[];
  aiActions: AIAction[];
  recentScans: Scan[];
  hasScans: boolean;
}

