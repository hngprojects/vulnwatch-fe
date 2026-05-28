import { AlertTriangle, Loader2 } from "lucide-react";

type DeleteAccountSectionProps = {
  deleting: boolean;
  showDeleteConfirm: boolean;
  onShowDeleteConfirm: (show: boolean) => void;
  onDelete: () => Promise<void>;
};

const DeleteAccountSection = ({
  deleting,
  showDeleteConfirm,
  onShowDeleteConfirm,
  onDelete,
}: DeleteAccountSectionProps) => {
  return (
    <div className="bg-white rounded-2xl border border-[#FECACA] p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className="text-[#EF4444] shrink-0 mt-0.5" />
        <div>
          <h2 className="text-xl font-semibold text-[#2B2B2B]">Delete Account</h2>
          <p className="text-[16px] text-[#666666] mt-0.5">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="mt-5">
        {!showDeleteConfirm ? (
          <button
            onClick={() => onShowDeleteConfirm(true)}
            className="py-2.5 px-6 text-sm font-semibold text-[#EF4444] border border-[#FECACA] rounded-lg hover:bg-[#FEF2F2] transition-colors cursor-pointer"
          >
            Delete my account
          </button>
        ) : (
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium text-[#EF4444]">
              Are you sure? This will permanently delete your account and cannot be reversed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onDelete}
                disabled={deleting}
                className="py-2.5 px-6 text-sm font-semibold text-white bg-[#EF4444] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                {deleting ? "Deleting..." : "Yes, delete account"}
              </button>
              <button
                onClick={() => onShowDeleteConfirm(false)}
                disabled={deleting}
                className="py-2.5 px-6 text-sm font-semibold text-[#666666] border border-[#EDEDED] rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccountSection;
