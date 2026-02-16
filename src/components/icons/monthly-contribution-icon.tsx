import type { IconProps } from "@/types/common";

export const MonthlyContributionIcon = (props: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.875 18.125H8.125C7.4375 18.125 6.875 17.5625 6.875 16.875V14.375H8.125V16.875H16.875V8.125H14.375V6.875H16.875C17.5625 6.875 18.125 7.4375 18.125 8.125V16.875C18.125 17.5625 17.5625 18.125 16.875 18.125Z"
        fill="currentColor"
      />
      <path
        d="M11.875 9.375V11.875H9.375V13.125H13.125V9.375H11.875ZM10.625 6.875H6.875V10.625H8.125V8.125H10.625V6.875Z"
        fill="currentColor"
      />
      <path
        d="M3.125 1.875H11.875C12.5625 1.875 13.125 2.4375 13.125 3.125V5.625H11.875V3.125H3.125V11.875H5.625V13.125H3.125C2.4375 13.125 1.875 12.5625 1.875 11.875V3.125C1.875 2.4375 2.4375 1.875 3.125 1.875Z"
        fill="currentColor"
      />
    </svg>
  );
};
