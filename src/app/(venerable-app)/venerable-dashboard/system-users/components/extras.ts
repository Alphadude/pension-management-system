export const systemUsersTableHeaders = [
  "NAME",
  "USERID",
  "ROLE",
  "ORGANIZATION",
  "LAST LOGIN",
  "STATUS",
  "ACTIONS",
];

export const contributorsTableHeadings = [
  "NAME",
  "USER ID",
  "PARISH",
  "STATUS",
  "LAST CONTRIBUTION",
  "DIOCESE",
  "ACTIONS",
];

export type SystemUserRole = "diocese" | "parish" | "finance" | "venerable";

export const getSystemUserRoleStyle = (type: SystemUserRole) => {
  switch (type) {
    case "diocese":
      return "bg-[#d5deee] text-[#2e5aac] border border-[#a3b6da] ";
    case "parish":
      return "bg-[#dcfce7] text-[#4CAF50] border border-[#bbf7d0] ";
    case "venerable":
      return "bg-[#f7fcf9] text-[#1e1e1e] border border-[#d2d6d4] ";
    case "finance":
      return "bg-[#f3e8ff] text-[#7e22ce] border border-[#cfc6d9] ";
    default:
      return "";
  }
};

export const getSystemUserStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-[#dcfce7] text-[#4CAF50] border border-[#bbf7d0] ";
    case "inactive":
      return "bg-[#f7fcf9] text-[#1e1e1e] border border-[#d2d6d4] ";
    default:
      return "";
  }
};
