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

  const handleScan = () => {
    if (!url.trim()) {
      setError("Please enter a website URL");
      return;
    }
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
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
          className="flex cursor-pointer items-center justify-center
            w-[83px] h-[46px] rounded bg-primary px-[10px] py-[13px]
            transition-opacity hover:opacity-90 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-white"
          aria-label={HERO_ARIA.scanButton}
        >
          <span className="font-inter text-base leading-5 font-semibold text-white">
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