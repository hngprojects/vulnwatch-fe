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
    const disabled = props.disabled;

    return (
      <label
        className={cn(
          "relative p-4 rounded-lg w-full items-center cursor-pointer gap-3 transition-all duration-200 bg-white border-[#E5E7EB] hover:text-foreground border-[1.2px]",
          isSelected && "border-[#072E28]",
          !isSelected && "hover:border-[#072E28]",
          disabled && "opacity-60 cursor-not-allowed pointer-events-none select-none border-neutral-200 hover:border-neutral-200",
          className,
        )}
      >
        <input type="radio" className="sr-only" ref={ref} {...props} />
        {isSelected && !disabled && (
          <span className="sm:hidden absolute right-4 top-4">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.74462 15.9999C10.9829 15.9801 13.1989 15.1276 14.7923 13.6797C16.6848 11.9602 17.6595 9.41585 17.3195 6.98704C16.7369 2.82448 13.0155 0 8.68872 0C5.40164 0 2.20662 1.89064 0.805328 4.63226C-0.2675 6.7312 -0.269385 9.26512 0.805328 11.3678C2.19668 14.09 5.33918 15.9707 8.63282 15.9999C8.67009 16 8.70735 16 8.74462 15.9999ZM8.64213 14.6666C5.29886 14.6369 2.17972 12.2599 1.55956 9.21225C1.12233 7.06354 1.94773 4.73836 3.66704 3.21252C5.67471 1.43077 8.82978 0.833805 11.4532 1.84381C13.8006 2.74762 15.5574 4.84563 15.8811 7.15731C16.1586 9.13865 15.3853 11.2152 13.8656 12.6456C12.5327 13.9002 10.6633 14.6495 8.73531 14.6666C8.70424 14.6667 8.6732 14.6667 8.64213 14.6666Z"
                fill="#072E28"
              />
              <path
                d="M8.68968 13.641C12.0827 13.641 14.8332 11.1121 14.8332 7.9924C14.8332 4.87274 12.0827 2.34375 8.68968 2.34375C5.2967 2.34375 2.54614 4.87274 2.54614 7.9924C2.54614 11.1121 5.2967 13.641 8.68968 13.641Z"
                fill="#072E28"
              />
            </svg>
          </span>
        )}
        <span className="space-y-2 flex gap-4 items-start sm:flex-col sm:items-center h-full sm:text-center">
          <span className="size-9! aspect-square bg-[#072E28] text-white rounded-full flex items-center justify-center mb-0! transition-colors duration-200">
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5">
              {icon}
            </span>
          </span>
          <span className="space-y-2 h-full flex flex-col items-center">
            <span className="block text-lg font-semibold flex items-center gap-1.5 justify-center">
              {title}
              {disabled && (
                <span className="text-[10px] bg-neutral-100 text-neutral-500 font-medium px-1.5 py-0.5 rounded border border-neutral-200 shrink-0">
                  Coming soon
                </span>
              )}
            </span>
            <span className="block text-sm text-center text-[#6B7280]">
              {description}
            </span>
            <span className="block text-sm text-[#6B7280] mt-auto">
              {timeDuration}
            </span>
          </span>
        </span>
      </label>
    );
  },
);

ScanTypeButton.displayName = "ScanTypeButton";

export default ScanTypeButton;