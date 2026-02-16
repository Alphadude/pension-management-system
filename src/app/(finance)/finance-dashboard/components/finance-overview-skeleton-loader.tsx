import { UserCircleIcon } from "@/components/icons/user-circle-icon";
import Repeater from "@/components/ui/repeater";
import { Card, Group, SimpleGrid, Skeleton, Stack } from "@mantine/core";

export const FinanceContributorStatusSkeletonLoader = () => {
  return (
    <Card className="flex flex-col items-center justify-center">
      <Skeleton height={180} width={180} className="rounded-full" />
      <Skeleton height={8} width={300} mt={16} />
    </Card>
  );
};

const FinanceMetricCardSkeleton = () => {
  return (
    <Card
      radius={5}
      className="p-2 shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] md:px-4 md:py-5"
    >
      <Group justify="space-between" align="flex-start">
        <Stack gap={6} className="sm:gap-3">
          <Skeleton height={8} width={120} className="lg:h-[8px]" />
          <Skeleton
            height={10}
            width={25}
            className="lg:h-[25px] lg:w-[50px]"
          />
          <Skeleton
            height={8}
            width={130}
            className="lg:h-[8px] lg:w-[150px]"
          />
        </Stack>
        <UserCircleIcon className="size-[18px] md:size-[35px]" />
      </Group>
    </Card>
  );
};

const FinanceOverviewSkeletonLoader = () => {
  return (
    <SimpleGrid className="grid-cols-2 gap-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
      <Repeater count={4}>
        <FinanceMetricCardSkeleton />
      </Repeater>
    </SimpleGrid>
  );
};

export default FinanceOverviewSkeletonLoader;
