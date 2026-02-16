export const monthlyContributionsTableHeadings = [
  "NAME",
  "USER ID",
  "PARISH",
  "STATUS",
  "LAST PENSION PAYMENT",
  "TOTAL PAID PENSION",
  "ACTIONS",
];
export const DioceseUserManagementStatusTab = {
  CONTRIBUTOR: "contributors",
  PENSIONERS: "pensioners",
} as const;

export type DioceseUserManagementStatusTabType =
  (typeof DioceseUserManagementStatusTab)[keyof typeof DioceseUserManagementStatusTab];

export const DIOCESE_USER_MANAGEMENT_STATUS_TAB_VALUES = Object.values(
  DioceseUserManagementStatusTab,
);

export const isDioceseUserManagementStatusTabValid = (
  tab: string,
): tab is DioceseUserManagementStatusTabType => {
  return DIOCESE_USER_MANAGEMENT_STATUS_TAB_VALUES.includes(
    tab as DioceseUserManagementStatusTabType,
  );
};

export const DioceseUserManagementStatusTabConfig = [
  {
    label: "Contributors",
    value: DioceseUserManagementStatusTab.CONTRIBUTOR,
  },
  {
    label: "Pensioners",
    value: DioceseUserManagementStatusTab.PENSIONERS,
  },
];
