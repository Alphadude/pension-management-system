import { AreaChart } from "@mantine/charts";
import { Box, Stack, Text } from "@mantine/core";

const data = [
  { month: "Jul", value: 1200000 },
  { month: "Aug", value: 900000 },
  { month: "Sep", value: 1500000 },
  { month: "Oct", value: 2000000 },
  { month: "Nov", value: 2300000 },
  { month: "Dec", value: 3000000 },
];

const MonthlyContributionTrend = () => {
  return (
    <Box className="h-full w-full rounded-[12px] bg-[#fff] p-6">
      <Stack gap={0}>
        <Text className="text-2xl font-semibold text-[#0A0A0A]">
          Monthly Contribution Trend
        </Text>
        <Text className="text-sm font-normal text-[#737373]">
          Trend over the last 6 months
        </Text>
      </Stack>
      <AreaChart
        h={235}
        data={data}
        dataKey="month"
        series={[{ name: "value", color: "#2e5aac" }]}
        withGradient
        gridAxis="xy"
        mt={24}
      />
    </Box>
  );
};

export default MonthlyContributionTrend;
