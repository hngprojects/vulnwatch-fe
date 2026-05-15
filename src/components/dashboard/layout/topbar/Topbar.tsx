import SearchBox from "@/components/SearchBox";
import Link from "next/link";
import UserAvatarButton from "./UserAvatarButton";

export default function DashboardTopbar() {
  return (
    <div className="items-center justify-between flex-wrap whitespace-nowrap gap-5 gap-y-2 p-4 hidden lg:flex">
      <SearchBox placeholder="Scan IP or Domain" />
      <nav className="flex items-center gap-5">
        <ul className="flex items-center gap-5">
          <li>
            <Link href="/security-docs">Security Docs</Link>
          </li>
          <li>
            <Link href="/api-access">API Access</Link>
          </li>
        </ul>
      </nav>
      {/* <UserAvatarButton /> */}
    </div>
  );
}
