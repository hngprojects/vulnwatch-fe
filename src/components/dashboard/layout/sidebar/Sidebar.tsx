"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogoIcon } from "./lib/icons/logo";
import { getNavLinks, type NavLink } from "./lib/constants";
import { cn } from "@/lib/utils";

function NavLink({ link }: { link: NavLink }) {
  const pathname = usePathname();
  const isActive =
    pathname === link.href || (link.href && pathname.startsWith(link.href));

  return (
    <li key={link.label} className="flex items-center gap-3">
      <Link
        href={link.href || "#"}
        className={`flex items-center w-full gap-3 px-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${
          isActive ? "bg-scan-primary-900 text-white" : ""
        }`}
      >
        <div className={cn(isActive && "text-scan-primary-500")}>
          {link.icon}
        </div>
        <span>{link.label}</span>
      </Link>
    </li>
  );
}

export default function DashboardSidebar({ className }: { className?: string }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navLinks = getNavLinks(() => setIsLogoutModalOpen(true));

  return (
    <div
      className={cn(
        "h-screen w-[270px] bg-gray-50 border-r border-gray-200 p-4 flex justify-between flex-col",
        "hidden lg:flex",
        className,
      )}
    >
      <BrandLogoIcon className="p-4" />
      <nav>
        <ul className="flex flex-col gap-2">
          {navLinks.primary.map((link) => (
            <NavLink key={link.label} link={link} />
          ))}
        </ul>
      </nav>

      <nav>
        <ul className="flex flex-col gap-2">
          {navLinks.secondary.map((link) => (
            <NavLink key={link.label} link={link} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
