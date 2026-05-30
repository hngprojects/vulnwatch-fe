"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Message } from "@/features/ai-chat/types/chat.types";

interface ChatMessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const CHARACTER_LIMIT = 250;

function ChatBubble({ msg }: { msg: Message }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isUser = msg.role === "user";
  const isStreaming = msg.role === "streaming";
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
        onKeyDown={(e) => {
          if (isLong && !isExpanded && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setIsExpanded(true);
          }
        }}
        tabIndex={isLong && !isExpanded ? 0 : undefined}
        role={isLong && !isExpanded ? "button" : undefined}
        aria-expanded={isLong ? isExpanded : undefined}
      >
        {isUser ? (
          <>
            {msg.text}
            {isStreaming && (
              <span
                aria-hidden
                className="inline-block w-[2px] h-[1em] bg-brand-dark/60 ml-0.5 align-middle animate-[blink_0.8s_step-end_infinite]"
              />
            )}
          </>
        ) : (
          <>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                code: ({ children }) => (
                  <code className="bg-brand-sidebar-bg px-1 py-0.5 rounded text-sm font-mono">{children}</code>
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
            {isStreaming && (
              <span
                aria-hidden
                className="inline-block w-[2px] h-[1em] bg-brand-dark/60 ml-0.5 align-middle animate-[blink_0.8s_step-end_infinite]"
              />
            )}
          </>
        )}
        
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
