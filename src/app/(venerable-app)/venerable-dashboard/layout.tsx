import type { PropsWithChildren } from "react";
import VenerableDashboardLayoutClient from "./components/venerable-dashboard-layout-client";

const VenerableDashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <VenerableDashboardLayoutClient>{children}</VenerableDashboardLayoutClient>
  );
};

export default VenerableDashboardLayout;
