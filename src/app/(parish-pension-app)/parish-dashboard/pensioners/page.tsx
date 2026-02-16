import { Suspense } from "react";
import PensionersClientPage from "./components/pensioners-client-page";

export const metadata = {
  title: "Pensioners",
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PensionersClientPage />
    </Suspense>
  );
};

export default page;
