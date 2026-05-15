import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";

export type InputFieldProps = {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  error?: string;
  [key: string]: any;
};

export default function InputField({
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  description,
  error,
  ...props
}: InputFieldProps) {
  const labelClassName =
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  if (type === "checkbox")
    return (
      <div className="w-full flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={value as boolean}
            onCheckedChange={(checked) =>
              onChange(
                checked as unknown as React.ChangeEvent<HTMLInputElement>,
              )
            }
            className="text-white"
            id={label}
            {...props}
          />
          <label htmlFor={label} className={labelClassName}>
            {label}
          </label>
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
      <label className={labelClassName} htmlFor={label}>
        {label}
      </label>
      <Input
        className="min-w-64 shadow-none"
        id={label}
        type={type}
        placeholder={placeholder}
        value={value as string}
        onChange={onChange}
        {...props}
      />
      {description && (
        <div className="flex items-center gap-2">
          <InfoIcon size={16} className="text-neutral-500" />
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
      )}
    </div>
  );
}
