'use client';

import { CheckCircle, TriangleAlert } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type ActivityEventType = 'success' | 'error' | 'warning';

export interface ActivityItem {
  id: string;
  title: string;
  timeAgo: string;
  type: ActivityEventType;
}

// ── Dot indicator ─────────────────────────────────────────────────────────────

function DotIndicator({ type }: { type: ActivityEventType }) {
  const colorMap: Record<ActivityEventType, string> = {
    success: '#1DAF61',
    error: '#D00416',
    warning: '#DD6414',
  };
  return (
    <div
      className="shrink-0 rounded-full mt-1 flex-shrink-0"
      style={{
        width: '8px',
        height: '8px',
        background: colorMap[type],
      }}
    />
  );
}

// ── Right icon ────────────────────────────────────────────────────────────────

function RightIcon({ type }: { type: ActivityEventType }) {
  if (type === 'error' || type === 'warning') {
    return (
      <TriangleAlert
        size={20}
        strokeWidth={1.8}
        className="shrink-0"
        style={{ color: '#D00416' }}
      />
    );
  }
  return (
    <CheckCircle
      size={20}
      strokeWidth={1.8}
      className="shrink-0"
      style={{ color: '#1DAF61' }}
    />
  );
}

// ── Single activity row ────────────────────────────────────────────────────────

function ActivityRow({ item }: { item: ActivityItem }) {
  return (
    <div className="flex flex-row justify-between items-center py-4 border-b border-[#F6F6F6] last:border-0">
      {/* Left: dot + title + time */}
      <div className="flex flex-row items-start gap-3">
        <DotIndicator type={item.type} />
        <div className="flex flex-col gap-2">
          <span
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '16px',
              color: '#2B2B2B',
            }}
          >
            {item.title}
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
            {item.timeAgo}
          </span>
        </div>
      </div>

      {/* Right: status icon */}
      <RightIcon type={item.type} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export function RecentActivity({ activities = [] }: RecentActivityProps) {
  return (
    <div
      className="flex flex-col gap-4 w-full"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EDEDED',
        borderRadius: '12px',
        padding: '24px',
      }}
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-center mb-2">
        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '24px',
            color: '#2B2B2B',
          }}
        >
          Recent Activity
        </span>
      </div>

      {/* Activity list */}
      {activities.length > 0 ? (
        <div className="flex flex-col">
          {activities.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-8 text-[#666666]">
          No recent activity found.
        </div>
      )}
    </div>
  );
}
