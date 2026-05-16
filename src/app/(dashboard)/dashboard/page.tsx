"use client";

import { useState } from "react";
import { ScanLine } from "lucide-react";
import { EmptyDashboard } from "@/features/dashboard/components/EmptyDashboard";
import { DomainSelector } from "@/features/dashboard/components/DomainSelector";
import { WhatToFixFirst } from "@/features/dashboard/components/WhatToFixFirst";
import { SecurityPosture } from "@/features/dashboard/components/SecurityPosture";
import { AISecurityAssistant } from "@/features/dashboard/components/AISecurityAssistant";
import { RecentScans } from "@/features/dashboard/components/RecentScans";
import { mockDashboardData } from "@/features/dashboard/constants/mock-data";

// Toggle this to false to preview the empty state
const HAS_SCANS =false;

export default function DashboardPage() {
  const [selectedDomain, setSelectedDomain] = useState(
    mockDashboardData.domain
  );

  if (!HAS_SCANS) {
    return (
      <div className="px-4 md:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#111827]">Your dashboard</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Your security overview will be displayed here
          </p>
        </div>
        <EmptyDashboard />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-6 space-y-5 max-w-[1280px] mx-auto">
      {/* Page header */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Dashboard</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              Overview of your security posture
            </p>
          </div>
          <button
            type="button"
            className="hidden md:inline-flex items-center gap-2 h-10 px-4 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shrink-0"
          >
            <ScanLine className="h-4 w-4" />
            <span className="hidden sm:inline">Run New Scan</span>
          </button>
        </div>
        
        <div className="flex">
          <DomainSelector
            selected={selectedDomain}
            onChange={setSelectedDomain}
          />
        </div>
      </div>

      {/* Row 1: What to fix + Security Posture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WhatToFixFirst issue={mockDashboardData.primaryAlert} />
        <SecurityPosture score={mockDashboardData.securityScore} />
      </div>

      {/* Row 2: AI Security Assistant */}
      <AISecurityAssistant actions={mockDashboardData.aiActions} />

      {/* Row 3: Recent Scans */}
      <RecentScans scans={mockDashboardData.recentScans} />
    </div>
  );
}