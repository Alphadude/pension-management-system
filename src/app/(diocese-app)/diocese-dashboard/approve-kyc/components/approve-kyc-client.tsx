"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetPendingUsers } from "@/hooks/query/use-user";
import { Box, Stack, Text } from "@mantine/core";
import { parseAsInteger, useQueryState } from "nuqs";
import { KYCTableHeadings } from "./extras";
import KycTable from "./kyc-table";

const ApproveKycClientPage = () => {
  const { data, isLoading, updateQuery } = useGetPendingUsers();
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  return (
    <Stack gap={20}>
      <Box>
        <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
          Welcome, ABC Diocese
        </Text>
        <Text className="text-sm font-normal text-[#6B7280] md:text-base">
          Manage your diocese information
        </Text>
      </Box>
      <TableWrapper
        isLoading={isLoading}
        data={data?.doc}
        table={(data) => <KycTable data={data} />}
        skeletonRow={9}
        skeletonCol={5}
        emptyComponent={
          <EmptyTable
            tableHeading={KYCTableHeadings}
            message=" You have no recent activity, all recent activity will appear here!!"
          />
        }
      />
      <PaginationCard
        page={page ?? 1}
        pageSize={10}
        total={data?.total_pages ?? 0}
        onChange={handlePageChange}
        showPageItem
      />
    </Stack>
  );
};

export default ApproveKycClientPage;
