"use client";
import BaseDashboardLayout from "@/components/layout/base-dashboard-layout";
import type { PropsWithChildren } from "react";
import DashboardNavigation from "./dashboard-navigation";
import LogoutButton from "./logout-button";
import UserInfoDisplay from "./user-info-display";

const DashboardLayoutClient = ({ children }: PropsWithChildren) => {
  return (
    <BaseDashboardLayout
      title="NPX-LBS Pension"
      navigation={<DashboardNavigation />}
      userSection={<UserInfoDisplay />}
      logout={<LogoutButton />}
    >
      {children}
    </BaseDashboardLayout>
  );
};

export default DashboardLayoutClient;
