"use client";
import LogoutButton from "@/app/(contributor-pension-app)/dashboard/components/logout-button";
import BaseDashboardLayout from "@/components/layout/base-dashboard-layout";
import type { PropsWithChildren } from "react";
import FinanceDashboardNavigation from "./finance-dashboard-navigation";
import FinanceUserInfoDisplay from "./finance-user-info-display";

const FinanceDashboardLayoutClient = ({ children }: PropsWithChildren) => {
  return (
    <BaseDashboardLayout
      title="NPX-LBS Pension"
      navigation={<FinanceDashboardNavigation />}
      userSection={<FinanceUserInfoDisplay />}
      logout={<LogoutButton />}
    >
      {children}
    </BaseDashboardLayout>
  );
};

export default FinanceDashboardLayoutClient;
