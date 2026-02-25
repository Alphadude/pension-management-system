import { useGetFinancePensionDisbursment } from "@/hooks/query/use-finance";
import { AreaChart } from "@mantine/charts";
import { Box, Loader, Stack, Text } from "@mantine/core";

const MonthlyDisbursedTable = () => {
  const { data, isLoading } = useGetFinancePensionDisbursment();
  if (isLoading) {
    return (
      <Box className="flex h-full w-full items-center justify-center rounded-[12px] bg-[#fff] p-6">
        <Loader />
      </Box>
    );
  }
  return (
    <Box className="h-full w-full rounded-[12px] bg-[#fff] p-6">
      <Stack gap={0}>
        <Text className="text-2xl font-semibold text-[#0A0A0A]">
          Monthly Pension Disbursed
        </Text>
        <Text className="text-sm font-normal text-[#737373]">
          Trend over the last 6 months
        </Text>
      </Stack>
      <AreaChart
        h={235}
        data={data?.data ?? []}
        dataKey="month"
        series={[{ name: "value", color: "#2e5aac" }]}
        withGradient
        gridAxis="xy"
        mt={24}
      />
    </Box>
  );
};

export default MonthlyDisbursedTable;
