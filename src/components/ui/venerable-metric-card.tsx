import { cn } from "@/lib/utils";
import { Box, Card, Group, Stack, Text } from "@mantine/core";
import { type ReactNode } from "react";

interface Props {
  label: string;
  value: number | string;
  desc: number | string;
  change?: number | string;
  icon: ReactNode;
}

export function VenerableMetricCard({
  label,
  value,
  icon,
  desc,
  change,
}: Props) {
  return (
    <Card
      radius={5}
      className="p-2 shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] md:px-4 md:py-5"
    >
      <Group justify="space-between" align="flex-start">
        <Stack gap={6} className="sm:gap-3">
          <Text className="text-xs leading-[17px] font-normal text-[#0A0A0A] md:text-sm md:font-medium">
            {label}
          </Text>
          <Text className="text-primary text-xs leading-[17px] font-normal md:text-2xl md:font-bold">
            {value}
          </Text>
          <Text className="text-xs leading-[17px] font-normal text-[#6B7280] md:text-sm">
            <Box
              component="span"
              className={cn(
                typeof change === "number" && change <= 0
                  ? "text-[#dc2626]"
                  : "text-[#16a34a]",
              )}
            >
              {change}
            </Box>{" "}
            {desc}
          </Text>
        </Stack>
        {icon}
      </Group>
    </Card>
  );
}
