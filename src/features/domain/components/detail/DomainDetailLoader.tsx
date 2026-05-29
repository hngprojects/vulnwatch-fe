"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { privateApi } from "@/lib/axios";
import { domainService } from "@/features/domain/services/domain.service";
import { mapToDomainDetailData } from "./domain-detail.mapper";
import { DomainDetailPage } from "./DomainDetailPage";
import type { DomainDetailData } from "./domain-detail.types";
import type {
  MonitoringDomainResponse,
  MonitoringSettingsResponse,
} from "@/features/monitoring/types/monitoring.types";

export function DomainDetailLoader() {
  const params = useParams<{ id: string }>();
  const domainId = params?.id ?? "";

  const [data, setData] = useState<DomainDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Derive if it's a rate limit error
  const isRateLimitError = Boolean(
    error?.includes("429") ||
      error?.toLowerCase().includes("rate limit") ||
      error?.toLowerCase().includes("too many requests"),
  );

  const [cooldown, setCooldown] = useState(0);

  // Initialize cooldown when rate limit error appears
  useEffect(() => {
    if (error && isRateLimitError) {
      queueMicrotask(() => setCooldown(15));
    } else {
      queueMicrotask(() => setCooldown(0));
    }
  }, [error, isRateLimitError]);

  // Tick the cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (!domainId) return;
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        // 1. Fetch base domain + monitoring overview + settings in parallel
        const [baseDomain, domainRes, settingsRes] = await Promise.all([
          domainService.getDomain(domainId),
          privateApi.get<MonitoringDomainResponse>(
            `/api/monitoring/domains/${domainId}`,
          ),
          privateApi.get<MonitoringSettingsResponse>(
            `/api/monitoring/domains/${domainId}/settings`,
          ),
        ]);

        const domainValue = domainRes.data.value;
        if (!domainRes.data.isSuccess || !domainValue) {
          throw new Error(
            domainRes.data.error?.message ?? "Failed to load domain monitoring data.",
          );
        }

        const settingsValue = settingsRes.data.value;
        if (!settingsRes.data.isSuccess || !settingsValue) {
          throw new Error(
            settingsRes.data.error?.message ?? "Failed to load monitoring settings.",
          );
        }

        if (active) {
          queueMicrotask(() => {
            setData(
              mapToDomainDetailData(baseDomain, domainValue, settingsValue),
            );
          });
        }
      } catch (err: unknown) {
        if (active) {
          const msg =
            err instanceof Error ? err.message : "Failed to load domain details.";
          queueMicrotask(() => setError(msg));
        }
      } finally {
        if (active) {
          queueMicrotask(() => setLoading(false));
        }
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [domainId, retryCount]);

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-2">
        <Loader2 className="h-7 w-7 animate-spin text-[#072E28]" />
        <p className="text-sm font-medium text-neutral-500">Loading domain details...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-5 max-w-md mx-auto mt-16">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 flex flex-col items-center text-center gap-5 shadow-sm">
          <div className="rounded-full bg-red-50 p-3.5">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#111827] font-geist">
              Failed to load domain
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {isRateLimitError
                ? "Too many requests, please wait a moment before trying again."
                : (error ?? "This domain could not be found.")}
            </p>
          </div>
          
          {isRateLimitError ? (
            <div className="w-full flex flex-col gap-2 mt-2">
              <Button
                onClick={() => setRetryCount((c) => c + 1)}
                disabled={cooldown > 0}
                className={`w-full font-semibold h-11 transition-colors ${
                  cooldown > 0 
                    ? "bg-neutral-200 text-neutral-500 cursor-not-allowed hover:bg-neutral-200 opacity-100" 
                    : "bg-[#072e28] text-white hover:bg-[#072e28]/90"
                }`}
              >
                {cooldown > 0 ? `Retry in ${cooldown}s...` : "Try Again"}
              </Button>
              <Link
                href="/domain"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                Back to Domains
              </Link>
            </div>
          ) : (
            <Button
              asChild
              className="w-full mt-2 bg-[#072e28] text-white hover:bg-[#072e28]/90 font-semibold h-11"
            >
              <Link href="/domain">Back to Domains</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return <DomainDetailPage data={data} domainId={domainId} />;
}
