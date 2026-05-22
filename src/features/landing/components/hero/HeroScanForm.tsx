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
      className="flex items-center justify-center gap-3 w-[260px] h-[62px]
        rounded-2xl bg-secondary transition-opacity hover:opacity-90
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary px-6"
      aria-label={HERO_ARIA.scanButton}
    >
      <Image
        src="/icons/icon-scan.svg"
        alt="Scan icon"
        width={24}
        height={24}
        aria-hidden="true"
      />
      <span className="font-inter text-base leading-5 font-semibold text-primary">
        Scan my Website
      </span>
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
          className={`flex items-center justify-center rounded bg-primary w-[83px] h-[46px] px-[10px] py-[13px] transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            isValid
              ? "opacity-100 scale-100 blur-0 cursor-pointer pointer-events-auto"
              : "opacity-50 scale-100 blur-[1px] pointer-events-none cursor-not-allowed"
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