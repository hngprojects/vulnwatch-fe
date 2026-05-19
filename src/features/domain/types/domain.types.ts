export type VerificationMethod = "DNS_TXT" | "FILE_UPLOAD" | "EMAIL";
export type DomainStatus = "Verified" | "Pending" | "Failed";

export interface Domain {
  id: string;
  domain: string;
  status: DomainStatus;
  createdAt: string;
  updatedAt: string | null;
  lastScannedAt: string | null;
  lastSecurityScore: number | null;
  verificationToken?: string;
  verificationMethod?: VerificationMethod;
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
