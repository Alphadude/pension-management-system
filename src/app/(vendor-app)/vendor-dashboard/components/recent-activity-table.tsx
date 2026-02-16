"use client";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetInvoice } from "@/hooks/query/use-get-invoice";
import { cn } from "@/lib/utils";
import { Box, Stack, Text } from "@mantine/core";
import { format } from "date-fns";
import numeral from "numeral";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
import EmptyTable from "./empty-table";
import { getInvoiceStatusStyle, invoiceTableHeadings } from "./extras";
import InvoiceTable from "./invoice-table";

const headerStyles = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#6B7280",
};

const RecentActivityTable = () => {
  const { data: invoices, isLoading, updateQuery } = useGetInvoice();
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack gap={16} w={"100%"}>
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 w-full rounded-[12px] bg-white">
        <Box className="flex items-center justify-between border-b border-[#F3F4F6] px-5 py-4">
          <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
            Recent Activity
          </Text>
        </Box>
        <Box>
          {/* mobile view */}
          <Box className="flex flex-col gap-2 bg-white md:hidden">
            {invoices?.doc.map((invoice, index) => (
              <Box
                key={`recent-activity-table-row-${index}`}
                className="grid grid-cols-1 items-center border-t border-[#E5E7EB] bg-white md:grid-cols-4 md:px-5 md:py-[18px]"
              >
                {/* Mobile View */}
                <Box className="flex flex-col gap-2 bg-white md:hidden">
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>DATE</Text>
                    <Text style={headerStyles}>INVOICE NUMBER</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-xs font-medium text-[#374151]">
                      {format(invoice?.date, "MMM d, yyyy")}
                    </Text>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {invoice?.invoiceNumber}
                    </Text>
                  </Box>

                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>AMOUNT</Text>
                    <Text style={headerStyles}>STATUS</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      ₦{numeral(invoice?.totalAmount).format("0,0.00")}
                    </Text>
                    <Box
                      component="span"
                      className={cn(
                        "rounded-full border px-[10px] py-1 text-xs font-medium capitalize",
                        getInvoiceStatusStyle(invoice?.status),
                      )}
                    >
                      {invoice?.status}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          {/* desktop view */}
          <TableWrapper
            isLoading={isLoading}
            data={invoices?.doc}
            table={(data) => <InvoiceTable data={data} />}
            skeletonRow={9}
            skeletonCol={4}
            emptyComponent={
              <EmptyTable
                tableHeading={invoiceTableHeadings}
                message=" You have no recent activity, all recent activity will appear here!!"
              />
            }
          />
        </Box>
      </Box>
      <PaginationCard
        page={page ?? 1}
        pageSize={10}
        total={invoices?.total_pages ?? 0}
        onChange={handlePageChange}
        showPageItem
      />
    </Stack>
  );
};

export default RecentActivityTable;
