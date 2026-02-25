"use client";
import { Box, Button, Modal, Text } from "@mantine/core";

import { MonthPickerInput, YearPickerInput } from "@mantine/dates";

interface Props {
  opened: boolean;
  close: VoidFunction;
}

const EnterDateModal = ({ opened, close }: Props) => {
  return (
    <Modal opened={opened} onClose={close} size="sm" centered>
      <Text
        fw={700}
        className="text-[20px] sm:text-[18px]" // 20px desktop, 18px mobile
      >
        Contributor Start Date
      </Text>

      <Box className="space-y-4">
        <YearPickerInput label="Year" placeholder="Select Year" clearable />
        <MonthPickerInput label="Month" placeholder="Select Month" clearable />
      </Box>

      <Button fullWidth color="blue" size="md" radius="lg">
        Confirm & Submit
      </Button>
    </Modal>
  );
};

export default EnterDateModal;
