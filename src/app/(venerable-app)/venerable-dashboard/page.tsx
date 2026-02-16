import type { Metadata } from "next";
import VenerableDashboardClientPage from "./components/venerable-dashboard-client-page";

export const metadata: Metadata = {
  title: "Venerable Dashboard",
};

const page = () => {
  return <VenerableDashboardClientPage />;
};

export default page;
