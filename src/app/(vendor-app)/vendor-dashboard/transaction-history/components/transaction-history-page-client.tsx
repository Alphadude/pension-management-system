"use client";
import { DownloadIcon } from "@/components/icons/download-icon";
import { ThreeDots } from "@/components/icons/three-dots";
import { ViewIcon } from "@/components/icons/view-icon";
import { WrappedTransactionIcon } from "@/components/icons/wrapped-transaction-icon";
import AnimateComponent from "@/components/ui/animate-component";
import { PaginationCard } from "@/components/ui/pagination";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetInvoice } from "@/hooks/query/use-get-invoice";
import { cn, downloadCSV } from "@/lib/utils";
import type { GetInvoiceApiResponse } from "@/types/common";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useMounted } from "@mantine/hooks";
import { format } from "date-fns";
import { FilterIcon } from "lucide-react";
import type { Session } from "next-auth";
import numeral from "numeral";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import EmptyTable from "../../components/empty-table";
import { getInvoiceStatusStyle } from "../../components/extras";
import { paymentHistoryTableHeadings, statusOptions } from "./extras";
import InvoiceDetailsModal from "./invoice-details-modal";
import PaymentHistoryTable from "./payment-history-table";
import TransactionHistroyMobileSkeleton from "./skeleton/transaction-histroy-mobile-skeleton";

interface Props {
  session: Session | null;
}

const TransactionHistoryPageClient = ({ session }: Props) => {
  const mounted = useMounted();
  const [opened, { open, close }] = useDisclosure(false);
  const [paymentItem, setPaymentItem] = useState<
    GetInvoiceApiResponse["doc"][number] | null
  >(null);
  const { data: invoices, isLoading, updateQuery, csvData } = useGetInvoice();
  const [status, setStatus] = useQueryState("status");
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const handleOpendInvoiceDetailsModal = (
    item: GetInvoiceApiResponse["doc"][number],
  ) => {
    setPaymentItem(item);
    open();
  };

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    updateQuery("status", status);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Flex className="gap-x-5">
        <Stack className="font-poppins flex-1 gap-y-2 sm:gap-y-0">
          <Text className="text-dark text-lg leading-[17px] font-semibold sm:text-[28px] sm:leading-12 sm:font-bold">
            Welcome, {session?.user?.firstName}
          </Text>
          <Text className="text-xs leading-[17px] font-normal text-[#6B7280] sm:text-base sm:leading-[17px]">
            Manage your invoices and track payments
          </Text>
        </Stack>
        {csvData?.length && (
          <Button
            onClick={() => downloadCSV(csvData, "transaction-history")}
            className="font-poppins h-[29px] rounded-[8px] text-[10px] leading-[17px] font-normal sm:h-12 sm:text-sm sm:leading-[17px] sm:font-semibold"
          >
            Export CSV
          </Button>
        )}
      </Flex>
      <>
        <InvoiceDetailsModal {...{ opened, close, paymentItem }} />
        <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 mb-[50px] w-full rounded-[12px] border border-[#F3F4F6] bg-white">
          <Box className="flex items-center justify-between border-b border-b-[#F3F4F6] px-5 py-4">
            <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
              Transaction History
            </Text>
            <Box className="flex items-center gap-4">
              <Select
                classNames={{
                  input: "w-[110px] h-[32px]",
                }}
                className="hidden md:block"
                placeholder="Status"
                data={statusOptions}
                value={status}
                onChange={(value) => setStatus(value)}
                withCheckIcon={false}
                clearable
              />
              {/* <Select
              classNames={{
                input: "w-[88px] h-[32px]",
              }}
              placeholder="2025"
              data={["2025", "2024", "2023", "2022"]}
            /> */}
              {/* <Link
              href="#"
              className="flex items-center gap-1 text-[10px] font-normal text-[#2E5AAC] md:text-sm"
            >
              View all <ChevronRight size={16} color="#2E5AAC" />
            </Link> */}

              <Box hiddenFrom="sm">
                <Menu trigger="click">
                  <Menu.Target>
                    <ActionIcon variant="transparent">
                      <FilterIcon size={12} color="#1E1E1E" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {statusOptions.map((option, index) => (
                      <Menu.Item
                        key={`status-options-${index}`}
                        onClick={() => setStatus(option.value)}
                      >
                        {option.label}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
              </Box>
            </Box>
          </Box>
          <Box hiddenFrom="sm">
            <SkeletonWrapper
              isLoading={isLoading}
              isEmpty={!invoices?.doc?.length && !isLoading}
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
              Loader={TransactionHistroyMobileSkeleton}
            >
              {invoices?.doc?.map((invoice, index) => (
                <Box
                  key={`payment-history-mobile-row-${index}`}
                  className="mb-5"
                >
                  <Box className="flex flex-col gap-2 bg-white md:hidden">
                    <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                      <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                        DATE
                      </Text>
                      <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                        INVOICE
                      </Text>
                    </Box>
                    <Box className="flex justify-between px-4 py-[10px]">
                      <Text className="text-xs font-medium text-[#374151]">
                        {format(invoice?.date, "MMM d, yyyy")}
                      </Text>
                      <Text className="text-xs font-normal text-[#1E1E1E]">
                        {invoice?.invoiceNumber}
                      </Text>
                    </Box>
                    <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                      <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                        AMOUNT
                      </Text>
                      <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                        STATUS
                      </Text>
                    </Box>
                    <Box className="flex justify-between px-4 py-2">
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
                        {invoice.status}
                      </Box>
                    </Box>
                    <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                      <Text>Action</Text>
                    </Box>
                    <Box className="flex justify-between border-b border-[#e5e7eb] px-4 pt-[10px] pb-[25px]">
                      <Box className="flex items-center gap-2 md:hidden">
                        <Menu shadow="md" width={200} position="bottom-start">
                          <Menu.Target>
                            <ActionIcon
                              variant="transparent"
                              className="flex h-[16px] w-[30px] items-center justify-center rounded-[8px] bg-[#F9FAFC] px-[7px] py-[6px]"
                            >
                              <ThreeDots />
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item>
                              <Group
                                className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#a6aab3]"
                                onClick={() =>
                                  handleOpendInvoiceDetailsModal(invoice)
                                }
                              >
                                <ViewIcon color="#6B7280" />
                                <Text>View full invoice</Text>
                              </Group>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item>
                              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#a6aab3]">
                                <DownloadIcon color="#6B7280" />
                                <Text>Download</Text>
                              </Group>
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SkeletonWrapper>
          </Box>
          <Box visibleFrom="sm">
            <TableWrapper
              isLoading={isLoading}
              data={invoices?.doc}
              table={(data) => (
                <PaymentHistoryTable
                  {...{ data, handleOpendInvoiceDetailsModal }}
                />
              )}
              skeletonRow={10}
              skeletonCol={5}
              emptyComponent={
                <EmptyTable
                  tableHeading={paymentHistoryTableHeadings}
                  message=" You have no recent transactions, all recent transactions will appear
            here!!"
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
      </>
      {/* <PaymentHistory /> */}
    </AnimateComponent>
  );
};

export default TransactionHistoryPageClient;
