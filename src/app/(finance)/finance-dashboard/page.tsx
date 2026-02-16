import { Suspense } from "react";

import CenteredLoader from "@/components/ui/centered-loader";
import FinanceDashboardClient from "./components/finance-dashboard-client";

const page = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <FinanceDashboardClient />
    </Suspense>
  );
};

export default page;
