import type { IconProps } from "@/types/common";

export const DownwardTrendCircle = (props: IconProps) => {
  return (
    <svg
      width="37"
      height="38"
      viewBox="0 0 37 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y="0.5" width="37" height="37" rx="18.5" fill="#2E5AAC" />
      <path
        d="M12.198 22.9818L17.2711 16.7781L20.9203 19.7622L24.7997 15.0182"
        stroke="white"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1797 22.5828L12.1996 22.9818L11.8006 19.0018"
        stroke="white"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
