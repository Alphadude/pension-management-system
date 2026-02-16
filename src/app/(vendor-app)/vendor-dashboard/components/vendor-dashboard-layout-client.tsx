"use client";

import LogoutButton from "@/app/(contributor-pension-app)/dashboard/components/logout-button";
import BaseDashboardLayout from "@/components/layout/base-dashboard-layout";
import type { PropsWithChildren } from "react";
import VendorDashboardNavigation from "./vendor-dashboard-navigation";
import VendorUserInfoDisplay from "./vendor-user-info-display";

const VendorDashboardLayoutClient = ({ children }: PropsWithChildren) => {
  return (
    <BaseDashboardLayout
      title="NPX-LBS Pension"
      navigation={<VendorDashboardNavigation />}
      userSection={<VendorUserInfoDisplay />}
      logout={<LogoutButton />}
    >
      {children}
    </BaseDashboardLayout>
  );
};

export default VendorDashboardLayoutClient;
