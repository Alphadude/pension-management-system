"use client";

import LogoutButton from "@/app/(contributor-pension-app)/dashboard/components/logout-button";
import BaseDashboardLayout from "@/components/layout/base-dashboard-layout";
import type { PropsWithChildren } from "react";
import DioceseDashboardNavigation from "./diocese-dashboard-navigation";
import DioceseUserInfoDisplay from "./diocese-user-info-display";

const DioceseDashboardLayoutClient = ({ children }: PropsWithChildren) => {
  return (
    <BaseDashboardLayout
      title="NPX-LBS Pension"
      navigation={<DioceseDashboardNavigation />}
      userSection={<DioceseUserInfoDisplay />}
      logout={<LogoutButton />}
    >
      {children}
    </BaseDashboardLayout>
  );
};

export default DioceseDashboardLayoutClient;
