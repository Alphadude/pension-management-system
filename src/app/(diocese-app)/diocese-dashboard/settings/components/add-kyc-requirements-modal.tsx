import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";

interface Props {
  opened: boolean;
  close: VoidFunction;
}

const AddKYCRequirementsModal = ({ opened, close }: Props) => {
  return (
    <Modal
      size={"md"}
      opened={opened}
      onClose={close}
      title={
        <Box>
          <Text className="text-xl font-bold text-[#1E1E1E]">
            Add KYC Requirements
          </Text>
          <Text className="text-sm font-normal text-[#737373]">
            Create a new document requirement for contributor enrollment.
          </Text>
        </Box>
      }
    >
      <Stack gap={16}>
        <TextInput label={"Document Name"} placeholder="Government issued ID" />
        <Stack gap={4}>
          <Textarea
            classNames={{
              input: "h-[100px]",
            }}
            label={"Description"}
            placeholder="Valid driver’s license, passport, or national ID"
          />
          <Checkbox
            defaultChecked
            label="Required for enrollment"
            size="xs"
            classNames={{
              label: "font-normal text-[#6B7280] text-xs",
            }}
          />
        </Stack>
        <Group justify="flex-end" align="center">
          <Button variant="outline">Cancel</Button>
          <Button>Add Requirements</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AddKYCRequirementsModal;
