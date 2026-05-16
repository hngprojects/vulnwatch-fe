"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  ScanLine,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";

type NavItemType = {
  label: string;
  href: string;
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isPng: boolean;
};

const NAV_ITEMS: NavItemType[] = [
  { label: "Dashboard", href: "/dashboard", icon: "/icons/icon-dashboard.png", isPng: true },
  { label: "Domain", href: "/domain", icon: "/icons/icon-domain.png", isPng: true },
  { label: "Scan", href: "/scan", icon: ScanLine, isPng: false },
  { label: "Report", href: "/report", icon: FileText, isPng: false },
];

const BOTTOM_ITEMS: NavItemType[] = [
  { label: "Settings", href: "/settings", icon: Settings, isPng: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.push("/login");
  };

  return (
    <aside className="hidden lg:flex flex-col w-[220px] min-h-screen bg-white shrink-0">
      {/* Logo */}
      <div className="flex items-center h-[64px] px-5 border-b border-[#F3F4F6]">
        <Link href="/">
          <Image
            src="/images/logo-sidebar-desktop.png"
            alt="VulnWatch AI"
            width={140}
            height={48}
            className="h-auto w-[130px]"
            priority
          />
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon, isPng }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]"
              )}
            >
              {isPng ? (
                <Image
                  src={Icon as string}
                  alt=""
                  width={18}
                  height={18}
                  className={cn("shrink-0", isActive ? "brightness-0 invert" : "")}
                />
              ) : (
                <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
              )}
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div className="px-3 pb-5 space-y-1 border-t border-[#E5E7EB] pt-4">
        {BOTTOM_ITEMS.map(({ label, href, icon: Icon, isPng }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]"
              )}
            >
              {isPng ? (
                <Image
                  src={Icon as string}
                  alt=""
                  width={18}
                  height={18}
                  className={cn("shrink-0", isActive ? "brightness-0 invert" : "")}
                />
              ) : (
                <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
              )}
              {label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
          Logout
        </button>
      </div>
    </aside>
  );
}