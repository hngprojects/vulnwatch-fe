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
  initiatedAt?: string;
}

export interface ScanSubScore {
  status: string; // e.g. "Pass"
  score: number;
  detail: string;
}

export interface ScanSummaryDto {
  criticalIssues: string[] | null;
  highSeverityIssues: string[] | null;
  goodNews: string | null;
}

export interface FindingGroupsDto {
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  passCount: number;
}

export interface ScanReport {
  scanId: string;
  domainId: string;
  domainName: string;
  domainStatus?: string;
  requestedBy: string;
  securityScore: number;
  status: string; // e.g. "Completed"
  coverage?: string;
  riskLevel?: string | null;
  initiatedAt: string;
  completedAt?: string;
  summary?: ScanSummaryDto | null;
  findingGroups?: FindingGroupsDto | null;
  subScores: {
    exposure: ScanSubScore;
    ssl: ScanSubScore;
    dns: ScanSubScore;
  };
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

  async getScanReport(scanId: string): Promise<ApiResponse<ScanReport>> {
    const response = await privateApi.get<ApiResponse<ScanReport>>(
      `/api/Scans/${scanId}/report`
    );
    return response.data;
  },
};

