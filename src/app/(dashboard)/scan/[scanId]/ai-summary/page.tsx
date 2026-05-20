import { AISecuritySummary } from "@/features/dashboard/components/AISecuritySummary";

export default async function ScanAISummaryPage({
  params,
}: {
  params: Promise<{ scanId: string }>;
}) {
  const { scanId } = await params;

  return (
    <AISecuritySummary
      backHref={`/scan/${encodeURIComponent(scanId)}/report`}
    />
  );
}
