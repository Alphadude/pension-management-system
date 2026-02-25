"use client";
import LogoutButton from "@/app/(contributor-pension-app)/dashboard/components/logout-button";
import BaseDashboardLayout from "@/components/layout/base-dashboard-layout";
import type { PropsWithChildren } from "react";
import AccountantDashboardNavigation from "./accountant-dashboard-navigation";
import AccountantUserInfoDisplay from "./accountant-user-info-display";

const AccountantDashboardLayoutClient = ({ children }: PropsWithChildren) => {
  return (
    <BaseDashboardLayout
      title="NPX-LBS Pension"
      navigation={<AccountantDashboardNavigation />}
      userSection={<AccountantUserInfoDisplay />}
      logout={<LogoutButton />}
    >
      {children}
    </BaseDashboardLayout>
  );
};

export default AccountantDashboardLayoutClient;
