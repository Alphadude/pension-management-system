"use client";
import AnimateComponent from "@/components/ui/animate-component";
import { Box, Stack, Text } from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import PensionManagementDashboard from "./pension-management-dashboard";

const PensionManagementClient = () => {
  const mounted = useMounted();
  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Stack gap={16} className="md:gap-6">
        <Box>
          <Text
            className="text-left text-[20px] font-bold text-[#1E1E1E] md:text-[28px]"
            mb={0}
          >
            Finance Dashboard
          </Text>
          <Text
            className="text-left text-sm text-[#6B7280] md:text-base"
            fw={400}
          >
            System operational • Last updated: 20:21:23
          </Text>
        </Box>
        <PensionManagementDashboard />
      </Stack>
    </AnimateComponent>
  );
};

export default PensionManagementClient;
