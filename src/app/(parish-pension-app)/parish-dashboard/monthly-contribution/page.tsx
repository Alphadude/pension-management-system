import { Suspense } from "react";
import Contributorsclient from "./components/contributors-client";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Monthly Contribution",
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Contributorsclient />
    </Suspense>
  );
};

export default page;
