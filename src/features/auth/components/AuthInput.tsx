import React, { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  error?: string;
  helperText?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    { label, icon, rightElement, error, helperText, className, id, ...props },
    ref,
  ) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor={inputId}
          className="font-geist text-[17px] leading-[20px] font-medium tracking-[0.5px] text-[#2B2B2BCC]"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#666666]">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "font-geist flex h-[50px] w-full rounded-lg border bg-transparent px-4 py-2 text-[16px] text-[#2B2B2B] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#666666B2] focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              icon ? "pl-11" : "",
              rightElement ? "pr-11" : "",
              error
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-[#2B2B2B4D] focus-visible:ring-[#C68A00]",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {rightElement}
            </div>
          )}
        </div>
        {error ? (
          <p
            id={`${inputId}-error`}
            className="text-sm font-medium text-red-500"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="font-geist text-[15px] leading-[24px] font-normal text-[#666666]"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";
