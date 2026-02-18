import { Suspense } from "react";
import SettingsPage from "./components/settings-page-client";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Diocese Settings",
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsPage />
    </Suspense>
  );
};

export default page;
