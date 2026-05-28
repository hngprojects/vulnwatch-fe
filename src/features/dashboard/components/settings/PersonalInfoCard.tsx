import { Plus } from "lucide-react";
import type { ProfileForm } from "./types";

type PersonalInfoCardProps = {
  profile: ProfileForm;
  onEdit: () => void;
};

const PersonalInfoCard = ({ profile, onEdit }: PersonalInfoCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
      <h2 className="text-xl font-semibold text-[#2B2B2B]">Personal Information</h2>
      <p className="text-[16px] text-[#666666] mt-0.5">
        Update your personal details visible across the workspace.
      </p>

      <div className="flex items-center gap-4 mt-5">
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#E5E7EB] flex items-center justify-center shrink-0 overflow-hidden">
          {profile.firstName || profile.lastName ? (
            <span className="text-2xl font-semibold text-[#6B7280]">
              {profile.firstName.charAt(0).toUpperCase()}
              {profile.lastName.charAt(0).toUpperCase()}
            </span>
          ) : (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
              <circle cx="40" cy="30" r="13" fill="#9CA3AF" />
              <ellipse cx="40" cy="68" rx="22" ry="16" fill="#9CA3AF" />
            </svg>
          )}
        </div>

        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm sm:text-[16px] font-semibold text-white transition-colors bg-primary cursor-pointer"
        >
          <Plus className="w-5 h-5 text-white" />
          Edit profile
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="block text-[16px] font-normal text-[#2B2B2B] mb-1.5">First Name</p>
            <div className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] bg-[#F9FAFB]">
              {profile.firstName || "-"}
            </div>
          </div>
          <div>
            <p className="block text-[16px] font-normal text-[#2B2B2B] mb-1.5">Last Name</p>
            <div className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] bg-[#F9FAFB]">
              {profile.lastName || "-"}
            </div>
          </div>
        </div>

        <div>
          <p className="block text-[16px] font-normal text-[#2B2B2B] mb-1.5">Email Address</p>
          <div className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] bg-[#F9FAFB]">
            {profile.email || "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
