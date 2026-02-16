"use client";
import LogoutButton from "@/app/(contributor-pension-app)/dashboard/components/logout-button";
import BaseDashboardLayout from "@/components/layout/base-dashboard-layout";
import type { PropsWithChildren } from "react";
import VenerableDashboardNavigation from "./venerable-dashboard-navigation";
import VenerableUserInfoDisplay from "./venerable-user-info-display";

const VenerableDashboardLayoutClient = ({ children }: PropsWithChildren) => {
  return (
    <BaseDashboardLayout
      title="NPX-LBS Pension"
      navigation={<VenerableDashboardNavigation />}
      userSection={<VenerableUserInfoDisplay />}
      logout={<LogoutButton />}
    >
      {children}
    </BaseDashboardLayout>
  );
};

export default VenerableDashboardLayoutClient;
