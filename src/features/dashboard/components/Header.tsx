'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  LayoutDashboard,
  Globe,
  ScanLine,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Domain', href: '/domain', icon: Globe },
  { label: 'Scan', href: '/scan', icon: ScanLine },
  { label: 'Report', href: '/report', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { email, picture } = useAuthStore.getState();
  const displayEmail = email ?? 'user@company.com';
  const displayName = displayEmail.split('@')[0] ?? 'User';
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.push('/login');
  };

  return (
    <>
      <header className='h-16 bg-[#F5F5F5] flex items-center justify-between px-4 md:px-6 shrink-0 z-30'>
        {/* Mobile Header: Logo (left) + Hamburger (right) */}
        <div className='flex lg:hidden items-center justify-between w-full'>
          <Link href='/dashboard'>
            <Image
              src='/images/logo-dashboard.png'
              alt='VulnWatch AI'
              width={140}
              height={32}
              className='h-6 w-auto'
            />
          </Link>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className='text-[#111827] p-1'
            aria-label='Open menu'
          >
            <Menu className='h-6 w-6' />
          </button>
        </div>

        {/* Search bar */}
        <div className='hidden md:flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 w-70'>
          <Search className='h-4 w-4 text-[#9CA3AF] shrink-0' />
          <input
            type='text'
            placeholder='Search assets...'
            className='bg-transparent text-sm text-[#374151] placeholder:text-[#9CA3AF] outline-none w-full'
          />
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4 ml-auto'>
          <Link
            href='#'
            className='hidden md:block text-sm font-medium text-[#4B5563] hover:text-primary transition-colors'
          >
            Security Docs
          </Link>
          <Link
            href='#'
            className='hidden md:block text-sm font-medium text-[#4B5563] hover:text-primary transition-colors'
          >
            API Access
          </Link>

          {/* User avatar */}
          <div className='relative hidden md:block'>
            <button
              type='button'
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className='flex items-center gap-2 hover:bg-[#F3F4F6] rounded-lg px-2 py-1.5 transition-colors'
            >
              {picture ? (
                <Image
                  src={picture}
                  alt={displayName}
                  width={32}
                  height={32}
                  className='h-8 w-8 rounded-full object-cover shrink-0'
                />
              ) : (
                <div className='h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold shrink-0'>
                  {initials}
                </div>
              )}
              <div className='flex flex-col items-start leading-none'>
                <span className='text-sm font-medium text-[#111827] capitalize'>
                  {displayName}
                </span>
                <span className='text-xs text-[#6B7280] mt-0.5'>
                  {displayEmail}
                </span>
              </div>
              <ChevronDown className='h-4 w-4 text-[#9CA3AF]' />
            </button>

            {userMenuOpen && (
              <>
                <div
                  className='fixed inset-0 z-10'
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className='absolute right-0 top-full mt-1 w-48 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-20 py-1'>
                  <div className='px-3 py-2 border-b border-[#F3F4F6]'>
                    <p className='text-sm font-medium text-[#111827] capitalize'>
                      {displayName}
                    </p>
                    <p className='text-xs text-[#6B7280] truncate'>
                      {displayEmail}
                    </p>
                  </div>
                  <Link
                    href='/settings'
                    onClick={() => setUserMenuOpen(false)}
                    className='flex items-center gap-2 px-3 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB]'
                  >
                    <Settings className='h-4 w-4' />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='w-full flex items-center gap-2 px-3 py-2 text-sm text-[#EF4444] hover:bg-red-50'
                  >
                    <LogOut className='h-4 w-4' />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-200'
        style={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden='true'
      />
      <div
        className='fixed inset-y-0 left-0 z-50 w-65 bg-white shadow-xl flex flex-col lg:hidden transition-transform duration-300'
        style={{
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div className='flex items-center justify-between h-16 px-4 border-b border-[#E5E7EB]'>
          <Link href='/dashboard'>
            <Image
              src='/images/logo-dashboard.png'
              alt='VulnWatch AI'
              width={140}
              height={32}
              className='h-6 w-auto'
            />
          </Link>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(false)}
            className='text-[#6B7280]'
          >
            <X className='h-5 w-5' />
          </button>
        </div>
        <nav className='flex-1 px-3 py-4 space-y-1 overflow-y-auto'>
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-[#4B5563] hover:bg-[#F3F4F6]',
                )}
              >
                <Icon className='h-4.5 w-4.5 shrink-0' strokeWidth={1.8} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className='px-3 pb-6 border-t border-[#E5E7EB] pt-4'>
          <button
            onClick={handleLogout}
            className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#EF4444] hover:bg-red-50'
          >
            <LogOut className='h-4.5 w-4.5' strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
