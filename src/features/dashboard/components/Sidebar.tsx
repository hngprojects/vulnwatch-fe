'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import DashboardSidebarIcon from '@/lib/icons/dashboard-sidebar-icon';
import DomainSidebarIcon from '@/lib/icons/domain-sidebar-icon';
import ScanSidebarIcon from '@/lib/icons/scan-sidebar-icon';
import ReportSidebarIcon from '@/lib/icons/report-sidebar-icon';
import SettingsIcon from '@/lib/icons/settings-icon';

type NavItemType = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItemType[] = [
      {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardSidebarIcon />,
  },
  {
    label: 'Domain',
    href: '/domain',
    icon: <DomainSidebarIcon />,
  },
  { label: 'Scan', href: '/scan', icon: <ScanSidebarIcon /> },
  { label: 'Report', href: '/report', icon: <ReportSidebarIcon /> },
];

const BOTTOM_ITEMS: NavItemType[] = [
  { label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.push('/login');
  };

  return (
    <aside className='hidden lg:flex flex-col w-55 min-h-screen bg-brand-sidebar-bg shrink-0'>
      {/* Logo */}
      <div className='flex items-center h-16 my-5 px-5 border-b border-gray-100'>
        <Link href='/dashboard'>
          <Image
            src='/images/logo-auth.png'
            alt='VulnWatch AI'
            width={140}
            height={48}
            className='h-auto w-56 pb-7'
            priority
          />
        </Link>
      </div>

      {/* Main nav */}
      <nav className='flex-1 px-3 py-5 space-y-2.5'>
        {NAV_ITEMS.map(({ label, href, icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              )}
            >
              <div className='text-lg'>
                {label === 'Dashboard' ? (
                  <DashboardSidebarIcon isActive={isActive} />
                ) : label === 'Domain' ? (
                  <DomainSidebarIcon isActive={isActive} />
                ) : label === 'Scan' ? (
                  <ScanSidebarIcon isActive={isActive} />
                ) : label === 'Report' ? (
                  <ReportSidebarIcon isActive={isActive} />
                ) : (
                  icon
                )}
              </div>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div className='px-3 pb-5 space-y-2.5 border-t border-gray-200 pt-4'>
        {BOTTOM_ITEMS.map(({ label, href, icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              )}
            >
              <div className='text-lg'>
                {label === 'Settings' ? (
                  <SettingsIcon isActive={isActive} />
                ) : (
                  icon
                )}
              </div>
              {label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className='w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors'
        >
          <div className='text-lg flex items-center justify-center'>
            <LogOut className='h-4.5 w-4.5 shrink-0' strokeWidth={1.8} />
          </div>
          Logout
        </button>
      </div>
    </aside>
  );
}
