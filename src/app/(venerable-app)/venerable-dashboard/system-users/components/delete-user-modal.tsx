"use client";
import { Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { Trash2 } from "lucide-react";

interface DeleteUserModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  isPending: boolean;
}

const DeleteUserModal = ({
  opened,
  onClose,
  onConfirm,
  userName,
  isPending,
}: DeleteUserModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      radius="md"
      title={
        <Text fw={700} size="lg">
          Delete User
        </Text>
      }
    >
      <Stack gap={24}>
        <Box className="flex flex-col items-center justify-center py-4">
          <Box className="mb-4 rounded-full bg-red-50 p-4">
            <Trash2 size={40} color="#E03131" />
          </Box>
          <Text className="text-center font-medium text-gray-800">
            Are you sure you want to delete{" "}
            <Text span fw={700}>
              {userName}
            </Text>
            ?
          </Text>
          <Text size="sm" c="dimmed" className="text-center">
            This action cannot be undone. All data associated with this user
            will be permanently removed.
          </Text>
        </Box>
        <Group justify="flex-end" gap="sm">
          <Button
            variant="filled"
            onClick={onClose}
            disabled={isPending}
            bg="#228be6"
            className="hover:bg-[#1c7ed6]"
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            onClick={onConfirm}
            loading={isPending}
            bg="#fa5252"
            className="hover:bg-[#e03131]"
          >
            Delete User
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteUserModal;
