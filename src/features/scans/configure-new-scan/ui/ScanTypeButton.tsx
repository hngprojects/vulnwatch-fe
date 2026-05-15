import { cn } from "@/lib/utils";

import React from "react";

export default function ScanTypeButton({
  icon,
  title,
  selectedTitle,
  description,
  timeDuration,
}: {
  icon: React.ReactNode;
  title: string;
  selectedTitle: string;
  description: string;
  timeDuration: string;
}) {
  const isSelected = title === selectedTitle;

  return (
    <button
      className={cn(
        "p-4 rounded-lg w-full flex flex-col items-center   justify-between cursor-pointer gap-3 transition-opacity bg-white border-border hover:text-foreground border-[1.2px]",
        isSelected &&
          "border-scan-primary-900 text-scan-primary-900 font-medium",
        !isSelected && "hover:border-scan-primary-900",
      )}
    >
      <div className="space-y-2 flex flex-col items-center justify-center">
        <div
          className={cn(
            "h-9 w-9 bg-neutral-200 text-nuetral-900 rounded-full flex items-center justify-center",
            isSelected && "text-white bg-scan-primary-900",
          )}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <p className="text-sm text-muted-foreground">{timeDuration}</p>
    </button>
  );
}
