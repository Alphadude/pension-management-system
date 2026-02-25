"use client";

import { DonutChart } from "@mantine/charts";
import { Box, Group, Stack, Text } from "@mantine/core";

const VoucherSigningStats = () => {
  const data = [
    { name: "Signed", value: 78, color: "#1d4ed8" },
    { name: "Unsigned", value: 22, color: "#e5e7eb" },
  ];

  return (
    <Box className="rounded-[12px] bg-[#fff] p-6">
      {/* Header */}
      <Stack gap={0}>
        <Text className="text-2xl font-semibold text-[#0A0A0A]">
          Voucher Signing Status
        </Text>
        <Text className="text-sm font-normal text-[#737373]">
          Signed vs unsigned vouchers
        </Text>
      </Stack>

      {/* Chart */}
      <Box className="mt-6 flex items-center justify-center">
        <Box className="relative h-56 w-56">
          <DonutChart
            data={data}
            size={220}
            thickness={30}
            tooltipDataSource="segment"
          />

          {/* Center text */}
          <Box className="absolute inset-0 flex flex-col items-center justify-center">
            <Text className="text-2xl font-bold text-[#0A0A0A]">78%</Text>
            <Text className="text-sm text-[#6B7280]">Signed</Text>
          </Box>
        </Box>
      </Box>

      {/* Legend */}
      <Group justify="center" mt="md" gap="lg">
        <Group gap="xs">
          <span className="h-3 w-3 rounded-full bg-[#1d4ed8]" />
          <Text size="sm" className="text-gray-700">
            Signed (78)
          </Text>
        </Group>
        <Group gap="xs">
          <span className="h-3 w-3 rounded-full bg-[#e5e7eb]" />
          <Text size="sm" className="text-gray-700">
            Unsigned (22)
          </Text>
        </Group>
      </Group>
    </Box>
  );
};

export default VoucherSigningStats;
