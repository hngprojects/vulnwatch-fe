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
export function cleanDomain(input: string): string | null {
  if (!input) return null;
  let cleaned = input.trim().toLowerCase();

  try {
    let urlToParse = cleaned;
    if (!/^(https?:)?\/\//i.test(cleaned)) {
      urlToParse = `http://${cleaned}`;
    }
    const parsed = new URL(urlToParse);
    let hostname = parsed.hostname;

    if (hostname.startsWith("www.")) {
      hostname = hostname.substring(4);
    }
    return hostname || null;
  } catch {
    // Fall back to manual normalization if parsing fails
    cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, "");
    // Explicitly remove query strings and hashes
    cleaned = cleaned.split("#")[0].split("?")[0];
    cleaned = cleaned.split("/")[0];
    cleaned = cleaned.split(":")[0];
    return cleaned || null;
  }
}

export const scanService = {
  async createScan(
    payload: CreateScanPayload,
  ): Promise<ApiResponse<ScanResponse>> {
    const cleanedDomain = cleanDomain(payload.domain);
    if (!cleanedDomain) {
      throw new Error("Invalid domain name");
    }

    const response = await privateApi.post<ApiResponse<ScanResponse>>(
      "/api/Scans",
      {
        domain: cleanedDomain,
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
