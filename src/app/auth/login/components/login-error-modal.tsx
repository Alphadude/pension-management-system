"use client";

import { Button, Modal, Stack, Text } from "@mantine/core";
import { CircleAlert } from "lucide-react";

interface LoginErrorModalProps {
  opened: boolean;
  onClose: () => void;
  message?: string;
}

const LoginErrorModal = ({
  opened,
  onClose,
  message = "Incorrect Email or Password. Please try again or reset your password.",
}: LoginErrorModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="sm"
      radius="md"
      padding="xl"
    >
      <Stack align="center" gap="md">
        <CircleAlert size={48} color="red" />
        <Text fw={700} size="xl" ta="center">
          Login Failed
        </Text>
        <Text size="sm" ta="center" color="dimmed">
          {message}
        </Text>
        <Button onClick={onClose} fullWidth mt="md" color="red">
          OK
        </Button>
      </Stack>
    </Modal>
  );
};

export default LoginErrorModal;
