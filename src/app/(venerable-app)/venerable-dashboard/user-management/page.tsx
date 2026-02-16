import { Suspense } from "react";
import UserManagementClientPage from "./components/user-management-client-page";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserManagementClientPage />
    </Suspense>
  );
};

export default page;
