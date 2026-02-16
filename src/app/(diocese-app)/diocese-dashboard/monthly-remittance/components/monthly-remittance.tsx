"use client";
import AnimateComponent from "@/components/ui/animate-component";
import { Box, Group, Stack, Text } from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import MonthlyRemittanceTable from "./monthly-remittance-table";

const MonthlyRemittance = () => {
  const mounted = useMounted();
  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Stack gap={20} className="sm:gap-5">
        <Stack gap={16} className="md:gap-6">
          <Group justify="space-between" align="center">
            <Box>
              <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
                Welcome, ABC Dioceses
              </Text>
              <Text className="text-sm font-normal text-[#6B7280] md:text-base">
                Manage your diocese information
              </Text>
            </Box>
          </Group>
        </Stack>
        <MonthlyRemittanceTable />
      </Stack>
    </AnimateComponent>
  );
};

export default MonthlyRemittance;
