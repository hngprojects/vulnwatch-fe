import { Globe, Lock, LucideSearch, Server, ShieldCheck } from "lucide-react";
import { ProgressItem } from "./types";

export const SCAN_PROGRESS: ProgressItem[] = [
  {
    title: "Checking DNS...",
    description: "Resolving domain records",
    status: "current",
    icon: (
      <div className="bg-scan-blue-400/10 p-2.5 rounded-full">
        <Globe className="text-scan-blue-400" strokeWidth={1.5} />
      </div>
    ),
  },
  {
    title: "Analyzing SSL....",
    description: "Validating certificate and confgiguration",
    status: "pending",
    icon: (
      <div className="bg-scan-green-400/10 p-2.5 rounded-full">
        <Lock className="text-scan-green-400" strokeWidth={1.5} />
      </div>
    ),
  },
  {
    title: "Scanning subdomains...",
    description: "Discovering subdomains and assets",
    status: "pending",
    icon: (
      <div className="bg-scan-purple-400/10 p-2.5 rounded-full">
        <LucideSearch className="text-scan-purple-400" strokeWidth={1.5} />
      </div>
    ),
  },
  {
    title: "Checking open ports...",
    description: "Identifying active services",
    status: "pending",
    icon: (
      <div className="bg-scan-yellow-400/10 p-2.5 rounded-full">
        <Server className="text-scan-yellow-900" strokeWidth={1.5} />
      </div>
    ),
  },
  {
    title: "Running security checks...",
    description: "Detecting vulnerablities and misconfigurations",
    status: "pending",
    icon: (
      <div className="bg-scan-red-400/10 p-2.5 rounded-full">
        <ShieldCheck className="text-scan-red-400" strokeWidth={1.5} />
      </div>
    ),
  },
];
