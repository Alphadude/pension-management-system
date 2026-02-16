export const DioceseStatusTab = {
  OVERVIEW: "overview",
  PARISHES: "parishes",
} as const;

export type DioceseStatusTabType =
  (typeof DioceseStatusTab)[keyof typeof DioceseStatusTab];

export const DIOCESE_STATUS_TAB_VALUES = Object.values(DioceseStatusTab);

export const isDioceseStatusTabValid = (
  tab: string,
): tab is DioceseStatusTabType => {
  return DIOCESE_STATUS_TAB_VALUES.includes(tab as DioceseStatusTabType);
};

export const DioceseStatusTabConfig = [
  {
    label: "Overview",
    value: DioceseStatusTab.OVERVIEW,
  },
  {
    label: "Parishes",
    value: DioceseStatusTab.PARISHES,
  },
];
