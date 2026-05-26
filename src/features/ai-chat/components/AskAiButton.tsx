// Shared "Ask AI" trigger button.
// Uses existing brand tokens — no hardcoded colour values.

interface AskAiButtonProps {
  onClick: () => void;
  className?: string;
}

const AiChatIcon = () => (
  <svg
    width="22"
    height="21"
    viewBox="0 0 22 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12.9197 19.1404C17.1037 18.8634 20.4357 15.4834 20.7097 11.2404C20.7627 10.4104 20.7627 9.55042 20.7097 8.72042C20.4357 4.47842 17.1037 1.10042 12.9197 0.821424C11.4746 0.726192 10.0248 0.726192 8.57973 0.821424C4.39573 1.09942 1.06373 4.47842 0.789729 8.72142C0.736757 9.56059 0.736757 10.4023 0.789729 11.2414C0.889729 12.7864 1.57273 14.2174 2.37773 15.4254C2.84473 16.2704 2.53673 17.3254 2.04973 18.2484C1.69973 18.9134 1.52373 19.2454 1.66473 19.4854C1.80473 19.7254 2.11973 19.7334 2.74873 19.7484C3.99373 19.7784 4.83273 19.4264 5.49873 18.9354C5.87573 18.6564 6.06473 18.5174 6.19473 18.5014C6.32473 18.4854 6.58173 18.5914 7.09373 18.8014C7.55373 18.9914 8.08873 19.1084 8.57873 19.1414C10.0037 19.2354 11.4927 19.2354 12.9207 19.1414L12.9197 19.1404Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M6.25 13.25L8.092 7.724C8.13824 7.58609 8.22664 7.4662 8.34471 7.38126C8.46278 7.29632 8.60455 7.25062 8.75 7.25062C8.89545 7.25062 9.03722 7.29632 9.15529 7.38126C9.27336 7.4662 9.36176 7.58609 9.408 7.724L11.25 13.25M14.25 7.25V13.25M7.25 11.25H10.25"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function AskAiButton({ onClick, className = "" }: AskAiButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 px-5 py-3 bg-primary text-white font-semibold text-base rounded-xl hover:bg-primary/90 transition-opacity shrink-0 ${className}`}
    >
      <AiChatIcon />
      <span>Ask AI</span>
    </button>
  );
}
