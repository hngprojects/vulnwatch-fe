'use client';

import { TriangleAlert } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type AlertType = 'SSL' | 'Security' | 'DNS' | string;

export interface DashboardAlertItem {
  id: string;
  type: AlertType;
  timeAgo: string;
  title: string;
  domain: string;
}

// ── Placeholder data ──────────────────────────────────────────────────────────

const PLACEHOLDER_ALERTS: DashboardAlertItem[] = [
  {
    id: '1',
    type: 'SSL',
    timeAgo: '2 hours ago',
    title: 'SSL certificate expiring in 15 days',
    domain: 'app.example.com',
  },
  {
    id: '2',
    type: 'Security',
    timeAgo: '5 hours ago',
    title: 'New vulnerability detected',
    domain: 'example.com',
  },
  {
    id: '3',
    type: 'DNS',
    timeAgo: '1 day ago',
    title: 'DNS configuration changed',
    domain: 'api.example.com',
  },
];

// ── Single alert row ──────────────────────────────────────────────────────────

function AlertRow({ alert }: { alert: DashboardAlertItem }) {
  return (
    <div
      className="flex flex-row items-start gap-4"
      style={{
        background: '#F6F6F6',
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
              border: '1px solid #EDEDED',
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
  alerts = PLACEHOLDER_ALERTS,
  onViewAll,
}: DashboardRecentAlertsProps) {
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
      <div className="flex flex-col gap-4">
        {alerts.map((alert) => (
          <AlertRow key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
