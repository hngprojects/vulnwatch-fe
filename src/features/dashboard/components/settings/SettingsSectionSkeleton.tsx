import { Loader2 } from "lucide-react";

type SettingsSectionSkeletonProps = {
  label?: string;
};

const SettingsSectionSkeleton = ({
  label = "Loading settings...",
}: SettingsSectionSkeletonProps) => {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-2 text-[#666666]">
        <Loader2 size={20} className="animate-spin text-primary" />
        <span className="text-sm sm:text-base">{label}</span>
      </div>
    </div>
  );
};

export default SettingsSectionSkeleton;
