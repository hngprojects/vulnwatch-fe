"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import DashboardSidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { BrandLogoIcon } from "./lib/icons/logo";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="lg:hidden">
      {/* Trigger Button */}
      <div className="p-4 flex items-center justify-between">
        <BrandLogoIcon orientation="horizontal" size={150} />
        <Button variant="ghost" size="icon" onClick={toggleMenu}>
          <Menu className="size-6" />
        </Button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[280px] bg-white flex flex-col transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <X className="size-6" />
          </Button>
        </div>
        <DashboardSidebar className="flex flex-1 min-h-0 w-full border-none" />
      </div>
    </div>
  );
}
