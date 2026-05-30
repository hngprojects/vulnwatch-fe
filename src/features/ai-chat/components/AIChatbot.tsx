"use client";

import { useState, useRef, useEffect, useSyncExternalStore, useCallback } from "react";
import { useAuthStore } from "@/store/auth.store";
import { ChatHeader } from "./ChatHeader";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInputRow } from "./ChatInputRow";
import { chatService } from "@/features/ai-chat/services/chat.service";
import { getDisplayName } from "@/features/ai-chat/lib/helpers";
import type { Message } from "@/features/ai-chat/types/chat.types";

// ── Types ──────────────────────────────────────────────────────────────────────

type SessionState = "idle" | "starting" | "ready" | "error";

interface AIChatbotProps {
  onClose: () => void;
  scanId: string;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function AIChatbot({ onClose, scanId }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [sessionError, setSessionError] = useState<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auth store — read firstName & lastName directly
  const firstName = useSyncExternalStore(
    useAuthStore.subscribe,
    () => useAuthStore.getState().firstName,
    () => null
  );
  const lastName = useSyncExternalStore(
    useAuthStore.subscribe,
    () => useAuthStore.getState().lastName,
    () => null
  );
  const displayName = getDisplayName(firstName, lastName);

  const hasUserMessages = messages.some((m) => m.role === "user");

  // ── Start session on mount ───────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    async function start() {
      setSessionState("starting");
      try {
        const { sessionId, greeting } = await chatService.startSession(scanId);
        if (cancelled) return;

        sessionIdRef.current = sessionId;
        setSessionState("ready");

        // Show the backend greeting as first AI message
        setMessages([
          {
            id: `ai-greeting-${crypto.randomUUID()}`,
            role: "ai",
            text: greeting,
          },
        ]);

        // Focus input after session ready
        setTimeout(() => textareaRef.current?.focus(), 100);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "Failed to start session.";
        setSessionError(msg);
        setSessionState("error");
      }
    }

    start();

    return () => {
      cancelled = true;
    };
  }, [scanId]);

  // ── Cleanup session on close ─────────────────────────────────────────────────

  const handleClose = useCallback(() => {
    if (sessionIdRef.current) {
      chatService.deleteSession(sessionIdRef.current); // fire-and-forget
    }
    onClose();
  }, [onClose]);

  // ── Input Helpers ────────────────────────────────────────────────────────────

  const resetTextarea = useCallback(() => {
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, []);

  // ── Send message ─────────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming || sessionState !== "ready" || !sessionIdRef.current) return;

      const sessionId = sessionIdRef.current;

      // Add user bubble
      const userId = `u-${crypto.randomUUID()}`;
      setMessages((prev) => [...prev, { id: userId, role: "user", text: trimmed }]);
      setInputValue("");
      resetTextarea();

      // Add empty streaming bubble
      const aiId = `ai-${crypto.randomUUID()}`;
      setMessages((prev) => [...prev, { id: aiId, role: "streaming", text: "" }]);
      setIsStreaming(true);

      chatService.streamMessage(
        sessionId,
        trimmed,
        // onChunk — append text to streaming bubble
        (chunk) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiId ? { ...m, text: m.text + chunk } : m
            )
          );
        },
        // onDone — mark bubble as finished AI message
        () => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiId ? { ...m, role: "ai" } : m
            )
          );
          setIsStreaming(false);
          setTimeout(() => textareaRef.current?.focus(), 50);
        },
        // onError — replace bubble with error text
        (errMsg) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiId
                ? {
                    ...m,
                    role: "ai",
                    text: `Sorry, something went wrong: ${errMsg}. Please try again.`,
                  }
                : m
            )
          );
          setIsStreaming(false);
        }
      );
    },
    [isStreaming, sessionState, resetTextarea]
  );

  // ── Input handlers ───────────────────────────────────────────────────────────

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };


  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end p-0 sm:p-6 bg-black/20 animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="flex flex-col w-full sm:w-[420px] lg:w-[480px] h-[100dvh] sm:h-[85vh] sm:max-h-[680px] bg-white rounded-none sm:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-12 fade-in duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <ChatHeader onClose={handleClose} />

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* ── Session starting state ── */}
          {sessionState === "starting" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-brand-muted">
              <span className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-geist text-sm text-brand-dark/60">
                Loading your scan report…
              </p>
            </div>
          )}

          {/* ── Session error state ── */}
          {sessionState === "error" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="font-geist font-medium text-brand-dark">
                Unable to start session
              </p>
              <p className="font-geist text-sm text-brand-dark/60">
                {sessionError ?? "Please try closing and reopening the chat."}
              </p>
            </div>
          )}

          {/* ── Session ready, NO user messages yet ── */}
          {sessionState === "ready" && !hasUserMessages && (
            <>
              <ChatEmptyState
                firstName={displayName}
                onSuggestedQuestion={sendMessage}
              />
              <div className="shrink-0 px-6 pb-5 pt-3">
                <ChatInputRow
                  textareaRef={textareaRef}
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  onSend={() => sendMessage(inputValue)}
                  disabled={isStreaming}
                />
              </div>
            </>
          )}

          {/* ── Session ready, user has sent a message ── */}
          {sessionState === "ready" && hasUserMessages && (
            <>
              <ChatMessageList messages={messages} isTyping={false} />
              <div className="shrink-0 px-6 pb-5">
                <ChatInputRow
                  textareaRef={textareaRef}
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  onSend={() => sendMessage(inputValue)}
                  disabled={isStreaming}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
