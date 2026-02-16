import { Card, Group, Stack, Text } from "@mantine/core";
import { type ReactNode } from "react";

interface Props {
  label: string;
  value: number | string;
  icon: ReactNode;
}

export function VendorMetricCard({ label, value, icon }: Props) {
  return (
    <Card
      radius={5}
      className="px-2 pt-2 pb-[18px] shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] xl:px-7 xl:py-5"
    >
      <Stack className="gap-y-[15px]">
        <Group className="justify-between">
          <Text className="text-primary text-xs leading-[17px] font-normal xl:text-sm">
            {label}
          </Text>
          {icon}
        </Group>
        <Text className="text-base leading-[17px] font-semibold text-black xl:text-xl">
          {value}
        </Text>
      </Stack>
    </Card>
  );
}

export default VendorMetricCard;
