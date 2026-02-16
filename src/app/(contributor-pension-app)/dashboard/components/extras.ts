import type { ContributionType } from "@/types/common";

export const contributionTableHeadings = [
  "Date",
  "Type",
  "Amount",
  "Station",
  "Status",
];

export const getContributionTypeStyle = (type: ContributionType) => {
  switch (type.toLowerCase()) {
    case "debit":
      return "text-[#F44336]";
    case "credit":
      return "text-[#4CAF50]";
    default:
      return "";
  }
};
