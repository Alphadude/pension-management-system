"use client";
import { BuildingIcon } from "@/components/icons/building-icon";
import { CircleChurchIcon } from "@/components/icons/circle-church-icon";
import { UserCircleIcon } from "@/components/icons/user-circle-icon";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { VenerableMetricCard } from "@/components/ui/venerable-metric-card";
import { useGetVenerableDashboardOverview } from "@/hooks/query/use-venerable";
import { Box, Group, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { Search } from "lucide-react";
import { useState } from "react";
import MonthlyDisbursedTable from "./monthly-pension-disbursed-graph";
import TopContributingParishGraph from "./top-contributing-parish-graph";
import UserStatusStats from "./user-status";
import VenerableOverviewSkeletonLoader from "./venerable-overview-skeleton-loader";

const VenerableDashboardClientPage = () => {
  const { data, isLoading, dataUpdatedAt } = useGetVenerableDashboardOverview();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<Date | null>(null);

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Venerable Dashboard
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              System operational • Last updated:{" "}
              {new Date(dataUpdatedAt).toLocaleTimeString()}
            </Text>
          </Box>
        </Group>

        {/* Search & Filter Section */}
        <Group
          gap={12}
          className="grid w-full grid-cols-1 md:grid-cols-[2fr_1fr_1fr]"
        >
          <TextInput
            leftSection={<Search color="#9CA3AF" size={20} />}
            placeholder="Search by diocese, parish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            classNames={{
              input: "h-[40px] md:h-[42px]",
            }}
          />
          <MonthPickerInput
            placeholder="Select month"
            value={selectedMonth}
            onChange={(value) => setSelectedMonth(value as Date | null)}
            valueFormat="MMMM"
            classNames={{ input: "h-[40px] md:h-[42px]" }}
            clearable
          />
          <YearPickerInput
            placeholder="Select year"
            value={selectedYear}
            onChange={(value) => setSelectedYear(value as Date | null)}
            valueFormat="yyyy"
            classNames={{ input: "h-[40px] md:h-[42px]" }}
            clearable
          />
        </Group>

        <SkeletonWrapper
          isLoading={isLoading}
          Loader={VenerableOverviewSkeletonLoader}
        >
          <SimpleGrid className="grid-cols-2 gap-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
            <VenerableMetricCard
              label="Total Dioceses"
              value={data?.doc.totalDiocese ?? 0}
              desc={"Active dioceses"}
              icon={<BuildingIcon className="size-[18px] md:size-[35px]" />}
            />
            <VenerableMetricCard
              label="Total Parishes"
              value={data?.doc.totalParish ?? 0}
              desc={"Registered parishes"}
              icon={<CircleChurchIcon className="size-[18px] md:size-[35px]" />}
            />
            <VenerableMetricCard
              label="Total Contributors"
              value={data?.doc.totalContributor ?? 0}
              desc={"from last month"}
              icon={<UserCircleIcon className="size-[18px] md:size-[35px]" />}
            />
            <VenerableMetricCard
              label="Total Pensioners"
              value={data?.doc.totalPensioners ?? 0}
              desc={"from last month"}
              icon={<UserCircleIcon className="size-[18px] md:size-[35px]" />}
            />
          </SimpleGrid>
        </SkeletonWrapper>
      </Stack>
      <Box className="flex flex-col-reverse items-baseline gap-6 md:grid md:grid-cols-2">
        <UserStatusStats />
        <MonthlyDisbursedTable />
        <Box className="md:col-span-2">
          <TopContributingParishGraph />
        </Box>
      </Box>
    </Stack>
  );
};

export default VenerableDashboardClientPage;
