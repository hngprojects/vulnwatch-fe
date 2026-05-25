"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Columns3Cog,
  Filter,
  Globe,
  Plus,
  Trash2,
  X,
} from "lucide-react";

type DomainRow = {
  domain: string;
  createdAt: string;
  owner: string;
  status: "Verified" | "Pending";
};

type Role = "Owner" | "Admin" | "Viewer";

type Member = {
  id: string;
  name: string;
  email?: string;
  role: Role;
};

type PermissionRow = {
  title: string;
  description: string;
  owner: boolean;
  admin: boolean;
  viewer: boolean;
};

type PermissionSection = {
  title: string;
  rows: PermissionRow[];
};

const domainRows: DomainRow[] = [
  {
    domain: "acme.com",
    createdAt: "Added on May 12, 2024",
    owner: "Daniel Shiper",
    status: "Verified",
  },
  {
    domain: "shopifyplus.io",
    createdAt: "Added on May 10, 2024",
    owner: "Francis Daniel",
    status: "Verified",
  },
  {
    domain: "fintechlabs.co",
    createdAt: "Added on May 08, 2024",
    owner: "Shiper Francis",
    status: "Pending",
  },
  {
    domain: "securepay.net",
    createdAt: "Added on May 05, 2024",
    owner: "Johnson Sam",
    status: "Pending",
  },
  {
    domain: "market.acme.com",
    createdAt: "Added on Apr 28, 2024",
    owner: "Johnson Sam",
    status: "Verified",
  },
  {
    domain: "oldsite.acme.com",
    createdAt: "Added on Apr 18, 2024",
    owner: "Johnson Sam",
    status: "Verified",
  },
];

const ownerMember: Member = {
  id: "owner",
  name: "Daniel Shiper",
  email: "Danielshiper@acme.com",
  role: "Owner",
};

const initialMembers: Member[] = [
  { id: "member-1", name: "Francis Daniel", role: "Viewer" },
  { id: "member-2", name: "Francis Shiper", role: "Admin" },
  { id: "member-3", name: "Johnson Sam", role: "Admin" },
];

const permissionSections: PermissionSection[] = [
  {
    title: "Domain Management",
    rows: [
      {
        title: "Verify domain",
        description: "Add and verify ownership via DNS or file",
        owner: true,
        admin: false,
        viewer: false,
      },
      {
        title: "Delete domain",
        description: "Permanently remove domain from workspace",
        owner: true,
        admin: false,
        viewer: false,
      },
      {
        title: "Transfer ownership",
        description: "Hand off domain owner role to another member",
        owner: true,
        admin: false,
        viewer: false,
      },
    ],
  },
  {
    title: "Scan and Reports",
    rows: [
      {
        title: "Initiate scan",
        description: "Start new security or compliance scans",
        owner: true,
        admin: true,
        viewer: false,
      },
      {
        title: "View scan results",
        description: "See completed scan output and findings",
        owner: true,
        admin: true,
        viewer: true,
      },
      {
        title: "Export reports",
        description: "Download reports as PDF or CSV",
        owner: true,
        admin: true,
        viewer: false,
      },
    ],
  },
  {
    title: "Access Control",
    rows: [
      {
        title: "Manage members access",
        description: "Download reports as PDF or CSV",
        owner: true,
        admin: true,
        viewer: false,
      },
      {
        title: "Invite new member",
        description: "Send domain-level access invitations",
        owner: true,
        admin: true,
        viewer: false,
      },
    ],
  },
];

const statusClasses: Record<DomainRow["status"], string> = {
  Verified: "bg-[#C8F6DF] text-[#0F5132]",
  Pending: "bg-[#B8F279] text-[#FF8A00]",
};

function UserAvatar({
  name,
  large = false,
  solid = false,
}: {
  name: string;
  large?: boolean;
  solid?: boolean;
}) {
  const initials = useMemo(() => {
    const parts = name.split(" ").filter(Boolean);
    return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  }, [name]);

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        large ? "h-12 w-12 text-sm" : "h-8 w-8 text-[10px]",
        solid ? "bg-[#2E2E2E] text-white" : "bg-[#16313D] text-[#A9F379]",
      ].join(" ")}
    >
      {initials}
    </div>
  );
}

function AccessIcon({ allowed }: { allowed: boolean }) {
  return (
    <div className="flex justify-center">
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#434343] text-[#434343]">
        {allowed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </div>
    </div>
  );
}

export default function RolesPermissionsPage() {
  const [isManageAccessOpen, setIsManageAccessOpen] = useState(false);
  const [isRemoveUserOpen, setIsRemoveUserOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<DomainRow>(domainRows[0]);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [roleMenuOpenFor, setRoleMenuOpenFor] = useState<string | null>(null);
  const [memberPendingRemoval, setMemberPendingRemoval] = useState<Member | null>(null);

  const openManageAccess = (row: DomainRow) => {
    setSelectedDomain(row);
    setIsManageAccessOpen(true);
    setIsRemoveUserOpen(false);
    setRoleMenuOpenFor(null);
  };

  const closeManageAccess = () => {
    setIsManageAccessOpen(false);
    setIsRemoveUserOpen(false);
    setRoleMenuOpenFor(null);
    setMemberPendingRemoval(null);
  };

  const promptRemoveMember = (member: Member) => {
    setMemberPendingRemoval(member);
    setIsRemoveUserOpen(true);
    setRoleMenuOpenFor(null);
  };

  const confirmRemoveMember = () => {
    if (!memberPendingRemoval) return;

    setMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== memberPendingRemoval.id),
    );
    setIsRemoveUserOpen(false);
    setMemberPendingRemoval(null);
  };

  const setRole = (memberId: string, role: Exclude<Role, "Owner">) => {
    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === memberId ? { ...member, role } : member,
      ),
    );
    setRoleMenuOpenFor(null);
  };

  return (
    <div className="space-y-10 pb-10">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div />
          <button
            type="button"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-primary px-6 text-lg font-medium text-white transition hover:bg-primary/95"
          >
            <Plus className="h-5 w-5" />
            Add New Authorized User
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex h-10 min-w-25 items-center justify-between rounded-xl border border-[#D9D9D9] bg-white px-4 text-left text-[15px] text-[#2B2B2B]"
            >
              All
              <ChevronDown className="h-4 w-4 text-[#666666]" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 min-w-70 items-center justify-between rounded-xl border border-[#D9D9D9] bg-white px-4 text-[15px] text-[#2B2B2B]"
            >
              <span>May 12, 2026 - May 18, 2026</span>
              <CalendarDays className="h-4 w-4 text-[#666666]" />
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9D9D9] bg-white px-4 text-[15px] text-[#2B2B2B]"
            >
              Column View
              <Columns3Cog className="h-4 w-4 text-[#666666]" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9D9D9] bg-white px-4 text-[15px] text-[#2B2B2B]"
            >
              Filter
              <Filter className="h-4 w-4 text-[#666666]" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-[#ECECEC] bg-white">
          <div className="hidden grid-cols-[2.1fr_1.5fr_1fr_1fr] bg-[#F3F3F3] px-7 py-5 text-[15px] font-semibold text-[#303030] md:grid">
            <div className="flex items-center gap-2">
              Domain
              <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[#787878]" />
            </div>
            <div className="flex items-center gap-2">
              Owner
              <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[#787878]" />
            </div>
            <div className="flex items-center gap-2">
              Status
              <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[#787878]" />
            </div>
            <div className="flex items-center justify-end gap-2">
              Actions
              <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[#787878]" />
            </div>
          </div>

          <div className="divide-y divide-[#EFEFEF]">
            {domainRows.map((row, index) => (
              <div
                key={row.domain}
                className="grid gap-4 px-4 py-5 md:grid-cols-[2.1fr_1.5fr_1fr_1fr] md:px-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF5DB]">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[16px] font-medium text-[#2B2B2B]">
                      {row.domain}
                    </p>
                    <p className="text-[14px] text-[#3E3E3E]">{row.createdAt}</p>
                  </div>
                </div>

                <div className="flex items-center text-[16px] text-[#2B2B2B]">
                  {row.owner}
                </div>

                <div className="flex items-center">
                  <span
                    className={[
                      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
                      statusClasses[row.status],
                    ].join(" ")}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-current opacity-90" />
                    {row.status}
                  </span>
                </div>

                <div className="flex items-center md:justify-end">
                  <button
                    type="button"
                    onClick={() => openManageAccess(row)}
                    className={[
                      "inline-flex h-11 items-center justify-center rounded-md border px-5 text-[15px] font-medium transition",
                      index === 0
                        ? "border-primary bg-primary text-white"
                        : "border-[#D6D6D6] bg-white text-[#2B2B2B] hover:border-primary/30",
                    ].join(" ")}
                  >
                    Manage Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[28px] bg-white px-7 py-6 shadow-[0_0_0_1px_rgba(20,20,20,0.04)]">
        <div className="mb-8">
          <h1 className="text-[30px] font-semibold text-[#2B2B2B] md:text-[40px]">
            Roles and Permission
          </h1>
          <p className="mt-2 text-xl text-[#8B8B8B]">
            Control what each role can access.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[860px] overflow-hidden rounded-[20px] border border-[#E9E9E9]">
            <div className="grid grid-cols-[2.3fr_1fr_1fr_1fr] bg-[#F5F5F5] px-4 py-5 text-center text-[18px] font-semibold text-[#303030] md:px-6">
              <div>Permissions</div>
              <div>Owner</div>
              <div>Admin</div>
              <div>Viewer</div>
            </div>

            {permissionSections.map((section) => (
              <div key={section.title}>
                <div className="border-y border-[#909090] px-4 py-2 text-[18px] text-[#2B2B2B] md:px-6">
                  {section.title}
                </div>

                {section.rows.map((row) => (
                  <div
                    key={row.title}
                    className="grid grid-cols-[2.3fr_1fr_1fr_1fr] border-b border-[#E8E8E8] px-4 py-3 md:px-6"
                  >
                    <div>
                      <p className="text-[18px] font-medium text-[#2B2B2B]">
                        {row.title}
                      </p>
                      <p className="text-[15px] text-[#B0B0B0]">
                        {row.description}
                      </p>
                    </div>
                    <AccessIcon allowed={row.owner} />
                    <AccessIcon allowed={row.admin} />
                    <AccessIcon allowed={row.viewer} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {(isManageAccessOpen || isRemoveUserOpen) && (
        <div
          className="fixed inset-0 z-40 bg-[#9A9A9A]/45 backdrop-blur-[2px]"
          onClick={closeManageAccess}
        />
      )}

      {isManageAccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="w-full max-w-[720px] rounded-[18px] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.16)] md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8">
              <h2 className="text-[34px] leading-none font-semibold text-[#2B2B2B]">
                Manage Access
              </h2>
              <p className="mt-2 text-[18px] text-[#3F4E57]">
                {selectedDomain.domain}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-4 rounded-[4px] bg-[#FCFCFC] px-5 py-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                  <UserAvatar name={ownerMember.name} solid large />
                  <div>
                    <p className="text-[18px] font-medium text-[#2B2B2B]">
                      {ownerMember.name}
                    </p>
                    <p className="text-[14px] text-[#424242]">{ownerMember.email}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex h-11 min-w-40 items-center justify-center gap-3 rounded-xl bg-primary px-5 text-[16px] font-medium text-white"
                >
                  Owner
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5 rounded-[4px] bg-[#FCFCFC] px-5 py-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="relative flex items-center gap-5">
                      <UserAvatar name={member.name} />
                      <div className="flex flex-wrap items-center gap-4">
                        <p className="text-[18px] font-medium text-[#2B2B2B]">
                          {member.name}
                        </p>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setRoleMenuOpenFor((current) =>
                                current === member.id ? null : member.id,
                              )
                            }
                            className="inline-flex items-center gap-1 text-[15px] text-[#565656]"
                          >
                            {member.role}
                            <ChevronDown className="h-4 w-4" />
                          </button>

                          {roleMenuOpenFor === member.id && (
                            <div className="absolute left-0 top-full z-10 mt-2 w-22 overflow-hidden border border-[#9BA7B1] bg-white shadow-sm">
                              {(["Admin", "Viewer"] as const).map((roleOption) => (
                                <button
                                  key={roleOption}
                                  type="button"
                                  onClick={() => setRole(member.id, roleOption)}
                                  className={[
                                    "block w-full px-2 py-1 text-left text-[15px]",
                                    member.role === roleOption
                                      ? "bg-primary text-white"
                                      : "text-[#3C3C3C] hover:bg-[#F4F4F4]",
                                  ].join(" ")}
                                >
                                  {roleOption}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                      <button
                        type="button"
                        onClick={() => promptRemoveMember(member)}
                        className="text-[15px] font-medium text-[#B10000]"
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        onClick={() => promptRemoveMember(member)}
                        className="text-[#646464]"
                        aria-label={`Remove ${member.name}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeManageAccess}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-primary bg-white px-8 text-[16px] font-semibold text-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={closeManageAccess}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-primary bg-white px-8 text-[16px] font-semibold text-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {isRemoveUserOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="w-full max-w-[664px] rounded-[18px] bg-white px-6 py-14 text-center shadow-[0_24px_80px_rgba(0,0,0,0.16)] md:px-10"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-[32px] font-semibold text-[#2B2B2B]">
              Remove User
            </h3>
            <p className="mt-6 text-[18px] text-[#2F2F2F]">
              Are you sure you want to remove this user from domain ?
            </p>
            <p className="mt-6 text-[18px] text-[#6F6F6F]">
              They will lose access to all domains and reports
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsRemoveUserOpen(false)}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-primary bg-white px-8 text-[16px] font-semibold text-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRemoveMember}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-primary bg-white px-8 text-[16px] font-semibold text-primary"
              >
                Remove user
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
