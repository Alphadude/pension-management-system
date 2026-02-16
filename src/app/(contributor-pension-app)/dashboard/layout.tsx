import type { PropsWithChildren } from "react";
import DashboardLayoutClient from "./components/dashboard-layout-client";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
};

export default DashboardLayout;
