import { Box, Button, Group, Modal, Stack, Text } from "@mantine/core";

interface Props {
  opened: boolean;
  close: VoidFunction;
}

const DeleteParishModal = ({ opened, close }: Props) => {
  return (
    <Modal
      size={"sm"}
      opened={opened}
      onClose={close}
      title={
        <Box>
          <Text className="text-xl font-bold text-[#1E1E1E]">Warning!</Text>
        </Box>
      }
    >
      <Stack gap={40}>
        <Text className="text-sm font-medium text-[#6B7280]">
          Are you sure you want to remove this delete this parish, once deleted
          this action cannot be undone.
        </Text>
        <Group justify="flex-end" align="center">
          <Button variant="outline">Cancel</Button>
          <Button
            classNames={{
              root: "w-[121px]",
            }}
            variant="#F44336"
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteParishModal;
