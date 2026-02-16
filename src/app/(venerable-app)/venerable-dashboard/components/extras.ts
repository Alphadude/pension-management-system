export const UserStatusTab = {
  CONTRIBUTORS: "contributors",
  PENSIONERS: "pensioners",
} as const;

export type UserStatusTabType =
  (typeof UserStatusTab)[keyof typeof UserStatusTab];

export const UserStatusTabConfig = [
  {
    label: "Deceased",
    value: UserStatusTab.CONTRIBUTORS,
  },
  {
    label: "Pensioners",
    value: UserStatusTab.PENSIONERS,
  },
];
