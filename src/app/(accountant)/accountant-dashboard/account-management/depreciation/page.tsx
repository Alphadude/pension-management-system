import CenteredLoader from "@/components/ui/centered-loader";
import { Suspense } from "react";
import DepreciationClientPage from "./components/depreciation-client-page";

export const dynamic = "force-dynamic";

const DepreciationPage = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <DepreciationClientPage />
    </Suspense>
  );
};

export default DepreciationPage;
