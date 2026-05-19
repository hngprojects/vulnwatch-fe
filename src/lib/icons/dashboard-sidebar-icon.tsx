const DashboardSidebarIcon = ({
  className,
  isActive = false,
}: {
  className?: string;
  isActive?: boolean;
}) => {
  const fill = isActive ? "#F8FAFC" : "#666666";

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
        d='M11.1111 6.66667V0H20V6.66667H11.1111ZM0 11.1111V0H8.88889V11.1111H0ZM11.1111 20V8.88889H20V20H11.1111ZM0 20V13.3333H8.88889V20H0ZM2.22222 8.88889H6.66667V2.22222H2.22222V8.88889ZM13.3333 1
        fill={fill}
      />
    </svg>
  );
};
export default DashboardSidebarIcon;
