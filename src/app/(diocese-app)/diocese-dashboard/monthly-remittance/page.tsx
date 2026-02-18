import MonthlyRemittance from "./components/monthly-remittance";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Monthly Remittance",
};

const page = () => {
  return <MonthlyRemittance />;
};

export default page;
