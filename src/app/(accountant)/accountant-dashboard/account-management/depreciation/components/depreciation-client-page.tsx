"use client";

import { useRunDepreciation } from "@/hooks/query/use-accounting";
import { Alert, Box, Button, Group, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Info, PlayCircle } from "lucide-react";
import DepreciationTable from "./depreciation-table";

const DepreciationClientPage = () => {
  const { mutate, isPending } = useRunDepreciation();

  const handleRunDepreciation = () => {
    mutate(undefined, {
      onSuccess: () => {
        notifications.show({
          title: "Calculation Complete",
          message: "Depreciation has been run and ledger entries posted.",
          color: "green",
        });
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: "Failed to run depreciation. Please try again.",
          color: "red",
        });
      },
    });
  };

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="flex-start">
          <Box className="flex-1">
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Depreciation Schedule
            </Text>
            <Text className="mb-4 text-sm font-normal text-[#6B7280] md:text-base">
              {" "}
              View current depreciation schedules and process periodic
              write-downs using the Reducing Balance method.
            </Text>

            <Alert
              variant="light"
              color="blue"
              title="Methodology"
              icon={<Info size={16} />}
            >
              The system utilizes the <strong>Reducing Balance Method</strong>{" "}
              to calculate depreciation. Running the engine will automatically
              generate journal entries to reflect the expense and update
              accumulated depreciation accounts.
            </Alert>
          </Box>
          <Button
            leftSection={<PlayCircle size={16} />}
            color="blue"
            loading={isPending}
            onClick={handleRunDepreciation}
          >
            Run Monthly Depreciation
          </Button>
        </Group>
      </Stack>

      <DepreciationTable />
    </Stack>
  );
};

export default DepreciationClientPage;
