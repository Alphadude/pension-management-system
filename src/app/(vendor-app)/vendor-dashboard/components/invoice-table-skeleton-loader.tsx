import Repeater from "@/components/ui/repeater";
import { Box, Skeleton, Stack } from "@mantine/core";

const InvoiceTableSkeletonLoader = () => {
  return (
    <Stack>
      <Box className="grid grid-cols-1 items-center gap-x-10 border-t border-[#E5E7EB] bg-white md:grid-cols-4 md:px-5 md:py-[18px]">
        <Repeater count={5}>
          {/* Mobile View */}
          <Box className="flex flex-col gap-2 bg-white md:hidden">
            <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
              <Skeleton width={60} height={14} />
              <Skeleton width={60} height={14} />
            </Box>
            <Box className="flex justify-between px-4 py-[10px]">
              <Skeleton width={80} height={16} />
              <Skeleton width={80} height={16} />
            </Box>

            <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
              <Skeleton width={60} height={14} />
              <Skeleton width={60} height={14} />
            </Box>
            <Box className="flex justify-between px-4 py-[10px]">
              <Skeleton width={100} height={18} />
              <Skeleton width={60} height={18} />
            </Box>
          </Box>
        </Repeater>
        {/* Desktop View */}
        {/* <SimpleGrid cols={4} className="hidden gap-2 md:grid"> */}
        <Skeleton height={18} />
        <Skeleton height={18} />
        <Skeleton height={18} />
        <Skeleton width={80} height={24} />
        {/* </SimpleGrid> */}
        {/* </Repeater> */}
      </Box>
    </Stack>
  );
};

export default InvoiceTableSkeletonLoader;
