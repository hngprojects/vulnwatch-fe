import { Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProfileForm } from "./types";

type EditProfileModalProps = {
  open: boolean;
  form: ProfileForm;
  saving: boolean;
  isDirty: boolean;
  onOpenChange: (open: boolean) => void;
  onFormChange: (nextForm: ProfileForm) => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
};

const EditProfileModal = ({
  open,
  form,
  saving,
  isDirty,
  onOpenChange,
  onFormChange,
  onCancel,
  onSave,
}: EditProfileModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-0 left-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 rounded-none border-0 p-0 sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[85vh] sm:w-[70vw] sm:max-w-4xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:border sm:border-[#E5E7EB] sm:p-6"
      >
        <div className="relative flex h-full flex-col overflow-y-auto px-4 pb-5 pt-6 sm:p-0">
          <DialogClose
            className="cursor-pointer absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-[#F3F4F6]"
            aria-label="Close edit profile modal"
          >
            <X className="h-5 w-5" />
          </DialogClose>

          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
            <DialogHeader className="mt-10 space-y-2 text-left sm:mt-0">
              <DialogTitle className="text-xl leading-[42px] font-semibold text-[#2B2B2B] text-2xl sm:leading-[38px]">
                Edit Profile
              </DialogTitle>
              <DialogDescription className="text-[16px] leading-7 text-[#666666]">
                Update your personal details visible across the workspace.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-[16px] font-normal text-[#2B2B2B]">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    placeholder="First name"
                    onChange={(e) => onFormChange({ ...form, firstName: e.target.value })}
                    className="w-full border border-[#E5E7EB] rounded-lg px-3 py-3 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[16px] font-normal text-[#2B2B2B]">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    placeholder="Last name"
                    onChange={(e) => onFormChange({ ...form, lastName: e.target.value })}
                    className="w-full border border-[#E5E7EB] rounded-lg px-3 py-3 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-7">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={onCancel}
                  disabled={!isDirty || saving}
                  className="min-w-[140px] py-3 px-5 text-sm sm:text-[16px] font-semibold text-[#666666] border border-[#EDEDED] rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  disabled={saving}
                  className="min-w-[190px] py-3 px-6 text-sm sm:text-[16px] font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {saving && <Loader2 size={15} className="animate-spin" />}
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>

          <DialogClose className="sr-only">Close</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
