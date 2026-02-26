import CenteredLoader from "@/components/ui/centered-loader";
import { Suspense } from "react";
import TransactionsClientPage from "./components/transactions-client-page";

export const dynamic = "force-dynamic";

const TransactionsPage = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <TransactionsClientPage />
    </Suspense>
  );
};

export default TransactionsPage;
