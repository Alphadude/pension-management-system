import { Card, Group, Stack, Text } from "@mantine/core";
import { type ReactNode } from "react";

interface Props {
  label: string;
  value: number | string;
  icon: ReactNode;
}

export function OverviewMetricCard({ label, value, icon }: Props) {
  return (
    <Card radius={5} className="p-2 md:px-4 md:py-5">
      <Group justify="space-between" align="flex-start">
        <Stack gap={6} className="sm:gap-3">
          <Text className="text-xs leading-[17px] font-normal text-[#0A0A0A] md:text-sm md:font-medium">
            {label}
          </Text>
          <Text className="text-xs leading-[17px] font-normal text-[#2E5AAC] md:text-2xl md:font-bold">
            {value.toLocaleString()}
          </Text>
        </Stack>
        {icon}
      </Group>
    </Card>
  );
}
