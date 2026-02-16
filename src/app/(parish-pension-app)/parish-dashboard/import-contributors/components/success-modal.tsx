import { GreenCheckCircleIcon } from "@/components/icons/green-check-circle-icon";
import { routes } from "@/lib/routes";
import { Box, Button, Flex, Group, Modal, Stack, Text } from "@mantine/core";

interface SuccessModalProps {
  opened: boolean;
  onClose: () => void;
  totalRecords?: number;
  successfulImports?: number;
  skippedRecords?: number;
  importDate?: string;
}

const SuccessModal = ({
  opened,
  onClose,
  totalRecords = 40,
  successfulImports = 38,
  skippedRecords = 2,
  importDate,
}: SuccessModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} centered size="md" radius="md">
      <Stack gap="16" className="md:gap-6" p="md">
        <Stack gap={8} align="center">
          <GreenCheckCircleIcon />
          <Text
            className="text-[28px] leading-12 md:text-[32px] md:leading-12"
            fw={700}
            ta="center"
          >
            Import Successful!
          </Text>
          <Text className="text-sm font-normal text-[#6b7280]" ta="center">
            Successfully imported{" "}
            <Box component="span" className="text-[#1E1E1E]">
              {successfulImports} contributors
            </Box>{" "}
            into the system.
          </Text>
        </Stack>
        <Box
          w="100%"
          bg={"#2E5AAC0D"}
          px={8}
          py={16}
          className="grid grid-cols-2 justify-items-center gap-6 rounded-[8px] text-center md:py-6"
        >
          <Flex direction="column" mb="xs">
            <Text size="sm" fw={700} c={"#1e1e1e"}>
              {totalRecords} records
            </Text>
            <Text className="text-sm font-normal text-[#6b7280]">
              Total Processed:
            </Text>
          </Flex>
          <Flex direction="column" mb="xs">
            <Text size="sm" fw={700} c="#13A382">
              {successfulImports} Contributors
            </Text>
            <Text className="text-sm font-normal text-[#6b7280]">
              Successfully Imported:
            </Text>
          </Flex>
          <Flex direction="column" mb="xs">
            <Text size="sm" fw={700} c="#F44336">
              {skippedRecords} records
            </Text>
            <Text className="text-sm font-normal text-[#6b7280]">
              Skipped Record(s):
            </Text>
          </Flex>
          <Flex direction="column">
            <Text size="sm" fw={700} c={"#1e1e1e"}>
              {importDate}
            </Text>
            <Text size="sm" c="dimmed">
              Import Date:
            </Text>
          </Flex>
        </Box>
        <Group justify="center" gap="md" w="100%" mt="lg">
          <Button
            variant="outline"
            component="a"
            href={routes.parishDashboard.importContributors}
            radius="md"
            size="sm"
            flex={1}
          >
            Import More Contributors
          </Button>
          <Button
            component="a"
            href={routes.parishDashboard.root}
            radius="md"
            size="sm"
            flex={1}
          >
            Return to Dashboard
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default SuccessModal;
