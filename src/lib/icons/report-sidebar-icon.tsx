const ReportSidebarIcon = ({ className }: { className?: string }) => {
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
        d='M5 15H7V8H5V15ZM9 15H11V5H9V15ZM13 15H15V11H13V15ZM3 19C2.45 19 1.97917 18.8042 1.5875 18.4125C1.19583 18.0208 1 17.55 1 17V3C1 2.45 1.19583 1.97917 1.5875 1.5875C1.97917 1.19583 2.45 1 3 1H17C17.55 1 18.0208 1.19583 18.4125 1.5875C18.8042 1.97917 19 2.45 19 3V17C19 17.55 18.8042 18.0208 18.4125 18.4125C18.0208 18.8042 17.55 19 17 19H3ZM3 17H17V3H3V17ZM3 3V17V3Z'
        fill='currentColor'
      />
    </svg>
  );
};
export default ReportSidebarIcon;
