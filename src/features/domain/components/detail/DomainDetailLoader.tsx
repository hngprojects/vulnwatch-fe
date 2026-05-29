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

  useEffect(() => {
    if (!domainId) {
      queueMicrotask(() => {
        setLoading(false);
        setError("Domain ID is missing.");
      });
      return;
    }
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

        if (!domainRes.data.isSuccess || !domainRes.data.value) {
          throw new Error(
            domainRes.data.error?.message ?? "Failed to load domain monitoring data.",
          );
        }

        if (!settingsRes.data.isSuccess || !settingsRes.data.value) {
          throw new Error(
            settingsRes.data.error?.message ?? "Failed to load monitoring settings.",
          );
        }

        if (active) {
          setData(
            mapToDomainDetailData(baseDomain, domainRes.data.value, settingsRes.data.value),
          );
        }
      } catch (err: unknown) {
        if (active) {
          const msg =
            err instanceof Error ? err.message : "Failed to load domain details.";
          setError(msg);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [domainId]);

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-2">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
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
            <h3 className="text-lg font-semibold text-gray-900 font-geist">
              Failed to load domain
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {error ?? "This domain could not be found."}
            </p>
          </div>
          <Button
            asChild
            className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11"
          >
            <Link href="/domain">Back to Domains</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <DomainDetailPage data={data} domainId={domainId} />;
}
