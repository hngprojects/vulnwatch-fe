"use client";

import { useEffect, useRef, useState } from "react";
import type { Message } from "@/features/ai-chat/types/chat.types";

interface ChatMessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const CHARACTER_LIMIT = 250;

function ChatBubble({ msg }: { msg: Message }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isUser = msg.role === "user";
  const isLong = isUser && msg.text.length > CHARACTER_LIMIT;

  const wrapperClass = isUser ? "flex justify-end" : "flex justify-start";
  
  const baseBubbleClass = isUser
    ? "max-w-[85%] sm:max-w-[75%] bg-primary text-white font-geist font-normal text-base leading-snug px-4 py-3 rounded-[19px_19px_0px_19px] break-words whitespace-pre-wrap"
    : "max-w-[90%] sm:max-w-[85%] bg-white border border-brand-light-gray font-geist font-normal text-base leading-6 text-brand-dark px-4 py-4 rounded-[19px_19px_19px_0px] break-words whitespace-pre-wrap";

  const gradientClass = isUser 
    ? "from-primary to-transparent" 
    : "from-white to-transparent";

  return (
    <div className={wrapperClass}>
      <div 
        className={`relative ${baseBubbleClass} ${isLong && !isExpanded ? "max-h-[120px] overflow-hidden cursor-pointer" : ""}`}
        onClick={() => {
          if (isLong && !isExpanded) setIsExpanded(true);
        }}
      >
        {msg.text}
        
        {isLong && !isExpanded && (
          <div className={`absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t ${gradientClass} pointer-events-none`} />
        )}
        
        {isLong && isExpanded && (
          <div className="mt-2 text-right">
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className={`text-xs font-medium hover:underline ${isUser ? "text-white/80" : "text-brand-dark/60"}`}
            >
              Show less
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatMessageList({ messages, isTyping }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-5 px-6 pt-5 pb-4">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} msg={msg} />
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white border border-brand-light-gray px-4 py-3 rounded-[19px_19px_19px_0px] flex items-center gap-1">
            <span className="w-2 h-2 bg-brand-muted rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 bg-brand-muted rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-brand-muted rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
