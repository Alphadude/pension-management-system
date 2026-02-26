import CenteredLoader from "@/components/ui/centered-loader";
import { Suspense } from "react";
import ReportsClientPage from "./components/reports-client-page";

export const dynamic = "force-dynamic";

const ReportsPage = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <ReportsClientPage />
    </Suspense>
  );
};

export default ReportsPage;
