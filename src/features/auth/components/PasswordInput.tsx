"use client";

import React, { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { AuthInput, AuthInputProps } from "./AuthInput";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<AuthInputProps, "icon" | "rightElement">
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibilityButton = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="flex h-full items-center justify-center text-[#666666] hover:text-[#2B2B2B] focus:outline-none"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  );

  return (
    <AuthInput
      ref={ref}
      type={showPassword ? "text" : "password"}
      icon={<Lock className="h-5 w-5" />}
      rightElement={toggleVisibilityButton}
      {...props}
    />
  );
});
PasswordInput.displayName = "PasswordInput";
