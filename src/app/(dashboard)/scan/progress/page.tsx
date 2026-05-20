import ScanProgress from "@/features/scans/scan-progress/views/ScanProgress";

export const metadata = {
  title: "Scan Progress - New Scan",
  description: "Scan Progress",
};

export default async function ScanProgressPage({
  searchParams,
}: {
  searchParams: Promise<{ scanId?: string | string[] }>;
}) {
  const { scanId } = await searchParams;
  const activeScanId = Array.isArray(scanId) ? scanId[0] : scanId;

  return <ScanProgress scanId={activeScanId} />;
}
