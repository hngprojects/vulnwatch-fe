"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "../../constants/nav-links";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop — fades in/out */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-60 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer — slides down from top */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-x-0 top-0 z-70 flex max-h-dvh flex-col bg-white px-5 pt-3 pb-8 shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-y-0" : "pointer-events-none -translate-y-full",
        )}
      >
        {/* Close button */}
        <div className="flex min-h-12 items-center justify-between">
          <Link
            href={ROUTES.HOME}
            onClick={onClose}
            aria-label="VulnWatch AI home"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/images/logo-footer.png"
              alt="VulnWatch AI"
              width={96}
              height={75}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="text-primary flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="mt-6">
          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="font-geist text-primary text-lg font-normal transition-opacity hover:opacity-70"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-100" />

        {/* CTA buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={ROUTES.LOGIN}
            onClick={onClose}
            className="border-primary text-body flex h-12 w-full items-center justify-center rounded-xl border bg-white text-base font-medium transition-opacity hover:opacity-80"
          >
            Log in
          </Link>
          <Link
            href={ROUTES.REGISTER}
            onClick={onClose}
            className="bg-primary flex h-12 w-full items-center justify-center gap-1.5 rounded-xl text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Start Free Trial
            <ArrowRight
              className="h-2.75 w-3.5 shrink-0 stroke-white"
              strokeWidth={1.4}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
