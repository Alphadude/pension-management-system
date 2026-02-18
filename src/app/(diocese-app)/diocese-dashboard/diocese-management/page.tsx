import { Suspense } from "react";
import DioceseManagementClient from "./components/diocese-management-client";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Diocese Management",
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DioceseManagementClient />
    </Suspense>
  );
};

export default page;
