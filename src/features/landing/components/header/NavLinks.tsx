"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "../../constants/nav-links";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-10">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "font-geist text-base leading-6 font-normal transition-all duration-200",
                  "cursor-pointer focus:outline-none hover:scale-105",
                  isActive ? "text-primary" : "text-primary/60"
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}