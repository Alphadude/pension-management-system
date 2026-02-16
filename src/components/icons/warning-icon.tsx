import type { IconProps } from "@/types/common";

export const WarningIcon = (props: IconProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.2974 13.5002L10.2974 3.00017C10.1666 2.76932 9.9769 2.57731 9.74764 2.44372C9.51838 2.31013 9.25779 2.23975 8.99245 2.23975C8.72711 2.23975 8.46651 2.31013 8.23725 2.44372C8.00799 2.57731 7.81827 2.76932 7.68745 3.00017L1.68745 13.5002C1.55521 13.7292 1.48587 13.9891 1.48645 14.2536C1.48704 14.518 1.55753 14.7776 1.69078 15.006C1.82403 15.2345 2.01531 15.4236 2.24522 15.5543C2.47513 15.685 2.7355 15.7525 2.99995 15.7502H14.9999C15.2631 15.7499 15.5216 15.6804 15.7494 15.5486C15.9772 15.4169 16.1664 15.2275 16.2978 14.9995C16.4293 14.7715 16.4985 14.513 16.4984 14.2498C16.4983 13.9866 16.429 13.7281 16.2974 13.5002Z"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6.75V9.75"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.75H9.0075"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
