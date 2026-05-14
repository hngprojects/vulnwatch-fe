import { FOOTER_BRAND } from "../../constants/footer-meta";

export function FooterBrand() {
  return (
    <div className="flex flex-col items-start gap-5 lg:max-w-[340px]">
      <svg
        width="106"
        height="83"
        viewBox="0 0 106 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="106" height="83" rx="18" fill="#072E28" />
        <circle cx="30" cy="42" r="14" fill="#A0E870" />
        <path
          d="M62 26C72.4934 26 81 34.5066 81 45C81 55.4934 72.4934 64 62 64C51.5066 64 43 55.4934 43 45C43 34.5066 51.5066 26 62 26Z"
          fill="#0A1A35"
          opacity="0.8"
        />
        <path
          d="M63 33L70 45L63 57"
          stroke="#A0E870"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p
        className="font-geist text-[18px] leading-[28px] font-normal tracking-[-0.01em]"
        style={{ color: "#666666" }}
      >
        {FOOTER_BRAND.description}
      </p>
    </div>
  );
}
