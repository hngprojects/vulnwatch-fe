import { privateApi } from "@/lib/axios";
import axios from "axios";

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
  detail?: string;
  title?: string;
  explanation?: string;
}

export interface FindingDto {
  id: string;
  surface: string;
  severity: string;
  title: string;
  cveId: string | null;
  explanation: string;
  remediationSteps: string[];
  technicalDetail: unknown;
  status: string;
}

export interface ScanSummaryDto {
  criticalIssues: (string | FindingDto)[] | null;
  highSeverityIssues: (string | FindingDto)[] | null;
  mediumSeverityIssues?: (string | FindingDto)[] | null;
  lowSeverityIssues?: (string | FindingDto)[] | null;
  goodNews: string | null;
  topRecommendation?: string | null;
  headline?: string | null;
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
  requestedBy?: string;
  securityScore: number;
  status: string; // e.g. "Completed"
  coverage?: string;
  riskLevel?: string | null;
  initiatedAt?: string;
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

export interface SubScoreItem {
  score: number;
  status: string | null;
  detail: string | null;
}

export interface SubScoresDto {
  exposure: SubScoreItem | null;
  ssl: SubScoreItem | null;
  dns: SubScoreItem | null;
}

export interface ScanReportDto {
  scanId: string;
  domainId: string;
  domainName: string | null;
  domainStatus: string;
  status: "Queued" | "Running" | "Completed" | "Failed" | string;
  coverage: "Quick" | "Full" | string;
  securityScore: number | null;
  riskLevel: string | null;
  completedAt: string | null;
  summary: ScanSummaryDto | null;
  findingGroups: FindingGroupsDto | null;
  subScores: SubScoresDto | null;
}

function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    const apiMessage = error.response?.data?.error?.message;
    if (apiMessage) {
      return apiMessage;
    }

    if (error.response?.status) {
      return `Request failed with status code ${error.response.status}`;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Request failed";
}

function normalizeSubScore(item: SubScoreItem | null | undefined): ScanSubScore {
  return {
    score: item?.score ?? 0,
    status: item?.status ?? "Unknown",
    detail: item?.detail ?? undefined,
  };
}

function normalizeScanReport(dto: ScanReportDto): ScanReport {
  return {
    scanId: dto.scanId,
    domainId: dto.domainId,
    domainName: dto.domainName ?? "",
    domainStatus: dto.domainStatus,
    securityScore: dto.securityScore ?? 0,
    status: dto.status,
    coverage: dto.coverage,
    riskLevel: dto.riskLevel,
    completedAt: dto.completedAt ?? undefined,
    summary: dto.summary ?? null,
    findingGroups: dto.findingGroups ?? null,
    subScores: {
      exposure: normalizeSubScore(dto.subScores?.exposure),
      ssl: normalizeSubScore(dto.subScores?.ssl),
      dns: normalizeSubScore(dto.subScores?.dns),
    },
  };
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

export interface ScanHistoryItem {
  scanId: string;
  domainId: string;
  domainName: string;
  status: string;
  riskLevel: string | null;
  coverage: string;
  createdAt: string;
  completedAt?: string | null;
}

export interface ScanHistoryResponse {
  data: ScanHistoryItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
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
    try {
      const response = await privateApi.get<ApiResponse<ScanReportDto>>(
        `/api/Scans/${scanId}/report`,
      );

      if (!response.data.isSuccess || !response.data.value) {
        return {
          isSuccess: false,
          value: null,
          error: response.data.error ?? {
            code: "SCAN_REPORT_ERROR",
            message: "Unable to load scan report.",
          },
        };
      }

      return {
        isSuccess: true,
        value: normalizeScanReport(response.data.value),
        error: null,
      };
    } catch (error) {
      return {
        isSuccess: false,
        value: null,
        error: {
          code: "SCAN_REPORT_ERROR",
          message: getApiErrorMessage(error),
        },
      };
    }
  },

  async getScanHistory(domainId: string): Promise<ApiResponse<ScanHistoryResponse>> {
    const response = await privateApi.get<ApiResponse<ScanHistoryResponse>>(
      `/api/Scans/${domainId}/history`
    );
    return response.data;
  },
};

