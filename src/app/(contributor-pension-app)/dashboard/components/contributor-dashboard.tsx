import AnimateComponent from "@/components/ui/animate-component";
import { Box, Text } from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import type { Session } from "next-auth";
import numeral from "numeral";
import { useEffect, useState } from "react";
import DashboardStatCard from "./dashboard-stat-card";
import RecentNotificationCard from "./recent-notification-card";
import RecentTransactionTable from "./recent-transactions-table";

interface Props {
  session: Session | null;
}

const ContributorDashboard = ({ session }: Props) => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const mounted = useMounted();

  useEffect(() => {
    const now = new Date();
    setLastUpdated(
      now.toLocaleDateString() +
        ", " +
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    );
  }, []);

  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Box className="md:mr-[80px]">
        <Box className="flex flex-col gap-2">
          <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:font-bold">
            Welcome Back, {session?.user?.firstName}
          </Text>
          <Box className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <DashboardStatCard
              title="Total Pension Balance"
              amount={`₦${numeral(session?.user?.pensionBalance).format("0,0.00")}`}
              lastUpdated={lastUpdated}
              type="pensioner"
            />
            <DashboardStatCard
              title="Total Contributions Made"
              amount={`₦${numeral(session?.user?.contributionBalance).format("0,0.00")}`}
              lastUpdated={lastUpdated}
              type="contributor"
            />
          </Box>
        </Box>
        <Box className="mt-6 grid w-full grid-cols-1 gap-4 md:mt-8 md:grid-cols-[2fr_1fr] md:gap-8">
          <RecentTransactionTable />
          <Box className="flex flex-col gap-4">
            <Box className="flex w-full flex-col gap-2">
              <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
                Quick Actions
              </Text>
              {/* <Box
                onClick={open}
                component="button"
                className="shadow-[rgba(0, 0, 0, 0.05)] flex cursor-pointer items-center gap-2 rounded-[8px] bg-[#13A3821A] p-2 md:gap-4 md:px-6 md:py-4"
              >
                <FileIcon />
                <Text className="text-sm font-medium text-[#13A382] md:text-base">
                  View Statement
                </Text>
              </Box> */}
            </Box>
            <RecentNotificationCard />
          </Box>
        </Box>
      </Box>
      {/* <PensionStatementModal close={close} opened={opened} /> */}
    </AnimateComponent>
  );
};

export default ContributorDashboard;
