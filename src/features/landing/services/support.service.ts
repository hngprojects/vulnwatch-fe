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

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export const supportService = {
  async submit(payload: SupportPayload): Promise<SupportResult> {
    const res = await fetch(`${API_BASE}/api/Support`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Version": "1",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    return { ok: res.ok, data };
  },
};
