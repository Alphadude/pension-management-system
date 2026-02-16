import Repeater from "@/components/ui/repeater";
import { Box, Group, Skeleton, Stack } from "@mantine/core";

const ReportsTableMobileSkeleton = () => {
  return (
    <Repeater count={3}>
      <Box p="md" style={{ maxWidth: 600, margin: "0 auto" }}>
        <Stack gap="xl">
          {/* Header section with DATE and INVOICE */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Skeleton height={16} width={40} />
              <Skeleton height={20} width={100} />
            </Stack>
            <Stack gap="xs" align="flex-end">
              <Skeleton height={16} width={60} />
              <Skeleton height={20} width={120} />
            </Stack>
          </Group>

          {/* Amount and Status section */}
          <Group justify="space-between" align="flex-start" mt="xl">
            <Stack gap="xs">
              <Skeleton height={16} width={60} />
              <Skeleton height={32} width={120} />
            </Stack>
            <Stack gap="xs" align="flex-end">
              <Skeleton height={16} width={50} />
              <Skeleton height={24} width={80} radius="xl" />
            </Stack>
          </Group>

          {/* Action section */}
          <Stack gap="md" mt="xl">
            <Skeleton height={24} width={60} />
            <Skeleton height={20} width={30} />
          </Stack>
        </Stack>
      </Box>
    </Repeater>
  );
};

export default ReportsTableMobileSkeleton;
