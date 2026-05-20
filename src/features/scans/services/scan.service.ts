import { privateApi } from "@/lib/axios";

// Maps our internal UI enum values to what the API expects
const COVERAGE_MAP: Record<string, "Quick" | "Full"> = {
  QUICK_SCAN: "Quick",
  FULL_SCAN: "Full",
};

export interface CreateScanPayload {
  domain: string;
  scanType: "QUICK_SCAN" | "FULL_SCAN";
  // emailNotification is intentionally excluded until the backend adds it to POST /api/Scans
  // TODO: add notifyOnComplete: boolean when backend supports it
}

export interface ScanResponse {
  scanId: string;
  status: "Queued" | string;
  message: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: {
    code: string;
    message: string;
  } | null;
}

// Helper function to extract only the pure domain name from any input URL/string
function cleanDomain(input: string): string {
  if (!input) return "";
  // 1. Remove protocol (http://, https://) and optional 'www.'
  let cleaned = input.trim().toLowerCase();
  cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, "");
  // 2. Remove trailing paths or query parameters
  cleaned = cleaned.split("/")[0];
  // 3. Remove ports if present
  cleaned = cleaned.split(":")[0];
  return cleaned;
}

export const scanService = {
  async createScan(
    payload: CreateScanPayload,
  ): Promise<ApiResponse<ScanResponse>> {
    const response = await privateApi.post<ApiResponse<ScanResponse>>(
      "/api/Scans",
      {
        domain: cleanDomain(payload.domain),
        coverage: COVERAGE_MAP[payload.scanType],
        // notifyOnComplete: payload.emailNotification, // ← uncomment when backend adds this field
      },
      {
        headers: {
          // Idempotency-Key prevents duplicate scans if the request is retried
          "Idempotency-Key": crypto.randomUUID(),
        },
      },
    );
    return response.data;
  },
};
