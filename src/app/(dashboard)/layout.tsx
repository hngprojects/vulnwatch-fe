import MobileSidebar from "@/components/dashboard/layout/sidebar/MobileSidebar";
import DashboardSidebar from "@/components/dashboard/layout/sidebar/Sidebar";
import DashboardTopbar from "@/components/dashboard/layout/topbar/Topbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="fixed inset-0 flex overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MobileSidebar />
          <main className="flex-1 min-h-0 overflow-auto">
            <DashboardTopbar />
            <div className="p-6 bg-[#f9f9f9]">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
