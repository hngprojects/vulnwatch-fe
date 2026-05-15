import { ROUTES } from "@/constants/routes";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.HOME },
  { label: "About Us", href: "/about-us" },
  { label: "How It Works", href: `${ROUTES.HOME}#how-it-works` },
  { label: "FAQ", href: ROUTES.FAQS },
];
