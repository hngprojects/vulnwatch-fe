const ScanSidebarIcon = ({
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
        d='M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875
        fill={fill}
      />
    </svg>
  );
};
export default ScanSidebarIcon;
