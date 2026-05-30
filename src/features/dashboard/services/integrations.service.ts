import { privateApi } from "@/lib/axios";

interface ApiResponse<T> {
  isSuccess: boolean;
  value: T;
  error: { code: string; message: string } | null;
}

function unwrap<T>(res: { data: ApiResponse<T>; status: number }): T {
  if (!res.data.isSuccess || res.data.value === undefined) {
    throw new Error(res.data.error?.message ?? `Request failed (${res.status})`);
  }
  return res.data.value;
}

export interface SlackStatus {
  isConnected: boolean;
  workspaceName?: string;
}

export const integrationsService = {
  async getSlackStatus(): Promise<SlackStatus> {
    try {
      const res = await privateApi.get<ApiResponse<SlackStatus | boolean>>("/api/integrations/slack/status");
      const value = unwrap(res);
      // Handle case where value is just a boolean or an object
      if (typeof value === "boolean") {
        return { isConnected: value };
      }
      if (value && typeof value === "object" && "isConnected" in value) {
        return value as SlackStatus;
      }
      return { isConnected: !!value };
    } catch {
      // If it's a 404 or something, we can assume disconnected
      return { isConnected: false };
    }
  },

  async getSlackAuthorizeUrl(): Promise<{ authorizationUrl: string }> {
    const res = await privateApi.get<ApiResponse<{ authorizationUrl: string }>>("/api/integrations/slack/authorize");
    return unwrap(res);
  },

  async disconnectSlack(): Promise<{ message: string }> {
    const res = await privateApi.delete<ApiResponse<{ message: string }>>("/api/integrations/slack");
    return unwrap(res);
  },
};
