import type { ReactNode } from "react";
import LandingLayout from "@/features/landing/pages/layout";
import { RedirectIfAuthed } from "@/features/auth/components/RedirectIfAuthed";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <RedirectIfAuthed />
      <LandingLayout>{children}</LandingLayout>
    </>
  );
}
