import CenteredLoader from "@/components/ui/centered-loader";
import { Suspense } from "react";
import SettingsClientPage from "./components/settings-client-page";

export const dynamic = "force-dynamic";

const SettingsPage = () => {
  return (
    <Suspense fallback={<CenteredLoader />}>
      <SettingsClientPage />
    </Suspense>
  );
};

export default SettingsPage;
