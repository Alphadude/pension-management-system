import { Suspense } from "react";
import SystemUsersClientPage from "./components/system-users-client-page";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SystemUsersClientPage />
    </Suspense>
  );
};

export default page;
