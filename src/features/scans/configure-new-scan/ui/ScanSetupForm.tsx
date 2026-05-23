"use client";

import { Button } from "@/components/ui/button";
import { Lock, Loader2, ShieldCheck, ChevronDown, Search, Check, Plus, AlertCircle, RefreshCw } from "lucide-react";
import InputField from "../../shared/ui/InputField";
import { WHAT_HAPPENS_NEXT } from "../lib/constants";
import { useForm, useWatch } from "react-hook-form";
import { configureScanSchema, ConfigureScanSchemaType } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { scanService } from "@/features/scans/services/scan.service";
import { useState, useEffect, useRef } from "react";
import { domainService } from "@/features/domain/services/domain.service";
import type { Domain } from "@/features/domain/types/domain.types";
import Link from "next/link";

export default function ScanSetupForm() {
  "use no memo";
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ConfigureScanSchemaType>({
    defaultValues: {
      domain: "",
      scanType: "QUICK_SCAN",
      emailNotification: true,
    },
    resolver: zodResolver(configureScanSchema),
  });
  const router = useRouter();

  const emailNotification = useWatch({
    control,
    name: "emailNotification",
  });
  
  const selectedDomain = useWatch({
    control,
    name: "domain",
  });

  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoadingDomains, setIsLoadingDomains] = useState(true);
  const [domainFetchError, setDomainFetchError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    async function fetchDomains() {
      try {
        setIsLoadingDomains(true);
        setDomainFetchError(null);
        const listValue = await domainService.getDomains();
        if (active) {
          // Filter to only verified domains
          const verified = listValue.data.filter((d) => d.status === "Verified");
          setDomains(verified);
        }
      } catch (err: unknown) {
        if (active) {
          const msg = err instanceof Error ? err.message : "Failed to load domains";
          setDomainFetchError(msg);
        }
      } finally {
        if (active) {
          setIsLoadingDomains(false);
        }
      }
    }
    fetchDomains();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectDomain = (domainName: string) => {
    setValue("domain", domainName, { shouldValidate: true });
    setIsOpen(false);
  };

  const filteredDomains = domains.filter((d) =>
    d.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = async (data: ConfigureScanSchemaType) => {
    try {
      // We always use QUICK_SCAN for the payload behind the scenes
      const response = await scanService.createScan({
        domain: data.domain,
        scanType: "QUICK_SCAN",
      });

      if (response.isSuccess && response.value) {
        // Show a toast only if a scan was already running
        if (
          response.value.message === "A scan is already in progress for this domain." ||
          response.value.message === "Scan already initiated."
        ) {
          toast.info(response.value.message);
        }
        
        const { scanId, initiatedAt } = response.value;
        // Fallback to current time if backend has not deployed initiatedAt field yet
        const activeInitiatedAt = initiatedAt || new Date().toISOString();

        const encodedScanId = encodeURIComponent(scanId);
        const encodedDomain = encodeURIComponent(data.domain);
        const encodedInitiatedAt = encodeURIComponent(activeInitiatedAt);

        router.push(
          `/scan/progress?scanId=${encodedScanId}&domain=${encodedDomain}&initiatedAt=${encodedInitiatedAt}`
        );
      } else {
        toast.error(response.error?.message || "Failed to start scan. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "Invalid domain name") {
        toast.error("Please enter a valid domain name.");
      } else {
        const axiosError = err as { response?: { data?: { error?: { message?: string } } } };
        const backendMessage = axiosError.response?.data?.error?.message;
        toast.error(backendMessage || "An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Header row: title + button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Scan Your Website</h1>
          <p className="text-[#6B7280] text-sm mt-1">
            Run a safe non-intrusive security scan to find misconfigurations and potential risk
          </p>
        </div>
        {selectedDomain && (
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              asChild
              className="border-[1.5px] border-[#072E28] text-[#072E28] hover:bg-[#072E28]/5 h-12 px-6 font-semibold rounded-lg flex items-center justify-center transition-colors"
            >
              <Link href={`/scan/history?domainId=${domains.find(d => d.domain === selectedDomain)?.id}&domainName=${encodeURIComponent(selectedDomain)}`}>
                View Scan History
              </Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#072E28] rounded-lg px-8 h-12 font-semibold text-white text-base cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Starting...
                </span>
              ) : (
                "Start Scan"
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Domain input (Searchable Select Dropdown) */}
      <div className="space-y-1 relative" ref={dropdownRef}>
        <div className="flex justify-between items-center">
          <p className="font-medium text-[#111827] text-sm">Select Domain</p>
          {isLoadingDomains && (
            <span className="flex items-center gap-1 text-xs text-[#6B7280]">
              <Loader2 className="h-3 w-3 animate-spin" />
              Loading verified domains...
            </span>
          )}
        </div>
        
        {/* Hidden input for React Hook Form integration */}
        <input type="hidden" {...register("domain")} />

        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => {
            if (!isLoadingDomains && !domainFetchError) {
              setIsOpen(!isOpen);
            }
          }}
          disabled={isLoadingDomains || !!domainFetchError || isSubmitting}
          className={`flex h-12 w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-neutral-900/10 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${
            errors.domain ? "border-red-500" : "border-neutral-300 hover:border-neutral-400"
          }`}
        >
          {selectedDomain ? (
            <span className="font-medium text-neutral-900">{selectedDomain}</span>
          ) : (
            <span className="text-neutral-400">
              {isLoadingDomains ? "Loading domains..." : "Choose a verified domain..."}
            </span>
          )}
          <ChevronDown
            className={`h-5 w-5 text-neutral-500 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 mt-1.5 w-full flex flex-col rounded-lg border border-neutral-200 bg-white shadow-xl focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100 overflow-hidden">
            {/* Search Bar */}
            <div className="relative border-b border-neutral-100 p-2 bg-neutral-50/50">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search verified domains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-neutral-200 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-[#072E28] focus:ring-1 focus:ring-[#072E28]"
                onClick={(e) => e.stopPropagation()} // Prevent closing dropdown on search bar click
              />
            </div>

            {/* List area */}
            <div className="max-h-48 overflow-y-auto py-1">
              {domains.length === 0 ? (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm font-medium text-neutral-700">No verified domains found</p>
                  <p className="text-xs text-neutral-500 mt-1 max-w-[280px] mx-auto">
                    You need a verified domain to run security scans.
                  </p>
                  <Link
                    href="/domain"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#072E28] hover:text-[#0b473e] mt-3 hover:underline"
                  >
                    <Plus size={14} /> Add & verify a domain
                  </Link>
                </div>
              ) : filteredDomains.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-neutral-500">
                  No verified domains matching &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredDomains.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleSelectDomain(d.domain)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-neutral-50 transition-colors cursor-pointer group"
                  >
                    <span className="font-medium text-neutral-900 group-hover:text-neutral-950">
                      {d.domain}
                    </span>
                    {selectedDomain === d.domain && (
                      <Check className="h-4 w-4 text-[#072E28] stroke-[2.5px]" />
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            {domains.length > 0 && (
              <div className="border-t border-neutral-100 p-2 bg-neutral-50 flex items-center justify-center">
                <Link
                  href="/domain"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#072E28] hover:text-[#0b473e] transition-colors"
                >
                  <Plus size={14} />
                  Manage or verify domains
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Helper text or Errors */}
        {errors.domain ? (
          <p className="text-xs text-red-500 font-medium mt-1">{errors.domain.message}</p>
        ) : selectedDomain ? (
          <p className="text-xs text-[#6B7280] mt-1">
            We will scan through <span className="font-semibold">{selectedDomain}</span> and all associated assets.
          </p>
        ) : (
          <p className="text-xs text-[#6B7280] mt-1">
            We will scan through your selected verified domain and all associated assets.
          </p>
        )}

        {/* Load error recovery option */}
        {domainFetchError && (
          <div className="text-xs text-red-500 flex items-center gap-2 mt-1.5 p-2 bg-red-50 border border-red-100 rounded-md">
            <AlertCircle size={14} className="shrink-0" />
            <div className="flex-1">
              Failed to load domains: <span className="font-semibold">{domainFetchError}</span>
            </div>
            <button
              type="button"
              onClick={async () => {
                try {
                  setIsLoadingDomains(true);
                  setDomainFetchError(null);
                  const listValue = await domainService.getDomains();
                  const verified = listValue.data.filter((d) => d.status === "Verified");
                  setDomains(verified);
                } catch (err: unknown) {
                  const msg = err instanceof Error ? err.message : "Failed to load domains";
                  setDomainFetchError(msg);
                } finally {
                  setIsLoadingDomains(false);
                }
              }}
              className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
              title="Retry fetching domains"
            >
              <RefreshCw size={14} className="animate-spin-once" />
            </button>
          </div>
        )}
      </div>

      {/* What will happen next */}
      <div className="space-y-4">
        <h2 className="font-semibold text-[#111827] text-base">What will happen next?</h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          {WHAT_HAPPENS_NEXT.map((item) => (
            <div key={item.title} className="flex gap-3 items-start">
              <div className="flex items-center justify-center bg-[#EDEDED] w-9 h-9 rounded-full p-2 shrink-0">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-semibold text-[#111827] text-sm">{item.title}</h3>
                <p className="text-sm text-[#6B7280]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Green security banner */}
      <div className="bg-[#A0E870] rounded-lg px-5 py-4 flex items-center gap-3">
        <ShieldCheck className="text-[#072E28] shrink-0" size={22} />
        <p className="text-sm font-medium text-[#666666]">
          We only access publicly available data.
          <br />
          <span className="font-normal text-[#666666]">No intrusive testing is performed</span>
        </p>
      </div>

      {/* Email notification + lock note */}
      <div className="space-y-3">
        <div>
          <p className="text-[#2B2B2B] font-medium">
            Email Notification{" "}
            <span className="font-normal text-[#6B7280]">(Optional)</span>
          </p>
        </div>
        <InputField
          label="Notify me when the scan is complete"
          {...register("emailNotification")}
          checked={!!emailNotification}
          type="checkbox"
        />

        <p className="text-xs text-neutral-500 flex items-center gap-2 pt-1">
          <Lock size={13} className="text-gray-500 shrink-0" />
          This scan is safe and does not attempt to exploit or harm your system
        </p>

        {/* Mobile only buttons */}
        {selectedDomain && (
          <div className="flex flex-col gap-3 mt-4 md:hidden">
            <Button
              type="button"
              variant="outline"
              asChild
              className="border-[1.5px] border-[#072E28] text-[#072E28] hover:bg-[#072E28]/5 h-12 w-full font-semibold rounded-lg flex items-center justify-center transition-colors"
            >
              <Link href={`/scan/history?domainId=${domains.find(d => d.domain === selectedDomain)?.id}&domainName=${encodeURIComponent(selectedDomain)}`}>
                View Scan History
              </Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#072E28] rounded-lg w-full h-12 font-semibold text-white text-base cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Starting scan...
                </span>
              ) : (
                "Start Scan"
              )}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
