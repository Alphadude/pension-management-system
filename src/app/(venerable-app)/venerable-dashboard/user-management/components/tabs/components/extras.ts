import type { ContributionTypeOptions } from "@/types/common";

export const getContributorTypeStyle = (type: ContributionTypeOptions) => {
  switch (type) {
    case "active":
      return "bg-[#d5deee] text-[#2e5aac] border border-[#a3b6da]";
    case "retired":
      return "bg-[#dcfce7] text-[#4CAF50] border border-[#bbf7d0]";
    case "deceased":
      return "bg-[#f7fcf9] text-[#1e1e1e] border border-[#d2d6d4]";
    default:
      return "";
  }
};
