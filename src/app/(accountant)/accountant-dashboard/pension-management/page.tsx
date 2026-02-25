import PensionManagementClient from "./components/pension-management-client";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Pension Management",
};

const page = () => {
  return <PensionManagementClient />;
};

export default page;
