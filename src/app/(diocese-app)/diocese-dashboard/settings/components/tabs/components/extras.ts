export const parishTableHeadings = [
  "PARISH NAME",
  "PRIEST",
  "MEMBERS",
  "STATUS",
  "ACTIONS",
];

export const getParishStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-[#dcfce7] text-[#4CAF50] border border-[#bbf7d0]";
    case "inactive":
      return "bg-[#f7fcf9] text-[#1e1e1e] border border-[#d2d6d4]";
    default:
      return "";
  }
};
