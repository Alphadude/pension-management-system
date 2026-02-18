import { Suspense } from "react";
import MonthlyContributionsClient from "./components/monthly-contributions-client";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Pension Management",
};

const page = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <MonthlyContributionsClient />
    </Suspense>
  );
};

export default page;
