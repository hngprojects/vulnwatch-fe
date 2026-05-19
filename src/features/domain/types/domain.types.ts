export type VerificationMethod = "DNS_TXT" | "FILE_UPLOAD" | "EMAIL";
export type DomainStatus = "VERIFIED" | "PENDING" | "FAILED";

export interface Domain {
  id: string;
  name: string;
  verificationMethod: VerificationMethod;
  status: DomainStatus;
  lastScan: string | null;
  securityScore: number | null;
  verificationToken: string;
  createdAt: string;
}

export interface CreateDomainPayload {
  domain: string;
}

export interface DomainLinks {
  self: string;
  next: string | null;
  prev: string | null;
}

export interface DomainsListValue {
  data: Domain[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  links: DomainLinks;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: { code: string; message: string } | null;
}
