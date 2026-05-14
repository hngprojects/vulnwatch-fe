import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={ROUTES.LOGIN}
        className="border-primary text-body flex h-12 items-center justify-center gap-1.5 rounded-xl border bg-white px-6 py-3 text-base leading-6 font-medium transition-opacity duration-200 hover:opa
      >
        Log in
      </Link>

      <Link
        href={ROUTES.REGISTER}
        className="border-secondary bg-primary flex h-12 items-center justify-center gap-1.5 rounded-xl border py-3 pr-4 pl-6 text-base leading-6 font-medium text-white transition-opacity duration-200
      >
        Start Free Trial
        <ArrowRight
          className="h-[11px] w-[14px] shrink-0 stroke-white"
          strokeWidth={1.4}
        />
      </Link>
    </div>
  );
}
