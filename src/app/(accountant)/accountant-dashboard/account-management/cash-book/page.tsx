import CenteredLoader from "@/components/ui/centered-loader";
import { Suspense } from "react";
import CashBookClientPage from "./components/cash-book-client-page";

export const dynamic = "force-dynamic";

const CashBookPage = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <CashBookClientPage />
    </Suspense>
  );
};

export default CashBookPage;
