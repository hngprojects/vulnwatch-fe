"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";

type Session = {
  id: string;
  deviceName: string;
  browser: string;
  browserIcon: string;
  lastActive: string;
  ipAddress: string;
  location: string;
  isCurrent: boolean;
};

const sessions: Session[] = [
  {
    id: "1",
    deviceName: "Windows Laptop, HP Spectre x 360",
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
    ipAddress: "101. 45.xxx.xxx",
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

const SessionManagement = () => {
  const handleLogout = (id: string) => {
    // TODO: call API to revoke session by id
    console.log("Logging out session:", id);
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white rounded-2xl border border-[#E5E7EB] p-6"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-[#2B2B2B]">
              <span className="font-normal text-brand-gray w-28 shrink-0">Device Name:</span>
              <span className="font-medium">{session.deviceName}</span>
              <span className="text-[#D1D5DB]">•</span>
              <Image
                src={session.browserIcon}
                alt={session.browser}
                width={16}
                height={16}
                className="rounded-full shrink-0 object-cover"
              />
              <span className="font-medium text-[#6366F1]">{session.browser}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-normal text-brand-gray w-28 shrink-0">Last Active:</span>
              <span className="text-[#2B2B2B]">{session.lastActive}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-normal text-brand-gray w-28 shrink-0">IP Address:</span>
              <span className="text-[#2B2B2B]">{session.ipAddress}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-normal text-brand-gray w-28 shrink-0">Location:</span>
              <span className="text-[#2B2B2B]">{session.location}</span>
            </div>
          </div>

          {session.isCurrent ? (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                <span className="text-sm text-[#2B2B2B] font-medium">Current Session</span>
              </div>
              <span className="text-[#9CA3AF] text-lg leading-none">–</span>
            </div>
          ) : (
            <div className="mt-5">
              <button
                onClick={() => handleLogout(session.id)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity"
              >
                Log out device
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SessionManagement;
