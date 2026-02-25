import type { IconProps } from "@/types/common";

export const NairaCircleIcon = (props: IconProps) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.628906"
        y="0.75"
        width="35"
        height="35"
        rx="17.5"
        fill="#2E5AAC"
      />
      <path
        d="M13.5 12V24M22.5 12V24M13.5 12L22.5 24"
        stroke="white"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 16H25.5M10.5 20H25.5"
        stroke="white"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
