import type { ReactNode } from "react";
import LandingLayout from "@/features/landing/pages/layout";

export default function Layout({ children }: { children: ReactNode }) {
  return <LandingLayout>{children}</LandingLayout>;
}
