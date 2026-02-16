import type { Metadata } from "next";
import DioceseDashboardClient from "./components/diocese-dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard",
};
const DioceseDashboardClientPage = async () => {
  // const session = await auth();
  return <DioceseDashboardClient />;
};

export default DioceseDashboardClientPage;
