import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { DonutChart } from "@mantine/charts";
import { Box, Group, Stack, Text } from "@mantine/core";
import { VenerableContributorStatusSkeletonLoader } from "../venerable-overview-skeleton-loader";

interface Props {
  name: string;
  value: number;
}

const Pensioners = ({
  data,
  isLoading,
}: {
  data: Props[];
  isLoading: boolean;
}) => {
  const colorMap: Record<string, string> = {
    active: "#2E5AAC",
    deceased: "#7BB3F0",
  };

  const pensionerStatusChart = data.map((item) => ({
    ...item,
    color: colorMap[item.name] ?? "gray.6",
  }));

  return (
    <Stack align="center">
      <SkeletonWrapper
        isLoading={isLoading}
        Loader={VenerableContributorStatusSkeletonLoader}
      >
        <DonutChart
          className="mt-4 flex justify-self-center"
          data={pensionerStatusChart}
          thickness={30}
        />
      </SkeletonWrapper>
      <Group gap={12} className="md:gap-6">
        {pensionerStatusChart.map((item) => (
          <Group key={item.name} gap={4}>
            <Box
              className={`h-1.5 w-1.5 rounded-full md:h-3 md:w-3`}
              style={{ backgroundColor: `var(--mantine-color-${item.color})` }}
            />
            <Text className="text-[10px] leading-2.5 text-[#0A0A0A] md:text-sm">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}:{" "}
              {item.value}
            </Text>
          </Group>
        ))}
      </Group>
    </Stack>
  );
};

export default Pensioners;
