import type { PropsWithChildren } from "react";
import VendorDashboardLayoutClient from "./components/vendor-dashboard-layout-client";

const VendorDashboardLayout = ({ children }: PropsWithChildren) => {
  return <VendorDashboardLayoutClient>{children}</VendorDashboardLayoutClient>;
};

export default VendorDashboardLayout;
