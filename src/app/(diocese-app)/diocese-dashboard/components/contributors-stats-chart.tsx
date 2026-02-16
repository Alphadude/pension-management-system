import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { DonutChart } from "@mantine/charts";
import { Box, Card, Group, Stack, Text } from "@mantine/core";
import { DioceseContributorStatusSkeletonLoader } from "./diocese-overview-skeleton-loader";

interface Props {
  name: string;
  value: number;
}

const ContributorStatsChart = ({
  data,
  isLoading,
}: {
  data: Props[];
  isLoading: boolean;
}) => {
  const colorMap: Record<string, string> = {
    active: "#2E5AAC",
    retired: "#4A90E2",
    deceased: "#7BB3F0",
  };

  const contributorStatusChart = data.map((item) => ({
    ...item,
    color: colorMap[item.name] ?? "gray.6",
  }));

  return (
    <Card
      radius={4}
      px={12}
      pt={12}
      pb={18}
      className="shadow-[rgba(0, 0, 0, 0.05)] flex h-full w-full flex-col justify-items-center gap-3 md:gap-6 md:rounded-[8px] md:!p-6"
    >
      <Stack gap={3} className="md:gap-2">
        <Text className="text-base font-semibold text-[#0A0A0A] md:text-2xl">
          Contributor Status
        </Text>
        <Text className="text-[10px] leading-2.5 font-normal text-[#737373] md:text-sm">
          Breakdown of active, retired, and deceased contributors
        </Text>
      </Stack>
      <Stack align="center">
        <SkeletonWrapper
          isLoading={isLoading}
          Loader={DioceseContributorStatusSkeletonLoader}
        >
          <DonutChart
            className="flex justify-self-center"
            data={contributorStatusChart}
            thickness={30}
          />
        </SkeletonWrapper>
        <Group gap={12} className="md:gap-6">
          {contributorStatusChart.map((item) => (
            <Group key={item.name} gap={4}>
              <Box
                className={`h-1.5 w-1.5 rounded-full md:h-3 md:w-3`}
                style={{
                  backgroundColor: `var(--mantine-color-${item.color})`,
                }}
              />
              <Text className="text-[10px] leading-2.5 text-[#0A0A0A] md:text-sm">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}:{" "}
                {item.value}
              </Text>
            </Group>
          ))}
        </Group>
      </Stack>
    </Card>
  );
};

export default ContributorStatsChart;
