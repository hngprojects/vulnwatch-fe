'use client';

import { ShieldCheck, ShieldAlert } from 'lucide-react';

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
      <div className="flex flex-row items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 shrink-0">
          {isActive ? (
            <ShieldCheck
              size={40}
              strokeWidth={1.6}
              style={{ color: '#1daf61' }}
            />
          ) : (
            <ShieldAlert
              size={40}
              strokeWidth={1.6}
              style={{ color: '#D00416' }}
            />
          )}
        </div>
        <div className="flex flex-col gap-0">
          <span
            className="text-xl"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 600,
              color: '#2B2B2B',
              lineHeight: '1.2',
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
      <div className="flex flex-col items-end gap-0">
        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '1.2',
            color: '#444444ff',
            textAlign: 'right',
          }}
        >
          Last Scan
        </span>
        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            lineHeight: '18px',
            color: '#2b2b2ba2',
            textAlign: 'right',
          }}
        >
          {lastScanText}
        </span>
      </div>
    </div>
  );
}
