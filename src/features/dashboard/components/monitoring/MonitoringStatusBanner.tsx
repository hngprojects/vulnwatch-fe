'use client';

import { ShieldAlert } from 'lucide-react';

interface MonitoringStatusBannerProps {
  isActive?: boolean;
  statusText?: string;
  lastScanText?: string;
}

export function MonitoringStatusBanner({
  isActive = true,
  statusText = 'All system operational',
  lastScanText = '2 minutes ago',
}: MonitoringStatusBannerProps) {
  return (
    <div
      className="w-full flex flex-row justify-between items-center px-6 py-5 rounded-xl"
      style={{
        background: '#FFFFFF',
        border: '1px solid #072E28',
        borderRadius: '12px',
      }}
    >
      {/* Left: icon + status */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 shrink-0">
          <ShieldAlert
            size={40}
            strokeWidth={1.6}
            style={{ color: '#2B2B2B' }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span
            className="text-xl"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 600,
              color: '#2B2B2B',
            }}
          >
            {isActive ? 'Monitoring Active' : 'Monitoring Inactive'}
          </span>
          <span
            className="text-sm"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 400,
              color: '#666666',
            }}
          >
            {statusText}
          </span>
        </div>
      </div>

      {/* Right: Last scan info */}
      <div className="flex flex-col items-end gap-1">
        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '16px',
            color: '#666666',
            textAlign: 'right',
          }}
        >
          Last Scan
        </span>
        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '18px',
            color: '#2B2B2B',
            textAlign: 'right',
          }}
        >
          {lastScanText}
        </span>
      </div>
    </div>
  );
}
