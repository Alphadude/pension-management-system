"use client";
import { Box, Button, Stack, Text } from "@mantine/core";
import VendorManagementDashboard from "./vendor-management-dashboard";

import VendorManagementTable from "./vendor-management-table";
const VendorManagementClient = () => {
  return (
    <>
      <Stack gap={16} className="md:gap-6">
        <Box className="flex w-full items-center justify-between">
          {/* Left side: Text */}
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

          {/* Right side: Button */}
          <Button className="bg-[#2E5AAC] text-white" size="md">
            Export CSV
          </Button>
        </Box>

        <VendorManagementDashboard />
        <VendorManagementTable />
      </Stack>
    </>
  );
};

export default VendorManagementClient;
