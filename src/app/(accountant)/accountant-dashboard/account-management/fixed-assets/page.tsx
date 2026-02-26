import CenteredLoader from "@/components/ui/centered-loader";
import { Suspense } from "react";
import FixedAssetsClientPage from "./components/fixed-assets-client-page";

export const dynamic = "force-dynamic";

const FixedAssetsPage = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <FixedAssetsClientPage />
    </Suspense>
  );
};

export default FixedAssetsPage;
