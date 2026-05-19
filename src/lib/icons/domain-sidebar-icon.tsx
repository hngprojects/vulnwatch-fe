const DomainSidebarIcon = ({
  className,
  isActive = false,
}: {
  className?: string;
  isActive?: boolean;
}) => {
  const fill = isActive ? "#FFFFFF" : "#666666";

  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M10.0125 20C8.6375 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3625 0 9.9875C0 8.6125 0.
        fill={fill}
      />
    </svg>
  );
};
export default DomainSidebarIcon;
