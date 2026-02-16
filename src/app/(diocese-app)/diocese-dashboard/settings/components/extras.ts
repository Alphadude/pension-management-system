export const settingsPageTable = [
  "NAME",
  "USER ID",
  "PARISH",
  "STATUS",
  "LAST PENSION PAYMENT",
  "TOTAL PAID PENSION",
  "ACTIONS",
];

export const DioceseSettingsTab = {
  PARISHES: "parishes",
  KYC_REQUIREMENTS: "kyc-requirements",
} as const;

export type DioceseSettingsTabType =
  (typeof DioceseSettingsTab)[keyof typeof DioceseSettingsTab];

export const DIOCESE_SETTINGS_TAB_VALUES = Object.values(DioceseSettingsTab);

export const isDioceseSettingsTabValid = (
  tab: string,
): tab is DioceseSettingsTabType => {
  return DIOCESE_SETTINGS_TAB_VALUES.includes(tab as DioceseSettingsTabType);
};

export const DioceseSettingsTabConfig = [
  {
    label: "Parishes",
    value: DioceseSettingsTab.PARISHES,
  },
  {
    label: "Kyc Requirements",
    value: DioceseSettingsTab.KYC_REQUIREMENTS,
  },
];
