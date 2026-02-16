import type { PropsWithChildren } from "react";
import ParishDashboardLayoutClient from "./components/parish-dashboard-layout-client";

const ParishDashboardLayout = ({ children }: PropsWithChildren) => {
  return <ParishDashboardLayoutClient>{children}</ParishDashboardLayoutClient>;
};

export default ParishDashboardLayout;
