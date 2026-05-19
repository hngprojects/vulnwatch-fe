export const SCAN_TYPES = [
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5975 4.2576C14.5975 4.59352 14.8698 4.86583 15.2057 4.86583C15.5416 4.86583 15.814 4.59352 15.814 4.2576H14.5975ZM11.5564 0C11.2204 0 10.9481 0.272316 10.9481 0.608229C10.9481 0.94414
          fill="white"
        />
        <path
          d="M3.55435 7.80576C3.24738 7.94225 3.10914 8.30167 3.24557 8.60863C3.382 8.91558 3.74144 9.05385 4.0484 8.91736L3.55435 7.80576ZM11.7654 8.91736C12.0724 9.05385 12.4318 8.91558 12.5683 8.60
          fill="white"
        />
      </svg>
    ),
    value: "QUICK_SCAN",
    title: "Quick Scan",
    description: "Essential Security checks",
    timeDuration: "2-3 minutes",
  },
  {
    icon: (
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.4979 2.56276L8.23318 0.0456472C8.14553 0.0152157 8.02794 0 7.91036 0C7.79277 0 7.67518 0.0152157 7.58753 0.0456472L0.322828 2.56276C0.14538 2.62363 0 2.8323 0 3.02358V13.5094C0 13.700
          fill="currentColor"
        />
      </svg>
    ),
    title: "Full Scan",
    value: "FULL_SCAN",
    description: "Deep and comprehensive scan",
    timeDuration: "5-10 minutes",
  },
];

export const WHAT_HAPPENS_NEXT = [
  {
    title: "Discover & Analyze",
    description:
      "We discover your domain, subdomains, and public-facing assets.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.9999 21.0006L14.7142 14.7148"
          stroke="#072E28"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
          stroke="#072E28"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </svg>
    ),
  },
  {
    title: "Check Security Configuration",
    description:
      "We will analyze your SSL/TLS, headers, DNS, and other security configurations",
    icon: (
      <svg
        width="20"
        height="17"
        viewBox="0 0 23 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7314 13.5771L17.5771 12.1486H21.6114L22.8571 10L20.3657 5.71429H16.8571L15.6457 3.58857H14.2857V2.14857H16.5028L17.7143 4.28571H19.5314L17.0286 0H12.1486V5.71429H14.1257L14.96 7.14286
          fill="#072E28"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.12572 13.5771L5.28 12.1486H1.24571L0 10L2.49143 5.71429H6L7.21143 3.58857H8.57143V2.14857H6.35429L5.14286 4.28571H3.32571L5.82857 0H10.72V5.71429H8.73143L7.89714 7.14286H10.72V10H8.125
          fill="#072E28"
        />
      </svg>
    ),
  },
  {
    title: "Deliver Clear Report",
    description:
      "You’ll get clear report with explanations and actionable recommendations",
    icon: (
      <svg
        width="18"
        height="19"
        viewBox="0 0 19 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.81 21C16.125 21 17.1905 19.9346 17.1905 18.6196C17.1905 13.8642 17.1905 8.13576 17.1905 3.3804C17.1905 2.06543 16.1245 1 14.8095 1H7.306C6.92714 1 6.56376 1.15051 6.29586 1.41842L1.41
          stroke="#072E28"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M7.19048 1V7.19048H1"
          stroke="#072E28"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M4.33337 11H13.8572"
          stroke="#072E28"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M13.8571 7.19141H10.5238"
          stroke="#072E28"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M4.33337 14.8086H13.8572"
          stroke="#072E28"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </svg>
    ),
  },
  {
    title: "Identify Risks",
    description:
      "Our AI engine identifies misconfigurations and ranks them by severity",
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="34" height="34" rx="17" fill="#A0E870" />
        <path
          d="M16.9356 18.6464C16.5485 18.6464 16.2904 18.3884 16.2904 18.0013V13.3561C16.2904 12.969 16.5485 12.7109 16.9356 12.7109C17.3227 12.7109 17.5807 12.969 17.5807 13.3561V18.0013C17.5807 18.3
          fill="#072E28"
        />
        <path
          d="M16.9356 21.9994C16.8065 21.9994 16.5485 21.9994 16.4194 21.8703C16.2904 21.7413 16.2904 21.6123 16.2904 21.3542C16.2904 21.2252 16.2904 20.9671 16.4194 20.8381C16.6775 20.58 17.0646 20.5
          fill="#072E28"
        />
        <path
          d="M24.5484 26H9.32258C8.16129 26 7 25.3548 6.48387 24.3226C5.83871 23.2903 5.83871 22 6.48387 20.9677L14.0968 7.67742C14.7419 6.64516 15.7742 6 16.9355 6C18.0968 6 19.2581 6.64516 19.7742 7
          fill="#072E28"
        />
      </svg>
    ),
  },
];
