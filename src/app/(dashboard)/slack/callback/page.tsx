"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function SlackCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("slack");
    const reason = searchParams.get("reason");

    if (status === "success") {
      toast.success("Slack workspace connected successfully!");
    } else if (status === "denied") {
      toast.error("Slack connection was denied.");
    } else if (status === "error") {
      toast.error(`Failed to connect Slack: ${reason || "Unknown error"}`);
    }

    // Always redirect back to settings
    router.replace("/settings");
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <h2 className="text-lg font-semibold text-slate-800">Completing Slack Integration...</h2>
      <p className="text-sm text-slate-500">Please wait while we redirect you.</p>
    </div>
  );
}

export default function SlackCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    }>
      <SlackCallbackContent />
    </Suspense>
  );
}
