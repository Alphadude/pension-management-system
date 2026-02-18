import { Suspense } from "react";
import SystemUsersClientPage from "./components/system-users-client-page";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SystemUsersClientPage />
    </Suspense>
  );
};

export default page;
