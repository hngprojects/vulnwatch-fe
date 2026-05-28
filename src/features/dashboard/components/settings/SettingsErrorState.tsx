type SettingsErrorStateProps = {
  message: string;
  onRetry: () => void;
};

const SettingsErrorState = ({ message, onRetry }: SettingsErrorStateProps) => {
  return (
    <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-5">
      <p className="text-sm sm:text-base font-medium text-[#B91C1C]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 rounded-lg border border-[#FCA5A5] px-4 py-2 text-sm font-semibold text-[#B91C1C] transition-colors hover:bg-[#FEE2E2]"
      >
        Retry
      </button>
    </div>
  );
};

export default SettingsErrorState;
