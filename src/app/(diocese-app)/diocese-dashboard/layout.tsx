import type { PropsWithChildren } from "react";
import DioceseDashboardLayoutClient from "./components/diocese-dashboard-layout-client";

const DioceseDashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <DioceseDashboardLayoutClient>{children}</DioceseDashboardLayoutClient>
  );
};

export default DioceseDashboardLayout;
