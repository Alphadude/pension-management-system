import { Box, Button, Modal, Text } from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";

interface DatemodalProps {
  opened: boolean;
  onClose: () => void;
  contributor: string; // name of contributor
}

const Datemodal = ({
  opened,
  onClose,
  contributor: _contributor,
}: DatemodalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} size="sm" centered>
      <Text fw={700} className="text-[20px] sm:text-[18px]">
        Contributor Start Date
      </Text>

      <Box className="mt-4 space-y-4">
        <YearPickerInput label="Year" placeholder="Select Year" clearable />
        <MonthPickerInput label="Month" placeholder="Select Month" clearable />
      </Box>

      <Button fullWidth color="blue" size="md" radius="lg" className="mt-4">
        Confirm & Submit
      </Button>
    </Modal>
  );
};

export default Datemodal;
