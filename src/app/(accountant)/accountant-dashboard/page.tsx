import { Suspense } from "react";

import CenteredLoader from "@/components/ui/centered-loader";
import AccountantDashboardClient from "./components/accountant-dashboard-client";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <AccountantDashboardClient />
    </Suspense>
  );
};

export default page;
