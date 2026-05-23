import { RegisterVerifyEmail } from "@/features/auth/components/RegisterVerifyEmail";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center bg-[#FAFAFA]">
          <Loader2 className="h-8 w-8 animate-spin text-[#072E28]" />
        </div>
      }
    >
      <RegisterVerifyEmail />
    </Suspense>
  );
}
