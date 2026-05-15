"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function UserAvatarButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-3 items-center">
          <Image
            src="images/dashboard-topbar/user-avatar.jpg"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-lg"
            priority={true}
          />
          <div className="space-y-1">
            <p className="font-bold text-gray-900">Grace David</p>
            <p className="text-sm text-gray-500">
              2417761791@myhunter.cmu.ac.th
            </p>
          </div>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
