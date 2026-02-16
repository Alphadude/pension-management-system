import type { IconProps } from "@/types/common";

export const TotalRejectedIcon = (props: IconProps) => {
  return (
    <svg
      width="30"
      height="28"
      viewBox="0 0 30 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.800781" width="29.2" height="28" rx="14" fill="#2E5AAC" />
      <path
        d="M13.5291 20.75H9.77539C9.47702 20.75 9.19087 20.6315 8.9799 20.4205C8.76892 20.2095 8.65039 19.9234 8.65039 19.625V8.375C8.65039 8.07663 8.76892 7.79048 8.9799 7.5795C9.19087 7.36853 9.47702 7.25 9.77539 7.25H21.0254C21.3238 7.25 21.6099 7.36853 21.8209 7.5795C22.0319 7.79048 22.1504 8.07663 22.1504 8.375V12.1363M17.2893 20.75H21.7754C21.8748 20.75 21.9702 20.7105 22.0406 20.6402C22.1109 20.5698 22.1504 20.4745 22.1504 20.375V15.8881H13.1504"
        stroke="#F9FAFC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0254 13.625L12.7754 15.875L15.0254 18.125"
        stroke="#F9FAFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
