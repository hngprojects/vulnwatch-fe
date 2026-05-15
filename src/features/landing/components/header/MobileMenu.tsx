"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NAV_LINKS } from "../../constants/nav-links";
import { ROUTES } from "@/constants/routes";

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

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
      />

      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="fixed inset-x-0 top-[72px] z-[60] max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-gray-100 bg-white px-5 py-6 shadow-xl lg:hidden"
      >
        <ul className="flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className="font-geist text-primary block rounded-lg px-2 py-2 text-lg font-medium transition-colors hover:bg-gray-50"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-gray-100" />

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
      </nav>
    </>
  );
}
