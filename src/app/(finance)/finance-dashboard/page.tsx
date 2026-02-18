import { Suspense } from "react";

import CenteredLoader from "@/components/ui/centered-loader";
import FinanceDashboardClient from "./components/finance-dashboard-client";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <FinanceDashboardClient />
    </Suspense>
  );
};

export default page;
