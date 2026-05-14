"use client";

import * as React from "react";

type FramerButtonProps = {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const FramerButton = ({
  text,
  isLoading = false,
  disabled = false,
  type = "submit",
}: FramerButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className="bg-primary text-primary-foreground flex h-12 w-full items-center justify-center rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabl
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
};

export default FramerButton;
