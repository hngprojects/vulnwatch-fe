"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { token, email, logout } = useAuthStore.getState();
  const router = useRouter();

  useEffect(() => {
    // Simple check: if no token, redirect to login
    // In a real app, this would be handled by middleware/proxy
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA] p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">
          Welcome to VulnWatch AI
        </h1>
        <p className="text-[#666666] mb-8 text-lg">
          You are logged in as <span className="font-semibold text-[#C68A00]">{email}</span>
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 text-amber-800 text-sm">
          <p><strong>Note:</strong> The full dashboard interface is currently under development.</p>
          <p>All authentication routes are now correctly proxied to the staging backend.</p>
        </div>

        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="bg-primary text-white px-8 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
