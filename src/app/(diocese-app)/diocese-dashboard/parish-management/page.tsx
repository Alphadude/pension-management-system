import ParishManagementClient from "./components/parish-management";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Parish Management",
};

const page = () => {
  return <ParishManagementClient />;
};

export default page;
