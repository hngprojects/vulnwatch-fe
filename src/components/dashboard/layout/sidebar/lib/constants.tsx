import { DashboardIcon } from "./icons/dashboard";
import { DomainIcon } from "./icons/domain";
import { LogoutIcon } from "./icons/logout";
import { ReportIcon } from "./icons/report";
import { ScanIcon } from "./icons/scan";
import { SettingsIcon } from "./icons/settings";

export type NavLink = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  children?: NavLink[];
};

export function getNavLinks(onOpenLogoutModal: () => void) {
  // const auth = useAuthStore();

  const navLinks: Record<string, NavLink[]> = {
    primary: [
      { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
      { label: "Domains", href: "/domains", icon: <DomainIcon /> },
      {
        label: "Scan",
        href: "/scan",
        icon: <ScanIcon />,
        children: [
          { label: "Exposure", href: "/scan/exposure" },
          { label: "SSL", href: "/scan/ssl" },
          { label: "DNS", href: "/scan/dns" },
        ],
      },
      {
        label: "Report",
        href: "/report",
        icon: <ReportIcon />,
      },
    ],
    secondary: [
      {
        label: "Settings",
        icon: <SettingsIcon />,
        href: "/settings",
      },
      {
        label: "Logout",
        icon: <LogoutIcon />,
        onClick: onOpenLogoutModal,
      },
    ],
  };
  return navLinks;
}
