import { AreaChart } from "@mantine/charts";
import { Box, Stack, Text } from "@mantine/core";

const data = [
  { month: "Jan", "Holy Trinity": 110 },
  { month: "Feb", "Holy Trinity": 60 },
  { month: "Mar", "Holy Trinity": 80 },
  { month: "Apr", "Holy Trinity": null },
  { month: "May", "Holy Trinity": null },
  { month: "Jun", "Holy Trinity": 40 },
];

const TopContributingParishGraph = () => (
  <Box className="h-full w-full rounded-[12px] bg-[#fff] p-6">
    <Stack gap={0}>
      <Text className="text-2xl font-semibold text-[#0A0A0A]">
        Top Contributing Parish
      </Text>
      <Text className="text-sm font-normal text-[#737373]">
        Highest contributing parishes this month
      </Text>
    </Stack>
    <AreaChart
      h={235}
      data={data}
      dataKey="month"
      series={[{ name: "Holy Trinity", color: "#2e5aac" }]}
      withGradient
      gridAxis="xy"
      mt={24}
    />
  </Box>
);

export default TopContributingParishGraph;
