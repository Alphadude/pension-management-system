import VendorManagementClient from "./components/vendor-management-client";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Pension Management",
};

const page = () => {
  return <VendorManagementClient />;
};

export default page;
