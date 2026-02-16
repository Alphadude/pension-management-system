"use client";
import LogoutButton from "@/app/(contributor-pension-app)/dashboard/components/logout-button";
import BaseDashboardLayout from "@/components/layout/base-dashboard-layout";
import type { PropsWithChildren } from "react";
import ParishDashboardNavigation from "./parish-dashboard-navigation";
import ParishUserInfoDisplay from "./parish-user-info-display";

const ParishDashboardLayoutClient = ({ children }: PropsWithChildren) => {
  return (
    <BaseDashboardLayout
      title="NPX-LBS Pension"
      navigation={<ParishDashboardNavigation />}
      userSection={<ParishUserInfoDisplay />}
      logout={<LogoutButton />}
    >
      {children}
    </BaseDashboardLayout>
  );
};

export default ParishDashboardLayoutClient;
