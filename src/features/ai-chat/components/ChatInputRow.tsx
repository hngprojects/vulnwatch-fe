"use client";

import { Send } from "lucide-react";

interface ChatInputRowProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  disabled: boolean;
}

export function ChatInputRow({
  textareaRef,
  value,
  onChange,
  onKeyDown,
  onSend,
  disabled,
}: ChatInputRowProps) {
  return (
    <div className="flex items-end gap-3">
      {/* Auto-grow textarea with background */}
      <div className="flex-1 bg-brand-sidebar-bg rounded-[14px] px-5 flex items-center min-h-[54px]">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Ask about your security..."
          disabled={disabled}
          style={{
            height: "auto",
            maxHeight: "120px",
            overflowY: "auto",
            resize: "none",
          }}
          className="w-full bg-transparent font-geist font-normal text-base leading-[30px] text-brand-dark placeholder:text-brand-gray focus:outline-none disabled:opacity-60"
        />
      </div>

      {/* Send button */}
      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0 hover:bg-primary/90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mb-0.5"
      >
        <Send size={18} strokeWidth={2} className="text-white ml-[-2px] rotate-45" />
      </button>
    </div>
  );
}
