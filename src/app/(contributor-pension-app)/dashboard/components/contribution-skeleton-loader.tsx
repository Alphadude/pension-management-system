import Repeater from "@/components/ui/repeater";
import { Box, Group, Skeleton, Stack } from "@mantine/core";

const ContributionSkeletonLoader = () => {
  return (
    <Repeater count={3}>
      <Box
        p="md"
        style={{
          border: "1px solid #e9ecef",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <Stack gap="md">
          {/* Date and Type row */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Skeleton height={16} width={40} />
              <Skeleton height={20} width={100} />
            </Stack>
            <Stack gap="xs" align="flex-end">
              <Skeleton height={16} width={40} />
              <Group gap="xs" align="center">
                <Skeleton height={12} width={12} />
                <Skeleton height={20} width={50} />
              </Group>
            </Stack>
          </Group>

          {/* Amount and Status row */}
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Skeleton height={16} width={60} />
              <Skeleton height={24} width={120} />
            </Stack>
            <Stack gap="xs" align="flex-end">
              <Skeleton height={16} width={50} />
              <Skeleton height={24} width={80} radius="xl" />
            </Stack>
          </Group>
        </Stack>
      </Box>
    </Repeater>
  );
};

export default ContributionSkeletonLoader;
