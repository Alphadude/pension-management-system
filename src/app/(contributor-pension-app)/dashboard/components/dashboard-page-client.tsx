"use client";
import type { Session } from "next-auth";
import PensionerDashboard from "./pensioner-dashboard";
import ContributorDashboard from "./contributor-dashboard";

interface Props {
  session: Session | null;
}
const DashboardPageClient = ({ session }: Props) => {
  return (
    <>
      {session?.user?.isPensioner ? (
        <PensionerDashboard session={session} />
      ) : (
        <ContributorDashboard session={session} />
      )}
    </>
  );
};

export default DashboardPageClient;
