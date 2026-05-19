import { privateApi } from "@/lib/axios";
import type {
  ApiResponse,
  CreateDomainPayload,
  Domain,
  DomainsListValue,
} from "../types/domain.types";

function unwrap<T>(res: { data: ApiResponse<T>; status: number }): T {
  if (!res.data.isSuccess || !res.data.value) {
    const err = new Error(res.data.error?.message ?? "Request failed") as Error & {
      response?: { status: number };
    };
    err.response = { status: res.status };
    throw err;
  }
  return res.data.value;
}

export const domainService = {
  async getDomains(): Promise<DomainsListValue> {
    const res = await privateApi.get<ApiResponse<DomainsListValue>>("/api/Domains");
    return unwrap(res);
  },

  async createDomain(payload: CreateDomainPayload): Promise<Domain> {
    const res = await privateApi.post<ApiResponse<Domain>>("/api/Domains", payload);
    return unwrap(res);
  },

  async verifyDomain(id: string): Promise<Domain> {
    const res = await privateApi.put<ApiResponse<Domain>>(
      `/api/Domains/${id}/verify`,
      null,
    );
    return unwrap(res);
  },

  async getDomain(domainId: string): Promise<Domain> {
    const res = await privateApi.get<ApiResponse<Domain>>(`/api/Domains/${domainId}`);
    return unwrap(res);
  },
};
