import type { PropsWithChildren } from "react";
import FinanceDashboardLayoutClient from "./components/finance-dashboard-layout-client";
const FinanceDashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <FinanceDashboardLayoutClient>{children}</FinanceDashboardLayoutClient>
  );
};

export default FinanceDashboardLayout;
