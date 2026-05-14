export interface SupportPayload {
  name: string;
  email: string;
  phoneNumber: string;
  requestType: string;
  content: string;
}

interface SupportResult {
  ok: boolean;
  data: unknown;
}

// NOTE: Using local proxy routes to bypass CORS during development.
const PROXY_BASE = "/api/proxy";

export const supportService = {
  async submit(payload: SupportPayload): Promise<SupportResult> {
    const res = await fetch(`${PROXY_BASE}/support`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    return { ok: res.ok, data };
  },
};
