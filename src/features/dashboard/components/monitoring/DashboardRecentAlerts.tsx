'use client';

import { TriangleAlert } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type AlertType = 'SSL' | 'Security' | 'DNS';

export function isValidAlertType(type: string): type is AlertType {
  return ['SSL', 'Security', 'DNS'].includes(type);
}

export interface DashboardAlertItem {
  id: string;
  type: AlertType;
  timeAgo: string;
  title: string;
  domain: string;
}

// ── Single alert row ──────────────────────────────────────────────────────────

function AlertRow({ alert }: { alert: DashboardAlertItem }) {
  return (
    <div
      className="flex flex-row items-start gap-4 shadow-md hover:shadow-lg"
      style={{
        background: '#fff',
        border: "1px solid #ededed",
        borderRadius: '8px',
        padding: '16px 24px',
      }}
    >
      {/* Alert icon */}
      <div className="flex items-center justify-center shrink-0 mt-0.5">
        <TriangleAlert size={20} strokeWidth={1.8} style={{ color: '#072E28' }} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        {/* Type badge + time */}
        <div className="flex flex-row items-center gap-2">
          <span
            className="flex items-center justify-center"
            style={{
              padding: '4px 12px',
              border: '1px solid #b8b7b7ff',
              borderRadius: '8px',
              fontFamily: 'Geist, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#2B2B2B',
              whiteSpace: 'nowrap',
            }}
          >
            {alert.type}
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
            {alert.timeAgo}
          </span>
        </div>

        {/* Title */}
        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '16px',
            color: '#2B2B2B',
          }}
        >
          {alert.title}
        </span>

        {/* Domain */}
        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '14px',
            color: '#666666',
          }}
        >
          {alert.domain}
        </span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface DashboardRecentAlertsProps {
  alerts?: DashboardAlertItem[];
  onViewAll?: () => void;
}

export function DashboardRecentAlerts({
  alerts = [],
  onViewAll,
}: DashboardRecentAlertsProps) {
  return (
    <div
      className="flex flex-col gap-6 h-full"
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
          Recent Alerts
        </span>
        <button
          type="button"
          onClick={onViewAll}
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '16px',
            color: '#072E28',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 12px',
          }}
          className="hover:opacity-70 transition-opacity"
        >
          View All
        </button>
      </div>

      {/* Alert rows */}
      {alerts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {alerts.map((alert) => (
            <AlertRow key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-8 text-[#666666]">
          No recent alerts found.
        </div>
      )}
    </div>
  );
}
