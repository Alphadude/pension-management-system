"use client";
import { DocumentWrapperIcon } from "@/components/icons/document-wrapper-icon";
import { DollarCircleIcon } from "@/components/icons/dollar-circle-icon";
import { DownwardTrendCircle } from "@/components/icons/downward-trend-circle";
import { UserCheckBoxIcon } from "@/components/icons/user-check-box-icon";
import { UserCircleIcon } from "@/components/icons/user-circle-icon";
import { UsersBoxIcon } from "@/components/icons/users-box-icon";
import { ParishMetricCard } from "@/components/ui/parish-metric-card";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useGetParishDashboardOverview } from "@/hooks/query/use-parish";
import { routes } from "@/lib/routes";
import { Box, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import numeral from "numeral";
import ContributorStatsChart from "./contributors-stats-chart";
import TopContributingParishGraph from "./diocese-dashboard-graph";
import DioceseOverviewSkeletonLoader from "./diocese-overview-skeleton-loader";

const colorMap: Record<string, string> = {
  active: "#2E5AAC",
  retired: "#4A90E2",
  deceased: "#7BB3F0",
};

const DioceseDashboardClient = () => {
  const { data, isLoading } = useGetParishDashboardOverview();

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Welcome, ABC Diocese
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              Manage your diocese information
            </Text>
          </Box>
          {/* <Button
                        component="a"
                        href={routes.parishDashboard.importContributors}
                    >
                        <Box component="span" visibleFrom="sm">
                            Generate Report
                        </Box>
                        <Box component="span" hiddenFrom="sm">
                            <PlusIcon size={14} />
                        </Box>
                    </Button> */}
        </Group>
        <SkeletonWrapper
          isLoading={isLoading}
          Loader={DioceseOverviewSkeletonLoader}
        >
          <SimpleGrid className="grid-cols-2 gap-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
            <ParishMetricCard
              label="Total Contributors"
              value={data?.doc?.totalContributors ?? 0}
              desc={"from last month"}
              change={
                data?.doc?.contributorsThisMonth
                  ? `${numeral(data.doc.contributorsThisMonth).format("0,0.00")}%`
                  : 0
              }
              icon={<UserCircleIcon className="size-[18px] md:size-[35px]" />}
            />
            <ParishMetricCard
              label="Total Pensioneers"
              value={data?.doc?.totalPensioners ?? 0}
              desc={"from last month"}
              change={`${data?.doc?.pensionersChangeFromLastMonth} %`}
              icon={<UserCircleIcon className="size-[12px] md:size-[35px]" />}
            />
            <ParishMetricCard
              label="Monthly Contributions"
              value={`₦ ${506999}`}
              desc={"from last month"}
              change={"12.00%"}
              icon={<DollarCircleIcon className="size-[18px] md:size-[35px]" />}
            />
            <ParishMetricCard
              label="Outstanding Balances"
              value={72}
              desc={"3 contributors overdue"}
              icon={
                <DownwardTrendCircle className="size-[18px] md:size-[35px]" />
              }
            />
          </SimpleGrid>
        </SkeletonWrapper>
      </Stack>
      <Box className="flex flex-col-reverse items-baseline gap-6 md:grid md:grid-cols-[2fr_1fr]">
        <ContributorStatsChart
          isLoading={isLoading}
          data={(data?.doc.contributorStatusChart ?? []).map((item) => ({
            ...item,
            color: colorMap[item.name] ?? "gray.6",
          }))}
        />
        <Stack
          bg={"#fff"}
          gap={8}
          className="h-full w-full rounded-3xl px-3 py-4 md:px-4 md:py-6"
        >
          <Text className="font-poppins text-base leading-[17px] font-semibold text-[#1F2937]">
            Quick Actions
          </Text>
          <Text
            component="a"
            href=""
            className="font-inter flex h-[48px] items-center justify-start gap-2 rounded-[8px] bg-[#eaeff7] p-2 text-sm leading-6 font-medium text-[#2E5AAC] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:h-[80px] md:gap-4 md:px-6 md:py-4"
          >
            <Box component="span">
              <DocumentWrapperIcon />
            </Box>
            Generate Report
          </Text>
          <Text
            component="a"
            href=""
            className="font-inter flex h-[48px] items-center justify-start gap-2 rounded-[8px] bg-[#e7f6f3] p-2 text-sm leading-6 font-medium text-[#13A382] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:h-[80px] md:gap-4 md:px-6 md:py-4"
          >
            <Box component="span">
              <UsersBoxIcon />
            </Box>
            Update Status
          </Text>
          <Text
            component="a"
            href={routes.dioceseDashboard.approveKyc}
            className="font-inter flex h-[48px] items-center justify-start gap-2 rounded-[8px] bg-[#e7f6f3] p-2 text-sm leading-6 font-medium text-[#13A382] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:h-[80px] md:gap-4 md:px-6 md:py-4"
          >
            <Box component="span">
              <UserCheckBoxIcon />
            </Box>
            Approve KYC
          </Text>
        </Stack>
      </Box>
      <TopContributingParishGraph />
    </Stack>
  );
};

export default DioceseDashboardClient;
