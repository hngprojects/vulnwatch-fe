import { privateApi } from "@/lib/axios";
import type {
  ApiResponse,
  CreateDomainPayload,
  CreateDomainResponse,
  Domain,
  DomainsListValue,
} from "../types/domain.types";

function unwrap<T>(res: { data: ApiResponse<T>; status: number }): T {
  if (!res.data.isSuccess || !res.data.value) {
    const msg = res.data.error?.message ?? "Request failed";
    const err = new Error(msg) as Error & { response?: { status: number } };
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

  async createDomain(payload: CreateDomainPayload): Promise<CreateDomainResponse> {
    const res = await privateApi.post<ApiResponse<CreateDomainResponse>>("/api/Domains", payload);
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

  async deleteDomain(id: string): Promise<{ message: string }> {
    const res = await privateApi.delete<ApiResponse<{ message: string }>>(`/api/Domains/${id}`);
    return unwrap(res);
  },
};
