"use client";

import { Alert, Box, Group, Stack, Text } from "@mantine/core";
import { Info } from "lucide-react";
import GenerateReportCard from "./generate-report-card";

const ReportsClientPage = () => {
  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box className="flex-1">
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Financial Reports
            </Text>
            <Text className="mb-4 text-sm font-normal text-[#6B7280] md:text-base">
              {" "}
              Generate real-time Trial Balance, P&L, and Balance Sheet using
              ledger data.
            </Text>

            <Alert
              variant="light"
              color="blue"
              title="Automatic Aggregation"
              icon={<Info size={16} />}
            >
              Reports are automatically aggregated from recorded transactions
              and journal entries in real-time.
            </Alert>
          </Box>
        </Group>
      </Stack>

      <Box className="w-full">
        <GenerateReportCard />
      </Box>
    </Stack>
  );
};

export default ReportsClientPage;
