import { auth } from "@/server/auth";
import ReportsPageClient from "./components/reports-page-client";

export const metadata = {
  title: "Reports",
};
const ReportsPage = async () => {
  const session = await auth();
  return <ReportsPageClient {...{ session }} />;
};

export default ReportsPage;
