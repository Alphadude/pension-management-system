import { auth } from "@/server/auth";
import type { Metadata } from "next";
import VendorsDashboardPageClient from "./components/vendors-dashboard-page-client";

export const metadata: Metadata = {
  title: "Dashboard",
};
const VendorsDashboardPage = async () => {
  const session = await auth();
  return <VendorsDashboardPageClient {...{ session }} />;
};

export default VendorsDashboardPage;
