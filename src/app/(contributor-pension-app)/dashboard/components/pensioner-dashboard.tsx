import { FileIcon } from "@/components/icons/file-icon";
import AnimateComponent from "@/components/ui/animate-component";
import { Box, Text } from "@mantine/core";
import { useDisclosure, useMounted } from "@mantine/hooks";
import type { Session } from "next-auth";
import DashboardStatCard from "./dashboard-stat-card";
import PensionStatementModal from "./pension-statement-modal";
import RecentNotificationCard from "./recent-notification-card";
import RecentTransactionTable from "./recent-transactions-table";
import numeral from "numeral";

interface Props {
  session: Session | null;
}

const PensionerDashboard = ({ session }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const mounted = useMounted();

  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Box className="md:mr-[80px]">
        <Box className="flex flex-col gap-2">
          <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:font-bold">
            Welcome Back, {session?.user?.firstName}
          </Text>
          <DashboardStatCard
            title="Total Pension Balance"
            amount={`₦${numeral(session?.user?.pensionBalance).format("0,0.00")}`}
            lastUpdated="Today, 10:43 AM"
            type="pensioner"
          />
        </Box>
        <Box className="mt-6 grid w-full grid-cols-1 gap-4 md:mt-8 md:grid-cols-[2fr_1fr] md:gap-8">
          <RecentTransactionTable />
          <Box className="flex flex-col gap-4">
            <Box className="flex w-full flex-col gap-2">
              <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
                Quick Actions
              </Text>
              <Box
                onClick={open}
                component="button"
                className="shadow-[rgba(0, 0, 0, 0.05)] flex cursor-pointer items-center gap-2 rounded-[8px] bg-[#13A3821A] p-2 md:gap-4 md:px-6 md:py-4"
              >
                <FileIcon />
                <Text className="text-sm font-medium text-[#13A382] md:text-base">
                  View Statement
                </Text>
              </Box>
            </Box>
            <RecentNotificationCard />
          </Box>
        </Box>
      </Box>
      <PensionStatementModal close={close} opened={opened} />
    </AnimateComponent>
  );
};

export default PensionerDashboard;
