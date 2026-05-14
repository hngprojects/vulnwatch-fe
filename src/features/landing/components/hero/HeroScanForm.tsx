"use client";

import {
  HERO_SCAN_BUTTON_TEXT,
  HERO_SCAN_ACTION_TEXT,
  HERO_ARIA,
} from "../../constants/hero-content";

function ScanIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M21.375 3.75V7.5C21.375 7.79837 21.2565 8.08452 21.0455 8.2955C20.8345 8.50647 20.5484 8.625 20.25 8.625C19.9516 8.625 19.6655 8.50647 19.4545 8.2955C19.2435 8.08452 19.125 7.79837 19.125 7V3.75C19.125 3.09665 19.5966 2.625 20.25 2.625H21.375C22.0284 2.625 22.5 3.09665 22.5 3.75Z"
        fill="#072E28"
      />
    </svg>
  );
}

function MobileScanButton() {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      style={{
        width: "211px",
        height: "48px",
        paddingTop: "14px",
        paddingBottom: "14px",
        paddingLeft: "20px",
        paddingRight: "20px",
        borderRadius: "12px",
        backgroundColor: "#072E28",
      }}
      aria-label={HERO_ARIA.scanButton}
    >
      <span
        className="font-inter leading-[20px] font-semibold"
        style={{ fontSize: "16px", color: "#F9F9F9" }}
      >
        Scan my website
      </span>
      <span style={{ color: "#F9F9F9", fontSize: "18px" }}>→</span>
    </button>
  );
}

function DesktopScanForm() {
  return (
    <div
      className="flex items-center gap-4 rounded-xl"
      style={{
        width: "274px",
        height: "62px",
        padding: "8px",
        backgroundColor: "#A0E870",
      }}
      role="group"
      aria-label={HERO_ARIA.scanForm}
    >
      <div className="flex flex-1 items-center gap-2 pl-1">
        <span aria-label={HERO_ARIA.scanIcon}>
          <ScanIcon />
        </span>
        <span
          className="font-geist leading-[20px] font-normal"
          style={{
            fontSize: "15px",
            color: "rgba(65, 65, 65, 0.95)",
            whiteSpace: "nowrap",
          }}
        >
          {HERO_SCAN_BUTTON_TEXT}
        </span>
      </div>

      <button
        type="button"
        className="flex cursor-pointer items-center justify-center rounded transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{
          width: "83px",
          height: "46px",
          paddingTop: "13px",
          paddingBottom: "13px",
          paddingLeft: "10px",
          paddingRight: "10px",
          backgroundColor: "#072E28",
          borderRadius: "4px",
        }}
        aria-label={HERO_ARIA.scanButton}
      >
        <span
          className="font-inter leading-[20px] font-semibold text-white"
          style={{ fontSize: "16px" }}
        >
          {HERO_SCAN_ACTION_TEXT}
        </span>
      </button>
    </div>
  );
}

export function HeroScanForm() {
  return (
    <>
      <div className="flex justify-center md:hidden">
        <MobileScanButton />
      </div>
      <div className="hidden md:flex md:justify-center">
        <DesktopScanForm />
      </div>
    </>
  );
}
