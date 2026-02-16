"use client";
import AnimateComponent from "@/components/ui/animate-component";
import { routes } from "@/lib/routes";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import ParishManagementTable from "./parish-management-table";

const ParishManagementClient = () => {
  const mounted = useMounted();
  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Stack gap={20}>
        <Stack gap={16} className="md:gap-6">
          <Group justify="space-between" align="center">
            <Box>
              <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
                Welcome, ABC Diocese
              </Text>
              <Text className="text-sm font-normal text-[#6B7280] md:text-base">
                Manage your diocese information
              </Text>
            </Box>
            <Button
              component="a"
              href={routes.parishDashboard.importContributors}
            >
              <Box component="span">Bulk Upload</Box>
            </Button>
          </Group>
        </Stack>
        <ParishManagementTable />
      </Stack>
    </AnimateComponent>
  );
};

export default ParishManagementClient;
