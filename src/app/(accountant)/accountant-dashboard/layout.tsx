import type { PropsWithChildren } from "react";
import AccountantDashboardLayoutClient from "./components/accountant-dashboard-layout-client";
const AccountantDashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <AccountantDashboardLayoutClient>
      {children}
    </AccountantDashboardLayoutClient>
  );
};

export default AccountantDashboardLayout;
