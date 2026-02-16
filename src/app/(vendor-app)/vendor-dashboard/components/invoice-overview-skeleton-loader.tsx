import Repeater from "@/components/ui/repeater";
import { Card, Group, SimpleGrid, Skeleton, Stack } from "@mantine/core";

const VendorMetricCardSkeleton = () => {
  return (
    <Card
      radius={5}
      className="px-2 pt-2 pb-[18px] shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)] xl:px-7 xl:py-5"
    >
      <Stack className="gap-y-[15px]">
        <Group className="justify-between">
          <Skeleton height={17} width="60%" className="xl:h-[20px]" />
          <Skeleton
            height={20}
            width={20}
            radius="sm"
            className="md:h-[29px] md:w-[29px]"
          />
        </Group>
        <Skeleton height={17} width="80%" className="xl:h-[24px]" />
      </Stack>
    </Card>
  );
};

const InvoiceOverviewSkeletonLoader = () => {
  return (
    <SimpleGrid className="grid-cols-2 gap-2 sm:grid-cols-4 xl:gap-x-4">
      <Repeater count={4}>
        <VendorMetricCardSkeleton />
      </Repeater>
    </SimpleGrid>
  );
};

export default InvoiceOverviewSkeletonLoader;
