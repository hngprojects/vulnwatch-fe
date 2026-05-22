"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  HERO_SCAN_BUTTON_TEXT,
  HERO_SCAN_ACTION_TEXT,
  HERO_ARIA,
} from "../../constants/hero-content";
import { ROUTES } from "@/constants/routes";

import { z } from "zod";

const domainSchema = z.string().refine((val) => {
  const raw = val.trim();
  if (!raw) return false;
  try {
    const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const urlObj = new URL(normalized);
    const host = urlObj.hostname;
    return host.includes(".") && !host.startsWith(".") && !host.endsWith(".") && host.split(".").pop()!.length >= 2;
  } catch {
    return false;
  }
});

function MobileScanButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(ROUTES.REGISTER)}
      className="flex items-center justify-center gap-2 w-[211px] h-12
        rounded-xl bg-primary transition-opacity hover:opacity-90
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      aria-label={HERO_ARIA.scanButton}
    >
      <span className="font-inter text-base leading-5 font-semibold text-white">
        Scan my website
      </span>
      <span className="text-white text-lg">→</span>
    </button>
  );
}

function DesktopScanForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const isValid = domainSchema.safeParse(url).success;

  const handleScan = () => {
    const raw = url.trim();
    if (!raw) {
      setError("Please enter a website URL");
      return;
    }
    const result = domainSchema.safeParse(raw);
    if (!result.success) {
      setError("Please enter a valid URL e.g. example.com");
      return;
    }

    try {
      const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
      const urlObj = new URL(normalized);
      const hostname = urlObj.hostname;
      localStorage.setItem("pending_scan_domain", hostname);
      setError("");
      router.push(ROUTES.REGISTER);
    } catch {
      setError("Please enter a valid URL e.g. example.com");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex items-center gap-4 rounded-xl bg-secondary p-2 w-[274px] h-[62px]"
        role="group"
        aria-label={HERO_ARIA.scanForm}
      >
        <div className="flex flex-1 items-center gap-2 pl-1">
          <Image
            src="/icons/icon-scan.svg"
            alt="Scan icon"
            width={24}
            height={24}
            aria-hidden="true"
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={HERO_SCAN_BUTTON_TEXT}
            className="font-geist w-full bg-transparent text-[15px]
              leading-5 font-normal text-foreground
              placeholder:text-foreground focus:outline-none"
            aria-label="Enter your website URL"
          />
        </div>

        <button
          type="button"
          onClick={handleScan}
          className={`flex items-center justify-center rounded bg-primary transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            isValid
              ? "w-[83px] h-[46px] opacity-100 scale-100 blur-0 cursor-pointer px-[10px] py-[13px]"
              : "w-0 h-[46px] opacity-0 scale-90 blur-sm pointer-events-none overflow-hidden p-0"
          }`}
          aria-label={HERO_ARIA.scanButton}
        >
          <span className="font-inter text-base leading-5 font-semibold text-white truncate">
            {HERO_SCAN_ACTION_TEXT}
          </span>
        </button>
      </div>

      {error && (
        <p className="text-error mt-1 text-xs">{error}</p>
      )}
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