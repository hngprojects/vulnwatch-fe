'use client';

import { Lock } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type SslStatus = 'Valid' | 'ExpiringSoon' | 'Expired';

export interface SslCertItem {
  domain: string;
  subtitle: string;
  status: SslStatus;
}

// ── Placeholder data ──────────────────────────────────────────────────────────

const PLACEHOLDER_ITEMS: SslCertItem[] = [
  { domain: 'example.com', subtitle: 'Valid for 180 days', status: 'Valid' },
  { domain: 'api.example.com', subtitle: 'Valid for 180 days', status: 'Valid' },
  { domain: 'app.example.com', subtitle: 'Expires in 15 days', status: 'ExpiringSoon' },
  { domain: 'staging.example.com', subtitle: 'Valid for 180 days', status: 'Valid' },
];

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SslStatus }) {
  if (status === 'Valid') {
    return (
      <span
        className="flex items-center justify-center shrink-0"
        style={{
          padding: '8px 12px',
          background: '#1DAF61',
          borderRadius: '4px',
          fontFamily: 'Geist, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '14px',
          color: '#E8F7EF',
          whiteSpace: 'nowrap',
        }}
      >
        Valid
      </span>
    );
  }
  if (status === 'ExpiringSoon') {
    return (
      <span
        className="flex items-center justify-center shrink-0"
        style={{
          padding: '8px 12px',
          background: '#D00416',
          borderRadius: '4px',
          fontFamily: 'Geist, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '14px',
          color: '#FDEBEC',
          whiteSpace: 'nowrap',
        }}
      >
        Expiring Soon
      </span>
    );
  }
  // Expired
  return (
    <span
      className="flex items-center justify-center shrink-0"
      style={{
        padding: '8px 12px',
        background: '#2B2B2B',
        borderRadius: '4px',
        fontFamily: 'Geist, sans-serif',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '14px',
        color: '#FFFFFF',
        whiteSpace: 'nowrap',
      }}
    >
      Expired
    </span>
  );
}

// ── Single row ────────────────────────────────────────────────────────────────

function SslRow({ item }: { item: SslCertItem }) {
  return (
    <div
      className="flex flex-row justify-between items-center"
      style={{
        background: '#F6F6F6',
        borderRadius: '8px',
        padding: '16px 24px',
      }}
    >
      {/* Left: lock + domain + subtitle */}
      <div className="flex flex-row items-center gap-4">
        <Lock size={24} strokeWidth={1.6} className="shrink-0" style={{ color: '#666666' }} />
        <div className="flex flex-col gap-4">
          <span
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '16px',
              color: '#2B2B2B',
            }}
          >
            {item.domain}
          </span>
          <span
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#666666',
            }}
          >
            {item.subtitle}
          </span>
        </div>
      </div>

      {/* Right: status badge */}
      <StatusBadge status={item.status} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface SslCertificatesListProps {
  items?: SslCertItem[];
  totalCount?: number;
}

export function SslCertificatesList({
  items = PLACEHOLDER_ITEMS,
  totalCount,
}: SslCertificatesListProps) {
  const count = totalCount ?? items.length;

  return (
    <div
      className="flex flex-col gap-6"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EDEDED',
        borderRadius: '12px',
        padding: '24px',
        flex: 1,
      }}
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '24px',
            color: '#2B2B2B',
          }}
        >
          SSL Certificates
        </span>
        <span
          className="flex items-center justify-center"
          style={{
            padding: '8px 12px',
            background: '#FFFFFF',
            border: '1px solid #EDEDED',
            borderRadius: '8px',
            fontFamily: 'Geist, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '16px',
            color: '#2B2B2B',
          }}
        >
          {count} Total
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <SslRow key={item.domain} item={item} />
        ))}
      </div>
    </div>
  );
}
