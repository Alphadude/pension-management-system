import ApproveKycClientPage from "./components/approve-kyc-client";

export const metadata = {
  title: "Approve KYC",
};

export const dynamic = "force-dynamic";

const page = () => {
  return <ApproveKycClientPage />;
};

export default page;
