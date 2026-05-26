"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { DashboardHeader } from "@/features/dashboard/components/Header";
import { useAuthStore } from "@/store/auth.store";
import { domainService } from "@/features/domain/services/domain.service";

function subscribeAuthStore(listener: () => void) {
  return useAuthStore.subscribe(listener);
}

function getAuthSnapshot() {
  return useAuthStore.getState().token;
}

function getServerAuthSnapshot() {
  return null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useSyncExternalStore(
    subscribeAuthStore,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    const pendingDomain = localStorage.getItem("pending_scan_domain");
    if (!pendingDomain) return;

    // Immediately remove from localStorage to prevent duplicate calls in React Strict Mode
    localStorage.removeItem("pending_scan_domain");

    let mounted = true;

    const registerPendingDomain = async () => {
      try {
        const response = await domainService.createDomain({ domain: pendingDomain });
        if (!mounted) return;
        router.push(`/domain/${response.id}/verify?token=${encodeURIComponent(response.verificationToken)}`);
      } catch (error) {
        console.error("Failed to create pending domain:", error);
        
        try {
          const list = await domainService.getDomains();
          const existing = list.data.find(
            (d) => d.domain.toLowerCase() === pendingDomain.toLowerCase()
          );

          if (existing && existing.status !== "Verified") {
            if (!mounted) return;
            if (existing.verificationToken) {
              router.push(`/domain/${existing.id}/verify?token=${encodeURIComponent(existing.verificationToken)}`);
            } else {
              console.error("Domain is pending but has no verification token:", existing);
              router.push("/dashboard");
            }
          }
        } catch (fetchError) {
          console.error("Failed to resolve existing domains:", fetchError);
        }
      }
    };

    registerPendingDomain();

    return () => {
      mounted = false;
    };
  }, [router, token]);

  if (!token) return null;

  return (
    <div className="flex h-screen bg-brand-dashboard-bg overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
