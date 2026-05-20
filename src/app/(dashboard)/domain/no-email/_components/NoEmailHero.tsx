interface NoEmailHeroProps {
  domainName: string;
}

export default function NoEmailHero({ domainName }: NoEmailHeroProps) {
  return (
    <div className="flex items-center justify-center">
      {/* Shield with heart icon */}
      <svg
        width="48"
        height="60"
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 28C19.4 24.9333 21.5833 22.775 22.55 21.525C23.5167 20.275 24 19.0333 24 17.8C24 16.6 23.5667 15.5667 22.7 14.7C21.8333 13.8333 20.8 13.4 19.6 13.4C18.9 13.4 18.225 13.5417 17.575 13.825C16.925 14.1083 16.4 14.5 16 15C15.6 14.5 15.0833 14.1083 14.45 13.825C13.8167 13.5417 13.1333 13.4 12.4 13.4C11.2 13.4 10.1667 13.8333 9.3 14.7C8.43333 15.5667 8 16.6 8 17.8C8 18.4333 8.08333 19.0167 8.25 19.55C8.41667 20.0833 8.78333 20.7083 9.35 21.425C9.91667 22.1417 10.725 23.0167 11.775 24.05C12.825 25.0833 14.2333 26.4 16 28ZM16 40C11.3667 38.8333 7.54167 36.175 4.525 32.025C1.50833 27.875 0 23.2667 0 18.2V6L16 0L32 6V18.2C32 23.2667 30.4917 27.875 27.475 32.025C24.4583 36.175 20.6333 38.8333 16 40Z"
          fill="#072E28"
        />
      </svg>

      {/* Heading + subtitle rendered alongside for semantic grouping */}
      <div className="sr-only">{domainName}</div>
    </div>
  );
}
