export const UserManagementStatusTab = {
  CONTRIBUTOR: "contributors",
  PENSIONERS: "pensioners",
} as const;

export type UserManagementStatusTabType =
  (typeof UserManagementStatusTab)[keyof typeof UserManagementStatusTab];

export const USER_MANAGEMENT_STATUS_TAB_VALUES = Object.values(
  UserManagementStatusTab,
);

export const isUserManagementStatusTabValid = (
  tab: string,
): tab is UserManagementStatusTabType => {
  return USER_MANAGEMENT_STATUS_TAB_VALUES.includes(
    tab as UserManagementStatusTabType,
  );
};

export const UserManagementStatusTabConfig = [
  {
    label: "Contributors",
    value: UserManagementStatusTab.CONTRIBUTOR,
  },
  {
    label: "Pensioners",
    value: UserManagementStatusTab.PENSIONERS,
  },
];
