import { Suspense } from "react";
import MonthlyRemittanceClientPage from "./components/monthly-remittance-client-page";

export const metadata = {
  title: "Monthly Remittance",
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MonthlyRemittanceClientPage />
    </Suspense>
  );
};

export default page;
