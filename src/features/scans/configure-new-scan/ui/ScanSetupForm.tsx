"use client";

import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";
import InputField from "../../shared/ui/InputField";
import { SCAN_TYPES } from "../lib/constants";
import ScanTypeButton from "./ScanTypeButton";
import { useForm } from "react-hook-form";
import { configureScanSchema, ConfigureScanSchemaType } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { scanService } from "@/features/scans/services/scan.service";

export default function ScanSetupForm() {
  "use no memo";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConfigureScanSchemaType>({
    defaultValues: {
      domain: "",
      scanType: "QUICK_SCAN",
      emailNotification: false,
    },
    resolver: zodResolver(configureScanSchema),
  });
  const router = useRouter();

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedScanType = watch("scanType");

  const onSubmit = async (data: ConfigureScanSchemaType) => {
    try {
      const response = await scanService.createScan({
        domain: data.domain,
        scanType: data.scanType,
      });

      if (response.isSuccess && response.value) {
        // Both "new scan" and "scan already in progress" return isSuccess: true with a scanId
        // Show a toast only if a scan was already running
        if (
          response.value.message === "A scan is already in progress for this domain." ||
          response.value.message === "Scan already initiated."
        ) {
          toast.info(response.value.message);
        }
        router.push(`/scan/progress?scanId=${encodeURIComponent(response.value.scanId)}`);
      } else {
        toast.error(response.error?.message || "Failed to start scan. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "Invalid domain name") {
        toast.error("Please enter a valid domain name.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <p className="font-medium text-neutral-900">Domain</p>
        <InputField
          placeholder="www.mycompany.com"
          {...register("domain")}
          type="text"
          description="We will scan through mycompany.com and all associated assets"
          error={errors.domain?.message}
        />
      </div>
      <div className="space-y-4">
        <p className="font-medium text-neutral-900">Scan Type</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {SCAN_TYPES.map((scan) => (
            <ScanTypeButton
              key={scan.title}
              {...scan}
              isSelected={selectedScanType === scan.value}
              value={scan.value}
              {...register("scanType")}
            />
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-[#2B2B2B]">
            <span className="font-medium">Email Notification</span>
            <span className="font-normal"> (Optional)</span>
          </p>

          <InputField
            label="Notify me when the scan is complete"
            {...register("emailNotification")}
            type="checkbox"
          />
        </div>
        <div className="space-y-1.5 mt-8!">
          <Button
            className="bg-[#072E28] rounded-lg w-full h-12 font-semibold text-white text-[20px] disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Starting scan...
              </span>
            ) : (
              "Start Scan"
            )}
          </Button>
          <p className="text-xs text-neutral-500 flex items-center gap-2">
            <Lock size={14} className="text-gray-500" />
            This scan is safe and does not attempt to exploit or harm your
            system
          </p>
        </div>
      </div>
    </form>
  );
}
