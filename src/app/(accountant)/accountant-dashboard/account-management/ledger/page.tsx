import CenteredLoader from "@/components/ui/centered-loader";
import { Suspense } from "react";
import LedgerClientPage from "./components/ledger-client-page";

export const dynamic = "force-dynamic";

const LedgerPage = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <LedgerClientPage />
    </Suspense>
  );
};

export default LedgerPage;
