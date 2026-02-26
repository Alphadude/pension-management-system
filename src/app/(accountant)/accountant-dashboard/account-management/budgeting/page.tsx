import CenteredLoader from "@/components/ui/centered-loader";
import { Suspense } from "react";
import BudgetingClientPage from "./components/budgeting-client-page";

export const dynamic = "force-dynamic";

const BudgetingPage = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <BudgetingClientPage />
    </Suspense>
  );
};

export default BudgetingPage;
