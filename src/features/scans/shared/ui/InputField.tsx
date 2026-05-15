import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type = "text",
      placeholder,
      label,
      description,
      error,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const id = props.id || label || generatedId;

    const labelClassName =
      "text-sm font-medium text-neutral-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

    if (type === "checkbox")
      return (
        <div className="w-full flex items-center gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={id}
              ref={ref}
              className={cn(
                "h-4 w-4 rounded border-gray-300 text-scan-primary-900 accent-scan-primary-900 focus:ring-scan-primary-900",
                className,
              )}
              {...props}
            />
            {label && (
              <label htmlFor={id} className={labelClassName}>
                {label}
              </label>
            )}
          </div>
          {description && (
            <div className="flex items-center gap-2">
              <InfoIcon size={16} className="text-neutral-500" />
              <p className="text-sm text-neutral-500">{description}</p>
            </div>
          )}
        </div>
      );

    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className={labelClassName} htmlFor={id}>
            {label}
          </label>
        )}
        <Input
          className={cn("min-w-64 shadow-none", className)}
          id={id}
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        {description && (
          <div className="flex items-center gap-2">
            <InfoIcon size={16} className="text-neutral-500" />
            <p className="text-sm text-neutral-500">{description}</p>
          </div>
        )}
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
