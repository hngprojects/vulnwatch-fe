"use client";

import { X } from "lucide-react";

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M7.5 1.5C7.5 1.5 6.5 5.5 4 7C1.5 8.5 1.5 8.5 1.5 8.5C1.5 8.5 5.5 9.5 7 12C8.5 14.5 8.5 14.5 8.5 14.5C8.5 14.5 9.5 10.5 12 9C14.5 7.5 14.5 7.5 14.5 7.5C14.5 7.5 10.5 6.5 9 4C7.5 1.5 7.5 1.5 7.5 1.5Z"
      fill="#072E28"
    />
  </svg>
);

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-primary rounded-t-none sm:rounded-t-3xl shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-brand-light-green rounded-[4px] shrink-0">
          <SparkleIcon />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-geist font-medium text-base leading-none text-white">
            VulnWatch AI
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
            <span className="font-geist font-normal text-sm leading-none text-brand-sidebar-bg">
              Online
            </span>
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-white hover:opacity-70 transition-opacity"
        aria-label="Close chat"
      >
        <X size={24} strokeWidth={1.5} />
      </button>
    </div>
  );
}
