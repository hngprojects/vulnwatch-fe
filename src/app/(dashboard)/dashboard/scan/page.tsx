'use client';

import { useState } from 'react';
import { ScanLine } from 'lucide-react';
import { DomainSelector } from '@/features/dashboard/components/DomainSelector';
import { WhatToFixFirst } from '@/features/dashboard/components/WhatToFixFirst';
import { SecurityPosture } from '@/features/dashboard/components/SecurityPosture';
import { AISecurityAssistant } from '@/features/dashboard/components/AISecurityAssistant';
import { RecentScans } from '@/features/dashboard/components/RecentScans';
import { mockDashboardData } from '@/features/dashboard/constants/mock-data';

export default function ScanDashboardPage() {
  const [selectedDomain, setSelectedDomain] = useState(mockDashboardData.domain);

  return (
    <div className="px-4 md:px-6 py-6 space-y-5">

      {/* Page header */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-geist font-semibold text-[32px] leading-[24px] tracking-[0.5%] text-[#2B2B2B]">
              Dashboard
            </h1>
            <p className="font-geist font-normal text-[16px] leading-[16px] tracking-[2%] text-[#5C5C5C] mt-2">
              Overview of your security posture
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 h-10 px-4 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shrink-0 font-geist"
          >
            <ScanLine className="h-4 w-4" />
            <span className="hidden sm:inline">Run new scan</span>
          </button>
        </div>

        {/* Domain selector — always full width */}
        <div className="flex w-full">
          <DomainSelector
            selected={selectedDomain}
            onChange={setSelectedDomain}
          />
        </div>
      </div>

      {/* Row 1: What to fix first + Security Posture */}
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
