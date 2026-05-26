"use client";

import Image from "next/image";
import {
  ChevronLeft,
  Ellipsis,
  LogOut,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import type { ActivityCheck } from "@/types/settings.types";

const checks: ActivityCheck[] = [
  {
    id: "strong-password",
    title: "Strong Password & Authentication",
    date: "Nov 03, 2025 11:59 AM",
    status: "PASS",
  },
  {
    id: "email-security-configured",
    title: "Email Security Configured",
    date: "Jun 27, 2026 04:30PM",
    status: "PASS",
  },
  {
    id: "session-security",
    title: "Session Security is Strong",
    date: "Feb 18, 2025 11:30PM",
    status: "PASS",
  },
  {
    id: "encryption",
    title: "Data Encryption Standards",
    date: "Jan 15, 2026 09:00 AM",
    status: "PASS",
  },
  {
    id: "network-frequency",
    title: "Trusted Network Frequency",
    date: "Jun 27, 2026 04:30PM",
    status: "PASS",
  },
  {
    id: "email-security-strong",
    title: "Email Security is Strong",
    date: "Feb 18, 2025 11:30PM",
    status: "PASS",
  },
  {
    id: "device-hardening",
    title: "Device Security Hardening",
    date: "Jun 27, 2026 04:30PM",
    status: "PASS",
  },
  {
    id: "session-security-repeat",
    title: "Session Security is Strong",
    date: "Feb 18, 2025 11:30PM",
    status: "PASS",
  },
];

function BrowserBadge() {
  return (
    <span className="inline-flex items-center gap-2 text-sm sm:text-base text-[#6667B0]">
      <Image
        src="/images/google.jpg"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 rounded-full object-cover"
      />
      Chrome
    </span>
  );
}

function StatusBadge({ status }: { status: ActivityCheck["status"] }) {
  return (
    <span className="inline-flex h-7 items-center gap-2 rounded-full bg-[#E8FFF3] px-3 text-xs font-semibold text-[#03B073]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#03B073]" />
      {status}
    </span>
  );
}

function ViewDetailsButton() {
  return (
    <button
      type="button"
      className="h-9 w-full max-w-[180px] bg-[#EAF3FF] px-5 text-sm font-medium text-[#2F80ED] transition hover:bg-[#DBEBFF]"
    >
      View details
    </button>
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

function DeviceInformation() {
  return (
    <section className="bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6 text-sm sm:text-base text-[#2B2B2B]">
        <p>Device Information:</p>
        <p className="font-medium">Windows Laptop, HP Spectre x 360</p>
        <p>
          Last Active : <span className="text-[#03B073]">Now</span>
        </p>
        <p>
          Browser: <BrowserBadge />
        </p>
        <p>Location: Lagos Nigeria</p>
        <p>IP Address: 102.xxx.xxx.xxx</p>
      </div>
    </section>
  );
}

function CurrentSessionCard() {
  return (
    <section className="rounded-md bg-white px-3 py-4 md:hidden">
      <div className="space-y-5 text-sm text-[#2B2B2B]">
        <div>
          <p className="mb-4">Device Name:</p>
          <div className="flex min-w-0 items-center gap-2">
            <p className="min-w-0 truncate text-base font-medium">
              Windows Laptop, HP Spectre x 360
            </p>
            <BrowserBadge />
          </div>
        </div>

        <div>
          <p className="mb-4">Last Active:</p>
          <p className="text-base">Yesterday, 1:20PM</p>
        </div>

        <div>
          <p className="mb-4">IP Address:</p>
          <p className="text-base">10.10.xxx.xxx</p>
        </div>

        <div>
          <p className="mb-4">Location:</p>
          <p className="text-base">Victoria Island, Lagos, Nigeria</p>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-base text-[#2B2B2B]">
          <span className="h-4 w-4 rounded-full bg-[#03D684]" />
          Current Session
        </div>
        <button
          type="button"
          aria-label="More session options"
          className="grid h-8 w-8 place-items-center rounded-md text-[#2B2B2B]"
        >
          <Ellipsis className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function ActivityTable() {
  return (
    <section className="hidden bg-white px-4 py-4 sm:px-6 md:block">
      <div className="divide-y-0">
        {checks.map((check) => (
          <div
            key={check.id}
            className="grid min-h-13 grid-cols-[1.3fr_1fr_120px_180px] items-center gap-5 text-sm text-[#2B2B2B]"
          >
            <p>{check.title}</p>
            <p>{check.date}</p>
            <StatusBadge status={check.status} />
            <ViewDetailsButton />
          </div>
        ))}
      </div>
    </section>
  );
}

function ActivityCards() {
  return (
    <section className="space-y-10 bg-white px-4 py-5 sm:px-6 md:hidden">
      {checks.map((check) => (
        <article key={check.id} className="text-[#2B2B2B]">
          <p className="text-base font-medium">{check.title}</p>
          <p className="mt-7 text-sm">{check.date}</p>
          <div className="mt-5">
            <StatusBadge status={check.status} />
          </div>
          <div className="mt-4">
            <ViewDetailsButton />
          </div>
        </article>
      ))}
    </section>
  );
}

const SessionActivity = () => {
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

        <div className="mt-7 px-1 sm:mt-9 md:hidden">
          <div className="mb-4 flex items-center gap-3 text-base text-[#2B2B2B]">
            <span>Active Devices</span>
            <MonitorSmartphone className="h-5 w-5" />
          </div>
          <CurrentSessionCard />
        </div>

        <div className="mt-8 hidden md:block">
          <DeviceInformation />
        </div>

        <section className="mt-6 border-y border-[#F0F0F0] bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-5 text-lg font-semibold text-[#2B2B2B] md:text-xl">
            <Sparkles className="h-5 w-5" />
            <span className="hidden md:inline">VulnWatch Device Activity Scan</span>
            <span className="md:hidden">VulnWatch Activity Detection</span>
          </div>
        </section>

        <div className="mt-6">
          <ActivityTable />
          <ActivityCards />
        </div>

        <div className="mt-6 px-1">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default SessionActivity;
