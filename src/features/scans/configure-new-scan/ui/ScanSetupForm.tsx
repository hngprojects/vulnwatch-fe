"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import InputField from "../../shared/ui/InputField";
import { SCAN_TYPES } from "../lib/constants";
import ScanTypeButton from "./ScanTypeButton";
import { useForm } from "react-hook-form";
import { configureScanSchema, ConfigureScanSchemaType } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ScanSetupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfigureScanSchemaType>({
    defaultValues: {
      domain: "",
      scanType: "QUICK_SCAN",
      emailNotification: undefined,
    },
    resolver: zodResolver(configureScanSchema),
  });

  const onSubmit = (data: ConfigureScanSchemaType) => {
    console.log(data);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <p className="font-medium text-neutral-900">Domain</p>
        <InputField
          placeholder="www.mycompany.com"
          {...register("domain")}
          type="url"
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
              selectedTitle="Quick Scan"
              {...register("scanType")}
            />
          ))}
        </div>
        <div className="space-y-2">
          <p className="font-medium text-neutral-900">
            Email notification (optional)
          </p>

          <InputField
            label="Notify me when the scan is complete"
            {...register("emailNotification")}
            type="checkbox"
          />
        </div>
        <div className="space-y-1.5 mt-8!">
          <Button className="bg-scan-primary-900 rounded-xl w-full h-11!">
            Start Scan
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
