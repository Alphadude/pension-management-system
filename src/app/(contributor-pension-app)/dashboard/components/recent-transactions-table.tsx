import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { getInvoiceStatusStyle } from "@/app/(vendor-app)/vendor-dashboard/components/extras";
import { WrappedTransactionIcon } from "@/components/icons/wrapped-transaction-icon";
import { PaginationCard } from "@/components/ui/pagination";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetUserContributions } from "@/hooks/query/use-contribution";
import { cn } from "@/lib/utils";
import { Box, Stack, Text } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
import ContributionSkeletonLoader from "./contribution-skeleton-loader";
import ContributionTable from "./contribution-table";
import ContributionTypeItem from "./contribution-type-item";
import { contributionTableHeadings, getContributionTypeStyle } from "./extras";

const RecentTransactionTable = () => {
  const { data: sessionData } = useSession();
  const [year, setYear] = useQueryState("year");
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const { data, isLoading, updateQuery } = useGetUserContributions(
    sessionData?.user?.id ?? "",
  );

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    updateQuery("page", 1);
    updateQuery("year", year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  return (
    <Stack>
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] h-fit w-full rounded-[12px] bg-[#fff]">
        <Box className="flex items-center justify-between border-b border-b-[#F3F4F6] px-5 py-4">
          <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
            Recent Transactions
          </Text>
          <Box className="flex items-center gap-4">
            <YearPickerInput
              placeholder="Select Year"
              maxDate={new Date()}
              value={year}
              onChange={(value) => {
                if (value) {
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  setYear(`${new Date(value).getFullYear()}`);
                }
              }}
            />
            {/* <Link
            href="#"
            className="flex items-center gap-1 text-[10px] font-normal text-[#2E5AAC] md:text-sm"
          >
            View all <ChevronRight size={16} color="#2E5AAC" />
          </Link> */}
          </Box>
        </Box>
        <Box visibleFrom="sm">
          <TableWrapper
            isLoading={isLoading}
            data={data?.doc}
            table={(data) => <ContributionTable {...{ data }} />}
            skeletonRow={10}
            skeletonCol={5}
            emptyComponent={
              <EmptyTable
                tableHeading={contributionTableHeadings}
                message=" You have no recent transactions, all recent transactions will appear
            here!!"
              />
            }
          />
        </Box>

        <Box hiddenFrom="sm">
          <SkeletonWrapper
            isLoading={isLoading}
            isEmpty={!data?.doc?.length && !isLoading}
            EmptyComponent={
              <Box className="flex h-[453px] flex-col pt-20">
                <Stack gap={22} className="flex flex-col items-center">
                  <WrappedTransactionIcon />
                  <Text className="max-w-[466px] text-center text-sm font-normal text-[#6B7280]">
                    You have no recent transactions, all recent transactions
                    will appear here!!
                  </Text>
                </Stack>
              </Box>
            }
            Loader={ContributionSkeletonLoader}
          >
            {data?.doc?.map((contribution) => (
              <Box
                key={`payment-history-mobile-row-${contribution.id}`}
                className="grid grid-cols-1 border-t border-t-[#E5E7EB] md:grid-cols-[2fr_2fr_2fr_1fr] md:px-5 md:py-[18px]"
              >
                <Box className="flex flex-col gap-2 bg-white md:hidden">
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text className="text-xs font-medium text-[#6B7280]">
                      Date
                    </Text>
                    <Text className="text-xs font-medium text-[#6B7280]">
                      Type
                    </Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-xs font-medium text-[#374151]">
                      {format(contribution?.createdAt, "MMM d, yyyy")}
                    </Text>
                    <ContributionTypeItem type={contribution?.type} />
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text className="text-xs font-medium text-[#6B7280]">
                      Amount
                    </Text>
                    <Text className="text-xs font-medium text-[#6B7280]">
                      Status
                    </Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Box className="text-sm font-normal text-[#4CAF50]">
                      <Text
                        inherit
                        className={cn(
                          getContributionTypeStyle(contribution?.type),
                        )}
                      >
                        {contribution?.type?.toLowerCase() === "debit"
                          ? "-"
                          : ""}{" "}
                        ₦{contribution?.salary?.toLocaleString()}
                      </Text>
                    </Box>
                    <Text>
                      <Box
                        component="span"
                        className={cn(
                          "rounded-full border px-[10px] py-1 text-xs font-medium capitalize",
                          getInvoiceStatusStyle(contribution.status),
                        )}
                      >
                        {contribution.status}
                      </Box>
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </SkeletonWrapper>
        </Box>
      </Box>
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

export default RecentTransactionTable;
