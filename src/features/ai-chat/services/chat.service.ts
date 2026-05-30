import { privateApi } from "@/lib/axios";

// ── Response shapes ──────────────────────────────────────────────────────────

interface ChatApiValue {
  sessionId: string;
  role: string;
  content: string;
  timestamp: string;
}

interface ChatApiResponse {
  isSuccess: boolean;
  value: ChatApiValue;
  error: { code: string; message: string } | null;
}


/** Returns the backend base URL for raw fetch calls (SSE / streaming). */
function getBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
}

/** Returns auth headers for raw fetch calls. */
function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("auth_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}


export const chatService = {
  /**
   * POST /api/chat/scans/{scanId}/session
   * Creates a new chat session and returns the sessionId + opening greeting.
   * Uses privateApi (Axios) — handles auth token automatically.
   */
  async startSession(
    scanId: string
  ): Promise<{ sessionId: string; greeting: string }> {
    const res = await privateApi.post<ChatApiResponse>(
      `/api/chat/scans/${scanId}/session`
    );

    const data = res.data;
    if (!data.isSuccess) {
      throw new Error(data.error?.message ?? "Failed to start session.");
    }

    return {
      sessionId: data.value.sessionId,
      greeting: data.value.content,
    };
  },

  /**
   * POST /api/chat/sessions/{sessionId}/stream
   * Streams the AI response as SSE chunks.
   * Falls back to /messages on any SSE failure.
   */
  async streamMessage(
    sessionId: string,
    message: string,
    onChunk: (text: string) => void,
    onDone: () => void,
    onError: (err: string) => void
  ): Promise<void> {
    const body = JSON.stringify({ message });
    const base = getBaseUrl();

    try {
      const res = await fetch(
        `${base}/api/chat/sessions/${sessionId}/stream`,
        {
          method: "POST",
          headers: {
            ...getAuthHeaders(),
            Accept: "text/event-stream",
          },
          body,
        }
      );

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE lines are separated by newlines
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") {
            onDone();
            return;
          }

          try {
            const parsed = JSON.parse(payload) as { text: string };
            if (parsed.text) onChunk(parsed.text);
          } catch {
            // Ignore malformed chunks
          }
        }
      }

      // Stream ended without [DONE] — still call done
      onDone();
    } catch {
      // ── Fallback: non-streaming /messages endpoint ─────────────────────────
      try {
        const fallbackRes = await privateApi.post<ChatApiResponse>(
          `/api/chat/sessions/${sessionId}/messages`,
          { message }
        );

        const data = fallbackRes.data;
        if (!data.isSuccess) {
          throw new Error(data.error?.message ?? "Request failed.");
        }

        onChunk(data.value.content);
        onDone();
      } catch (fallbackErr) {
        const msg =
          fallbackErr instanceof Error ? fallbackErr.message : "Unknown error";
        onError(msg);
      }
    }
  },

  /**
   * DELETE /api/chat/sessions/{sessionId}
   * Cleans up the session. Fire-and-forget.
   */
  deleteSession(sessionId: string): void {
    privateApi
      .delete(`/api/chat/sessions/${sessionId}`)
      .catch(() => {
        // Silently ignore — best-effort cleanup
      });
  },
};
