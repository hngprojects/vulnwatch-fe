"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Copy,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { domainService } from "../services/domain.service";
import type { Domain } from "../types/domain.types";

function extractApiError(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: unknown } }).response;
    const data = res?.data;
    if (data && typeof data === "object") {
      if ("errors" in data) {
        const errors = (data as { errors: Record<string, string[]> }).errors;
        const messages = Object.values(errors).flat();
        if (messages.length) return messages[0];
      }
      if ("error" in data) {
        const apiErr = (data as { error?: { message?: string } }).error;
        if (apiErr?.message) return apiErr.message;
      }
      if ("title" in data) return (data as { title: string }).title;
    }
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong. Please try again.";
}

const steps = [
  {
    title: "Login your domain provider",
    desc: "Go to the account where your domain is managed",
  },
  {
    title: "Open DNS settings",
    desc: "Find the DNS management or zone editor section",
  },
  {
    title: "Add a new TXT record",
    desc: "Create a new TXT record with details shown on the right",
  },
  {
    title: "Save your changes",
    desc: "DNS changes may take a few minutes to apply",
  },
];

export default function VerifyDnsPage({ domainId }: { domainId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token") ?? "";
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loadingDomain, setLoadingDomain] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    domainService
      .getDomain(domainId)
      .then(setDomain)
      .finally(() => setLoadingDomain(false));
  }, [domainId]);

  const copy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleVerify = async () => {
    setVerifying(true);
    try {
      await domainService.verifyDomain(domainId);
      toast.success("Domain verification initiated. DNS changes may take up to 1 hour.");
      router.push("/domain");
    } catch (err) {
      toast.error(extractApiError(err));
    } finally {
      setVerifying(false);
    }
  };

  if (loadingDomain) {
    return (
      <div className="px-4 md:px-6 py-6 flex items-center justify-center min-h-[60vh]">
        <Loader2 size={24} className="animate-spin text-[#072E28]" />
      </div>
    );
  }

  const token = tokenFromUrl || domain?.verificationToken || domain?.domain || "";

  return (
    <div className="px-4 md:px-6 py-6 max-w-2xl">
      <button
        onClick={() => router.push(`/domain/${domainId}/verify?token=${encodeURIComponent(tokenFromUrl)}`)}
        className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#111827] mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#111827]">
            Verify via DNS TXT Record
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Add the following TXT record to your domain DNS settings to verify ownership
          </p>
        </div>
        <Button
          onClick={handleVerify}
          disabled={verifying}
          className="bg-[#072E28] text-white hover:bg-[#072E28]/90 rounded-lg shrink-0 ml-4"
        >
          {verifying ? "Verifying..." : "Verify domain"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-[#111827] mb-3">Steps to verify</h3>
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[#072E28] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111827]">{s.title}</p>
                  <p className="text-xs text-[#6B7280]">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <span className="text-xs font-semibold text-[#374151]">TXT Record Details</span>
              <button
                onClick={() =>
                  copy(`Type: TXT\nHost/Name: @\nValue: ${token}\nTTL: Auto`, "all")
                }
                className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#111827]"
              >
                <Copy size={12} />
                {copiedField === "all" ? "Copied!" : "Copy all"}
              </button>
            </div>

            <div className="divide-y divide-[#E5E7EB]">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-[#6B7280]">Type</span>
                <span className="text-xs font-medium text-[#111827]">TXT</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-[#6B7280]">Host/Name</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#111827]">@</span>
                  <button
                    onClick={() => copy("@", "host")}
                    className="text-[#9CA3AF] hover:text-[#374151]"
                  >
                    {copiedField === "host" ? (
                      <Check size={12} className="text-[#10B981]" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-[#6B7280] shrink-0">Value/Content</span>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-xs font-medium text-[#111827] break-all text-right">
                    {token}
                  </span>
                  <button
                    onClick={() => copy(token, "value")}
                    className="text-[#9CA3AF] hover:text-[#374151] shrink-0"
                  >
                    {copiedField === "value" ? (
                      <Check size={12} className="text-[#10B981]" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-[#6B7280]">TTL</span>
                <span className="text-xs font-medium text-[#111827]">Auto</span>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] px-3 py-2.5 flex items-start gap-2">
            <AlertTriangle size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
            <p className="text-xs text-[#92400E]">
              If DNS provider requires TTL, you can keep it at auto or use 1 hour.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 border-t border-[#E5E7EB] pt-3">
        <Info size={13} className="text-[#6B7280] shrink-0 mt-0.5" />
        <p className="text-xs text-[#6B7280]">
          Once you&apos;ve added the TXT record, click{" "}
          <span className="font-medium text-[#111827]">verify domain</span>. DNS changes
          can take up to 1 hour to propagate.
        </p>
      </div>
    </div>
  );
}
