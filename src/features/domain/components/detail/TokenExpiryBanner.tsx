"use client";

import { AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";

interface TokenExpiryBannerProps {
  onDismiss: () => void;
  onRenewToken?: () => void;
}

export function TokenExpiryBanner({ onDismiss, onRenewToken }: TokenExpiryBannerProps) {
  return (
    <div
      className="flex items-start justify-between gap-4 rounded-xl border px-5 py-4 bg-brand-pending-bg border-orange-200"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg bg-orange-100"
        >
          <AlertTriangle className="h-4 w-4 text-brand-pending-text" />
        </div>

        {/* Text */}
        <div>
          <p
            className="text-sm font-semibold font-geist text-brand-pending-text"
          >
            Ownership Token Expiring Soon
          </p>
          <p
            className="text-xs mt-0.5 leading-snug text-orange-800"
          >
            Your domain verification token is close to expiry. Renew it now to
            maintain continuous monitoring coverage and avoid interruptions.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors bg-brand-pending-text border-brand-pending-text text-white hover:opacity-90"
          onClick={() => {
            console.log("analytics.track('token_renewal_initiated')");
            toast.info("Token renewal flow initiated.");
            onRenewToken?.();
          }}
        >
          Renew Token
        </button>

        <button
          type="button"
          onClick={onDismiss}
          className="p-1.5 rounded-lg transition-colors hover:bg-orange-200 text-brand-pending-text"
          aria-label="Dismiss token expiry warning"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
