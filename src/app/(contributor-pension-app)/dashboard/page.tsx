import { auth } from "@/server/auth";
import DashboardPageClient from "./components/dashboard-page-client";

export const metadata = {
  title: "Dashboard",
};

const DashboardPage = async () => {
  const session = await auth();
  return <DashboardPageClient session={session} />;
};

export default DashboardPage;
