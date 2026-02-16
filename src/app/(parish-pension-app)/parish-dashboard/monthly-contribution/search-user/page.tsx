import { Suspense } from "react";
import SearchUserClientPage from "./components/search-user-client-page";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchUserClientPage />
    </Suspense>
  );
};

export default page;
