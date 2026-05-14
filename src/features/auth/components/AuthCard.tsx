import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="mx-auto w-full max-w-[700px] rounded-[12px] border border-[#2B2B2B4D] bg-white p-8 shadow-sm sm:p-12 md:p-16">
      {children}
    </div>
  );
}
