"use client";

import { useCallback, useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DomainStatsCards from "./DomainStatsCards";
import DomainTable from "./DomainTable";
import AddDomainModal from "./AddDomainModal";
import { domainService } from "../services/domain.service";
import type { DomainsListValue } from "../types/domain.types";
import { useSearchParams } from "next/navigation";

export default function DomainPage() {
  const [data, setData] = useState<DomainsListValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams && searchParams.get("add") === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModalOpen(true);
    }
  }, [searchParams]);

  const fetchDomains = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await domainService.getDomains();
      setData(result);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 401) {
        setError("Session expired. Please log out and log back in.");
      } else {
        setError("Failed to load domains. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDomains();
  }, [fetchDomains]);

  const domains = data?.data ?? [];
  const total = data?.totalCount ?? 0;
  const pending = domains.filter((d) => d.status === "Pending").length;
  const verified = domains.filter((d) => d.status === "Verified").length;

  return (
    <div className="px-4 md:px-6 py-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Domain</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Manage and verify your monitor domains
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#072E28] text-white hover:bg-[#072E28]/90 rounded-lg h-10 px-4"
        >
          <PlusCircle size={16} className="mr-2" />
          Add domain
        </Button>
      </div>

      <DomainStatsCards total={total} pending={pending} verified={verified} />

      {/* DomainTable always renders — loading/error handled inside */}
      <DomainTable
        domains={domains}
        loading={loading}
        error={error}
        onAddDomain={() => setModalOpen(true)}
        onRetry={fetchDomains}
      />

      <AddDomainModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSuccess={fetchDomains}
      />
    </div>
  );
}
