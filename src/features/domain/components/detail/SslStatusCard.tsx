"use client";

import { Lock } from "lucide-react";

interface SslStatusCardProps {
  isValid: boolean;
  expiresInDays: number | null;
}

export function SslStatusCard({ isValid, expiresInDays }: SslStatusCardProps) {
  const expiryText =
    expiresInDays === null
      ? "Unknown"
      : expiresInDays <= 0
      ? "Expired"
      : `Expires in ${expiresInDays} days`;

  const statusColor = isValid
    ? { icon: "text-green-600", bg: "bg-green-100", label: "text-green-700", labelText: "Valid" }
    : { icon: "text-red-600", bg: "bg-red-100", label: "text-red-700", labelText: "Invalid" };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="h-4 w-4 text-slate-400" />
        <h3 className="font-semibold text-slate-900 text-sm font-geist">SSL Status</h3>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${statusColor.bg}`}>
            <Lock className={`h-6 w-6 ${statusColor.icon}`} />
          </div>
          <div>
            <p className={`font-bold text-lg font-geist ${statusColor.label}`}>
              {statusColor.labelText}
            </p>
            <p className="text-xs text-slate-500">Certificate active</p>
          </div>
        </div>

        <div className="bg-brand-bg border border-gray-200 rounded-lg px-4 py-3">
          <p className="text-xs text-slate-500 mb-0.5">Expiry</p>
          <p className="text-sm font-semibold text-slate-900 font-geist">{expiryText}</p>
        </div>
      </div>
    </div>
  );
}
