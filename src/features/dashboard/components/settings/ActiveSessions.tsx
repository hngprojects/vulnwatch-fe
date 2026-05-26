"use client";

import Image from "next/image";
import { ChevronLeft, Ellipsis, LogOut, MonitorSmartphone } from "lucide-react";
import type { ActiveSession } from "@/types/settings.types";

const sessions: ActiveSession[] = [
  {
    id: "1",
    deviceName: "Windows Laptop, HP Spectre x360",
    browser: "Chrome",
    browserIcon: "/images/google.jpg",
    lastActive: "Today, 9:32AM",
    ipAddress: "102.45.xxx.xxx",
    location: "Akobo GRA, Ibadan, Nigeria",
    isCurrent: true,
  },
  {
    id: "2",
    deviceName: "iPhone 13 Pro Max",
    browser: "Safari",
    browserIcon: "/images/apple-safari 1.jpg",
    lastActive: "Yesterday, 6:32AM",
    ipAddress: "101.45.xxx.xxx",
    location: "Victoria Island, Lagos, Nigeria",
    isCurrent: false,
  },
  {
    id: "3",
    deviceName: "Samsung Galaxy S23",
    browser: "Chrome",
    browserIcon: "/images/google.jpg",
    lastActive: "Today, 1:15 PM",
    ipAddress: "192.168.1.105",
    location: "Yaba, Lagos, Nigeria",
    isCurrent: false,
  },
];

const mobileSessions: ActiveSession[] = [
  {
    id: "mobile-1",
    deviceName: "Windows Laptop, HP Spectre x360",
    browser: "Chrome",
    browserIcon: "/images/google.jpg",
    lastActive: "Yesterday, 1:20PM",
    ipAddress: "10.10.xxx.xxx",
    location: "Victoria Island, Lagos, Nigeria",
    isCurrent: true,
  },
  {
    id: "mobile-2",
    deviceName: "Techno Spark 10",
    browser: "Firefox",
    browserIcon: "/images/google.jpg",
    lastActive: "Yesterday, 1:20PM",
    ipAddress: "10.10.xxx.xxx",
    location: "Victoria Island, Lagos, Nigeria",
    isCurrent: false,
  },
  {
    id: "mobile-3",
    deviceName: "Samsung Galaxy S21",
    browser: "Firefox",
    browserIcon: "/images/google.jpg",
    lastActive: "Today, 8:45AM",
    ipAddress: "172.16.xxx.xxx",
    location: "Central, London, UK",
    isCurrent: false,
  },
];

function BrowserBadge({
  icon,
  browser,
}: {
  icon: string;
  browser: string;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 text-sm text-[#6667B0]">
      <Image
        src={icon}
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 shrink-0 rounded-full object-cover"
      />
      <span className="truncate">{browser}</span>
    </span>
  );
}

function LogoutButton() {
  return (
    <button
      type="button"
      className="inline-flex h-12 items-center justify-center gap-4 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:opacity-90"
    >
      Log out device
      <LogOut className="h-4 w-4" />
    </button>
  );
}

function DesktopSessionCard({ session }: { session: ActiveSession }) {
  return (
    <article className="bg-white px-4 py-6 sm:px-6">
      <div className="grid gap-y-6 text-sm sm:text-base md:grid-cols-[145px_minmax(0,1fr)]">
        <p className="text-[#2B2B2B]">Device Name:</p>
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <p className="font-medium text-[#2B2B2B]">{session.deviceName}</p>
          <span className="text-[#2B2B2B]">•</span>
          <BrowserBadge icon={session.browserIcon} browser={session.browser} />
        </div>

        <p className="text-[#2B2B2B]">Last Active:</p>
        <p className="text-[#2B2B2B]">{session.lastActive}</p>

        <p className="text-[#2B2B2B]">IP Address:</p>
        <p className="text-[#2B2B2B]">{session.ipAddress}</p>

        <p className="text-[#2B2B2B]">Location:</p>
        <p className="text-[#2B2B2B]">{session.location}</p>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        {session.isCurrent ? (
          <div className="flex items-center gap-3 text-sm sm:text-base text-[#2B2B2B]">
            <span className="h-3.5 w-3.5 rounded-full bg-[#03D684]" />
            Current Session
          </div>
        ) : (
          <LogoutButton />
        )}
        <button
          type="button"
          aria-label="More session options"
          className="grid h-8 w-8 place-items-center rounded-md text-[#2B2B2B] transition hover:bg-[#F3F4F6]"
        >
          <Ellipsis className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}

function MobileSessionCard({ session }: { session: ActiveSession }) {
  return (
    <article className="rounded-md bg-white px-3 py-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="space-y-5 text-sm text-[#2B2B2B]">
        <div>
          <p className="mb-4">Device Name:</p>
          <div className="flex min-w-0 items-center gap-2">
            <p className="min-w-0 truncate text-base font-medium">
              {session.deviceName}
            </p>
            <span className="shrink-0">•</span>
            <BrowserBadge icon={session.browserIcon} browser={session.browser} />
          </div>
        </div>

        <div>
          <p className="mb-4">Last Active:</p>
          <p className="text-base">{session.lastActive}</p>
        </div>

        <div>
          <p className="mb-4">IP Address:</p>
          <p className="text-base">{session.ipAddress}</p>
        </div>

        <div>
          <p className="mb-4">Location:</p>
          <p className="text-base">{session.location}</p>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-3">
        {session.isCurrent ? (
          <div className="flex items-center gap-3 text-base text-[#2B2B2B]">
            <span className="h-4 w-4 rounded-full bg-[#03D684]" />
            Current Session
          </div>
        ) : (
          <LogoutButton />
        )}
        <button
          type="button"
          aria-label="More session options"
          className="grid h-8 w-8 place-items-center rounded-md text-[#2B2B2B]"
        >
          <Ellipsis className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}

const ActiveSessions = () => {
  return (
    <div className="min-h-full">
      <div className="relative mx-auto max-w-6xl pb-10">
        <button
          type="button"
          aria-label="Go back"
          className="absolute left-0 top-1 hidden h-8 w-8 place-items-center rounded-md text-[#2B2B2B] transition hover:bg-white md:grid"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <header className="px-1 text-center">
          <h1 className="text-xl font-semibold text-[#2B2B2B] sm:text-2xl">
            Active Sessions
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#666666]">
            Manage active devices and login sessions.
          </p>
        </header>

        <div className="mt-7 px-1 sm:mt-9">
          <div className="mb-4 flex items-center gap-3 text-base text-[#2B2B2B]">
            <span>Active Devices</span>
            <MonitorSmartphone className="h-5 w-5" />
          </div>

          <div className="hidden space-y-9 md:block">
            {sessions.map((session) => (
              <DesktopSessionCard key={session.id} session={session} />
            ))}
          </div>

          <div className="space-y-8 md:hidden">
            {mobileSessions.map((session) => (
              <MobileSessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSessions;