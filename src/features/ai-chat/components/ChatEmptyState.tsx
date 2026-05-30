"use client";

import { SUGGESTED_QUESTIONS } from "@/features/ai-chat/data/mockData";

const RobotIcon = () => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22.3429 0.751668H13.3229C12.2325 0.75123 11.1527 0.965648 10.1452 1.38267C9.13769 1.79969 8.22224 2.41115 7.45114 3.18209C6.68003 3.95304 6.0684 4.86837 5.65117 5.87578C5.23395 6.88319 5.01931 7.96294 5.01953 9.05333V18.0733C5.01909 19.1639 5.23357 20.2438 5.65069 21.2514C6.06782 22.259 6.67942 23.1745 7.45055 23.9457C8.22167 24.7168 9.13719 25.3284 10.1448 25.7455C11.1524 26.1626 12.2323 26.3771 13.3229 26.3767H22.3429C23.4334 26.3771 24.5133 26.1626 25.5209 25.7455C26.5285 25.3284 27.4441 24.7168 28.2152 23.9457C28.9863 23.1745 29.5979 22.259 30.015 21.2514C30.4322 20.2438 30.6466 19.1639 30.6462 18.0733V9.05333C30.6466 7.9628 30.4322 6.88287 30.015 5.87527C29.5979 4.86766 28.9863 3.95214 28.2152 3.18101C27.4441 2.40989 26.5285 1.79829 25.5209 1.38116C24.5133 0.964036 23.4334 0.749563 22.3429 0.750001V0.751668Z" stroke="#072E28" strokeWidth="1.5"/>
    <path d="M30.51 19.5443H33.2083C33.6614 19.5443 34.0959 19.3643 34.4163 19.0439C34.7367 18.7235 34.9167 18.289 34.9167 17.8359V9.29427C34.9167 8.84119 34.7367 8.40667 34.4163 8.0863C34.0959 7.76592 33.6614 7.58594 33.2083 7.58594H30.5083M5.15833 19.5443H2.45833C2.23399 19.5443 2.01185 19.5001 1.80458 19.4142C1.59732 19.3284 1.40899 19.2025 1.25036 19.0439C1.09173 18.8853 0.965891 18.697 0.880039 18.4897C0.794187 18.2824 0.75 18.0603 0.75 17.8359V9.29427C0.75 8.84119 0.929985 8.40667 1.25036 8.0863C1.57073 7.76592 2.00526 7.58594 2.45833 7.58594H5.15833" stroke="#072E28" strokeWidth="1.5"/>
    <path d="M2.44141 7.58333V0.75M33.2081 7.58333L33.1914 0.75M12.6914 8.16667V12.6633M22.9414 8.16667V12.6633M14.3997 19.5417H21.2331" stroke="#072E28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ChatEmptyStateProps {
  firstName: string;
  onSuggestedQuestion: (q: string) => void;
}

export function ChatEmptyState({ firstName, onSuggestedQuestion }: ChatEmptyStateProps) {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center justify-between px-6 pt-6 pb-4">
      {/* Robot + greeting */}
      <div className="flex flex-col items-center gap-6 pt-4">
        <RobotIcon />
        <p className="font-geist font-medium text-xl leading-8 text-center text-brand-dark max-w-sm">
          Hi {firstName}, I&apos;m your VulnWatch AI assistant. Ask me anything about your scan results
        </p>
      </div>

      {/* Suggestion pills */}
      <div className="w-full">
        <div className="border-y border-brand-light-gray py-4">
          <p className="font-geist font-medium text-base text-brand-dark mb-3">
            Try asking
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onSuggestedQuestion(q)}
                className="px-4 py-2 border border-primary rounded-full font-geist font-normal text-sm text-primary hover:bg-primary/5 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
