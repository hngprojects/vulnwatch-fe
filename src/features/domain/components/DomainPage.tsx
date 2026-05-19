"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DomainStatsCards from "./DomainStatsCards";
import DomainTable from "./DomainTable";
import AddDomainModal from "./AddDomainModal";
import { domainService } from "../services/domain.service";
import type { DomainsListValue } from "../types/domain.types";

export default function DomainPage() {
  const [data, setData] = useState<DomainsListValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    fetchDomains();
  }, [fetchDomains]);

  const domains = data?.data ?? [];
  const total = data?.totalCount ?? 0;
  const pending = domains.filter((d) => d.status === "PENDING").length;
  const verified = domains.filter((d) => d.status === "VERIFIED").length;

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

      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] flex items-center justify-center min-h-75">
          <Loader2 size={24} className="animate-spin text-[#072E28]" />
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center min-h-75 gap-3">
          <p className="text-sm text-[#6B7280]">{error}</p>
          <Button variant="outline" onClick={fetchDomains} className="text-sm">
            Retry
          </Button>
        </div>
      ) : (
        <DomainTable domains={domains} onAddDomain={() => setModalOpen(true)} />
      )}

      <AddDomainModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSuccess={fetchDomains}
      />
    </div>
  );
}
