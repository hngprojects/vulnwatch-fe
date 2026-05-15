import { cn } from "@/lib/utils";
import React from "react";

interface ScanTypeButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  title: string;
  isSelected: boolean;
  description: string;
  timeDuration: string;
}

const ScanTypeButton = React.forwardRef<HTMLInputElement, ScanTypeButtonProps>(
  (
    { icon, title, isSelected, description, timeDuration, className, ...props },
    ref,
  ) => {
    return (
      <label
        className={cn(
          "p-4 rounded-lg w-full items-center cursor-pointer gap-3 transition-opacity bg-white border-border hover:text-foreground border-[1.2px]",
          isSelected &&
            "border-scan-primary-900 text-scan-primary-900 font-medium",
          !isSelected && "hover:border-scan-primary-900",
          className,
        )}
      >
        <input type="radio" className="sr-only" ref={ref} {...props} />
        <div className="space-y-2 flex gap-4 items-start sm:flex-col sm:items-center h-full sm:text-center">
          <div
            className={cn(
              "size-9! aspect-square bg-neutral-200 text-neutral-900 rounded-full flex items-center justify-center mb-0!",
              isSelected && "text-white bg-scan-primary-900",
            )}
          >
            {icon}
          </div>
          <div className="space-y-2 h-full flex flex-col">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-center text-muted-foreground">
              {description}
            </p>
            <p className="text-sm text-muted-foreground mt-auto">
              {timeDuration}
            </p>
          </div>
        </div>
      </label>
    );
  },
);

ScanTypeButton.displayName = "ScanTypeButton";

export default ScanTypeButton;
