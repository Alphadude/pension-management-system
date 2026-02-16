import { auth } from "@/server/auth";
import ParishDashboardClient from "./components/Parish-dashboard-client";

const page = async () => {
  const session = await auth();
  return <ParishDashboardClient {...{ session }} />;
};

export default page;
