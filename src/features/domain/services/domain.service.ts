import { publicApi } from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";
import type {
  ApiResponse,
  CreateDomainPayload,
  Domain,
  DomainsListValue,
} from "../types/domain.types";

function authHeaders() {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

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
    const res = await publicApi.get<ApiResponse<DomainsListValue>>("/api/Domains", {
      headers: authHeaders(),
    });
    return unwrap(res);
  },

  async createDomain(payload: CreateDomainPayload): Promise<Domain> {
    const res = await publicApi.post<ApiResponse<Domain>>("/api/Domains", payload, {
      headers: authHeaders(),
    });
    return unwrap(res);
  },

  async verifyDomain(id: string): Promise<Domain> {
    const res = await publicApi.put<ApiResponse<Domain>>(
      `/api/Domains/${id}/verify`,
      null,
      { headers: authHeaders() },
    );
    return unwrap(res);
  },

  async getDomain(domainId: string): Promise<Domain> {
    const res = await publicApi.get<ApiResponse<Domain>>(`/api/Domains/${domainId}`, {
      headers: authHeaders(),
    });
    return unwrap(res);
  },
};
