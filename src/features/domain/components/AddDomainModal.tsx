"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { domainService } from "../services/domain.service";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

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

export default function AddDomainModal({ open, onOpenChange }: Props) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = (val: boolean) => {
    if (!val) {
      setValue("");
      setError("");
    }
    onOpenChange(val);
  };

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter a domain name.");
      return;
    }
    const domainRegex =
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    if (!domainRegex.test(trimmed)) {
      setError("Enter a valid domain (e.g. example.com).");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const domain = await domainService.createDomain({ domain: trimmed });
      onOpenChange(false);
      router.push(`/domain/${domain.id}/verify`);
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent showCloseButton className="max-w-[440px] rounded-xl">
        <DialogTitle className="text-lg font-semibold text-[#111827]">
          Add Domain
        </DialogTitle>

        <div className="space-y-4 mt-1">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">
              Domain Name
            </label>
            <div className="relative">
              <Globe
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />
              <input
                type="text"
                placeholder="mycompany.com"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full pl-9 pr-3 h-10 text-sm rounded-lg border border-[#E5E7EB] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#072E28]/20 focus:border-[#072E28]"
              />
            </div>
            {error ? (
              <p className="text-xs text-[#EF4444] mt-1">{error}</p>
            ) : (
              <p className="text-xs text-[#9CA3AF] mt-1">
                Enter a valid domain (e.g. example.com)
              </p>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#072E28] text-white hover:bg-[#072E28]/90 rounded-lg h-11 text-base font-semibold [letter-spacing:-0.5px]"
          >
            {loading ? "Saving..." : "Continue to verification"}
            {!loading && <ArrowRight size={16} className="ml-1" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
