"use client";
import { FinanceMetricCard as AccountantMetricCard } from "@/components/ui/finance-metric-card";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useGetFinanceDashboardOverview } from "@/hooks/query/use-finance";
import { routes } from "@/lib/routes";
import { Box, Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { Users } from "lucide-react";
import AccountantOverviewSkeletonLoader from "./accountant-overview-skeleton-loader";
import MonthlyDisbursedTable from "./monthly-disbursed-table";
import TopContributingParishGraph from "./top-contributing-parish-graph";
import UserStatus from "./user-status";

const AccountantDashboardClient = () => {
  const { data, isLoading } = useGetFinanceDashboardOverview();
  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Accountant Dashboard
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              {" "}
              System operational • Last updated: 20:21:23
            </Text>
          </Box>
          <Button
            component="a"
            href={routes.accountantDashboard.pensionManagement}
          >
            <Box component="span" visibleFrom="sm">
              Export CSV
            </Box>
            <Box component="span" hiddenFrom="sm">
              Manage
            </Box>
          </Button>
        </Group>
        <SkeletonWrapper
          isLoading={isLoading}
          Loader={AccountantOverviewSkeletonLoader}
        >
          <SimpleGrid className="grid-cols-2 gap-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
            <AccountantMetricCard
              label="Total Contributors"
              value={data?.doc.totalContributor ?? 0}
              desc={"from last month"}
              change="+12"
              icon={
                <Box className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                  <Users className="size-[14px] text-white md:size-[16px]" />
                </Box>
              }
            />

            <AccountantMetricCard
              label="Active Pensioners"
              value={data?.doc.activePensioners ?? 0}
              desc={"from last month"}
              change="+8.2%"
              icon={
                <Box className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                  <Users className="size-[14px] text-white md:size-[16px]" />
                </Box>
              }
            />

            <AccountantMetricCard
              label="Active Parishes"
              value={data?.doc.activeParishes ?? 0}
              icon={
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                  <Users className="size-[14px] text-white md:size-[16px]" />
                </div>
              }
              // desc=" No from last month"
            />
            {/* 
                        <AccountantMetricCard
                            label="Signed Vouchers"
                            value={data?.doc.percentageSignedVoucher ?? 0}
                            desc={"30 vouchers overdue"}
                            change="-1"
                            icon={
                                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#2E5AAC]">
                                    <Clock className="size-[14px] md:size-[16px] text-white" />
                                </div>
                            }
                        /> */}
          </SimpleGrid>
        </SkeletonWrapper>
      </Stack>
      <MonthlyDisbursedTable />
      <Box className="flex flex-col-reverse items-baseline gap-6 md:grid md:grid-cols-2">
        <UserStatus />
        <TopContributingParishGraph />
        {/* <Activities /> */}
        {/* <VoucherSigningStats /> */}
      </Box>
    </Stack>
  );
};

export default AccountantDashboardClient;
