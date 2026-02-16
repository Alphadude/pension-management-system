import { Box, Button, Flex, Modal, Stack, Text } from "@mantine/core";
import { UsersRound } from "lucide-react";

interface ConfirmationModalModalProps {
  opened: boolean;
  onClose: VoidFunction;
  reportPeriod?: string;
  submissionDeadline?: string;
  recipients?: string;
  totalContributors?: number;
  totalContribution?: string;
  parishAddition?: string;
  toDiocese?: string;
  onSubmit?: VoidFunction;
  isPending: boolean;
}

const ConfirmationModal = ({
  opened,
  onClose,
  reportPeriod,
  submissionDeadline,
  recipients,
  totalContributors,
  totalContribution,
  parishAddition,
  toDiocese,
  onSubmit,
  isPending,
}: ConfirmationModalModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      radius="md"
      title={
        <Text fw={700} size="lg" className="md:text-[28px] md:leading-12">
          Confirm & Remit
        </Text>
      }
    >
      <Stack gap={24}>
        <Box className="rounded-[8px] bg-[#f3faf9] px-1.5 py-2.5 md:p-5">
          <Stack gap={10} className="md:gap-4">
            <Text fw={700} className="text-base md:text-xl">
              Submission Details
            </Text>
            <Flex justify="space-between" align="center">
              <Text size="xs" c="#1E1E1E" className="md:text-base">
                Report Period:
              </Text>
              <Text size="sm" fw={600} c="#1E1E1E" className="md:text-base">
                {reportPeriod}
              </Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text size="xs" c="#1E1E1E" className="md:text-base">
                Submission Deadline:
              </Text>
              <Text size="sm" fw={600} c="#1E1E1E" className="md:text-base">
                {submissionDeadline}
              </Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text size="xs" c="#1E1E1E" className="md:text-base">
                Recipients:
              </Text>
              <Text size="sm" fw={600} c="#1E1E1E" className="md:text-base">
                {recipients}
              </Text>
            </Flex>
          </Stack>
        </Box>
        <Box bg="#ebeff7" p={16} className="rounded-lg">
          <Stack gap={8} className="md:gap-4">
            <Text fw={700} className="text-base md:text-xl">
              Summary Statistics
            </Text>
            <Flex align="center" gap={8}>
              <UsersRound color="#2E5AAC" size={16} />
              <Flex justify="space-between" align={"center"} w="100%">
                <Text size="xs" c="#1E1E1E" className="md:text-base">
                  Total Contributors
                </Text>
                <Text size="sm" fw={600} c="#2E5AAC">
                  {totalContributors}
                </Text>
              </Flex>
            </Flex>
            <Flex align="center" gap={8}>
              <UsersRound color="#E2AD0F" size={16} />
              <Flex justify="space-between" align={"center"} w="100%">
                <Text size="xs" c="#1E1E1E" className="md:text-base">
                  Total Contribution
                </Text>
                <Text size="sm" fw={600} c="#E2AD0F">
                  {totalContribution}
                </Text>
              </Flex>
            </Flex>
            <Flex align="center" gap={8}>
              <UsersRound color="#2E5AAC" size={16} />
              <Flex justify="space-between" align={"center"} w="100%">
                <Text size="xs" c="#1E1E1E" className="md:text-base">
                  Parish Addition
                </Text>
                <Text size="sm" fw={600} c="#2E5AAC">
                  {parishAddition}
                </Text>
              </Flex>
            </Flex>
            <Flex align="center" gap={8}>
              <UsersRound color="#13A382" size={16} />
              <Flex justify="space-between" align={"center"} w="100%">
                <Text size="xs" c="#1E1E1E" className="md:text-base">
                  To Diocese
                </Text>
                <Text size="sm" fw={600} c="#13A382" className="md:text-base">
                  {toDiocese}
                </Text>
              </Flex>
            </Flex>
          </Stack>
        </Box>
        <Button onClick={onSubmit} loading={isPending}>
          Confirm & Submit Monthly Remittance
        </Button>
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
