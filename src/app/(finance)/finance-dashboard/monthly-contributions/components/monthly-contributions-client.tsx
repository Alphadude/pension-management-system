"use client";
import { Box, Stack, Text } from "@mantine/core";
import MonthlyContributionsTable from "./monthly-contributions-table";

const MonthlyContributionsClient = () => {
  return (
    <>
      <Stack gap={16} className="md:gap-6">
        <Box className="flex w-full items-center justify-between">
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
        </Box>
        <MonthlyContributionsTable />
      </Stack>
    </>
  );
};

export default MonthlyContributionsClient;
