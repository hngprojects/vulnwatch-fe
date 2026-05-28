"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { useAuthStore } from "@/store/auth.store";
import { ChatHeader } from "./ChatHeader";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInputRow } from "./ChatInputRow";
import { getMockAiResponse } from "@/features/ai-chat/data/mockData";
import { getFirstName } from "@/features/ai-chat/lib/helpers";
import type { Message } from "@/features/ai-chat/types/chat.types";

interface AIChatbotProps {
  onClose: () => void;
}

export function AIChatbot({ onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const email = useSyncExternalStore(useAuthStore.subscribe, () => useAuthStore.getState().email, () => null);
  const firstName = getFirstName(email);
  const hasMessages = messages.length > 0;

  // Focus on open
  useEffect(() => {
    const timer = setTimeout(() => textareaRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { id: `u-${crypto.randomUUID()}`, role: "user", text: trimmed }]);
    setInputValue("");
    resetTextarea();
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${crypto.randomUUID()}`, role: "ai", text: getMockAiResponse(trimmed) },
      ]);
      setIsTyping(false);
    }, 900);
  };

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

  const resetTextarea = () => {
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end p-0 sm:p-6 bg-black/20 animate-in fade-in duration-300"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    > 
      <div
        className="flex flex-col w-full sm:w-[420px] lg:w-[480px] h-[100dvh] sm:h-[85vh] sm:max-h-[680px] bg-white rounded-none sm:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-12 fade-in duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <ChatHeader onClose={onClose} />

        <div className="flex flex-col flex-1 overflow-hidden">
          {!hasMessages ? (
            <>
              <ChatEmptyState firstName={firstName} onSuggestedQuestion={sendMessage} />
              {/* Input pinned to bottom */}
              <div className="shrink-0 px-6 pb-5 pt-3">
                <ChatInputRow
                  textareaRef={textareaRef}
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  onSend={() => sendMessage(inputValue)}
                  disabled={isTyping}
                />
              </div>
            </>
          ) : (
            <>
              <ChatMessageList messages={messages} isTyping={isTyping} />
              {/* Input pinned to bottom with divider */}
              <div className="shrink-0 px-6 pb-5">
                <ChatInputRow
                  textareaRef={textareaRef}
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  onSend={() => sendMessage(inputValue)}
                  disabled={isTyping}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
