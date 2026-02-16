"use client";
import { DownloadIcon } from "@/components/icons/download-icon";
import { LastPaymentIcon } from "@/components/icons/last-payment-icon";
import { PendingPaymentIcon } from "@/components/icons/pending-payment-icon";
import { TotalRejectedIcon } from "@/components/icons/total-rejected-icon";
import { TotalSubmittedIcon } from "@/components/icons/total-submitted-icon";
import { WrappedTransactionIcon } from "@/components/icons/wrapped-transaction-icon";
import AnimateComponent from "@/components/ui/animate-component";
import { PaginationCard } from "@/components/ui/pagination";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import TableWrapper from "@/components/ui/table-wrapper";
import VendorMetricCard from "@/components/ui/vendor-metric-card";
import { useGetAllReports } from "@/hooks/query/use-report";
import { cn } from "@/lib/utils";
import {
  Box,
  Button,
  Flex,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { useDisclosure, useMounted } from "@mantine/hooks";
import { format } from "date-fns";
import { FilterIcon } from "lucide-react";
import type { Session } from "next-auth";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
import EmptyTable from "../../components/empty-table";
import { reportsTableHeadings } from "../../transaction-history/components/extras";
import GenerateReportModal from "./modal/generate-report-modal";
import ReportsTable from "./reports-table";
import ReportsTableMobileSkeleton from "./skeleton/reports-table-mobile-skeleton";

interface Props {
  session: Session | null;
}

export function formatReportString(dbString: string): string {
  // Extract start and end dates from the string
  const matches = /from (.+?) to (.+)$/.exec(dbString);
  if (!matches || matches.length < 3) return dbString; // fallback

  const startDate = new Date(matches[1]!);
  const endDate = new Date(matches[2]!);

  // Check if both dates are valid
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return dbString;
  }

  const sameMonthYear =
    format(startDate, "MMMM yyyy") === format(endDate, "MMMM yyyy");

  if (sameMonthYear) {
    return `Report for ${format(startDate, "MMMM yyyy")}`;
  }

  return `Report from ${format(startDate, "MMMM yyyy")} to ${format(endDate, "MMMM yyyy")}`;
}

const ReportsPageClient = ({ session }: Props) => {
  const mounted = useMounted();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: reports, updateQuery, isLoading } = useGetAllReports();
  const [year, setYear] = useQueryState("year");
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [status, setStatus] = useQueryState("status");

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    updateQuery("status", status);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("page", 1);
    updateQuery("year", year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <GenerateReportModal opened={opened} close={close} />
      <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
        <Stack className="gap-y-5 sm:gap-y-6 sm:pt-5">
          <Flex className="gap-x-5">
            <Stack className="font-poppins flex-1 gap-y-2 sm:gap-y-0">
              <Text className="text-dark text-lg leading-[17px] font-semibold sm:text-[28px] sm:leading-12 sm:font-bold">
                Welcome, {session?.user?.firstName}
              </Text>
              <Text className="text-xs leading-[17px] font-normal text-[#6B7280] sm:text-base sm:leading-[17px]">
                Manage your invoices and track payments
              </Text>
            </Stack>
            <Button
              onClick={open}
              className="font-poppins h-[29px] rounded-[8px] text-[10px] leading-[17px] font-normal sm:h-12 sm:text-sm sm:leading-[17px] sm:font-semibold"
            >
              Generate Report
            </Button>
          </Flex>
          <SimpleGrid className="grid-cols-2 gap-2 sm:grid-cols-4 xl:gap-x-4">
            <VendorMetricCard
              label="Total Submitted"
              value={45}
              icon={
                <TotalSubmittedIcon className="h-[18px] w-[18px] md:h-[29px] md:w-[29px]" />
              }
            />
            <VendorMetricCard
              label="Total Paid"
              value={38}
              icon={
                <PendingPaymentIcon className="h-[18px] w-[18px] md:h-[29px] md:w-[29px]" />
              }
            />
            <VendorMetricCard
              label="Total Rejected"
              value={7}
              icon={
                <TotalRejectedIcon className="h-[18px] w-[18px] md:h-[29px] md:w-[29px]" />
              }
            />
            <VendorMetricCard
              label="Total Amount"
              value="₦3,450,000.00"
              icon={<LastPaymentIcon className="md:h-[29px] md:w-[29px]" />}
            />
          </SimpleGrid>
        </Stack>
        <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 mb-2 w-full rounded-[12px] bg-white">
          <Box className="flex items-center justify-between border-b border-b-[#F3F4F6] px-5 py-4">
            <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
              All Report
            </Text>
            <Box className="flex items-center gap-4">
              <Select
                classNames={{
                  input: "w-[88px] h-[32px] sm:w-[99px]",
                  dropdown: "!w-[130px]",
                }}
                placeholder="status"
                data={["ready", "pending"]}
                value={status}
                onChange={(value) => setStatus(value)}
                withCheckIcon={false}
                // className="hidden md:block"
              />
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
                clearable
              />
              {/* <Link
                      href="#"
                      className="flex items-center gap-1 text-[10px] font-normal text-[#2E5AAC] md:text-sm"
                    >
                      View all <ChevronRight size={16} color="#2E5AAC" />
                    </Link> */}
              <Box className="block md:hidden">
                <FilterIcon size={12} color="#1E1E1E" />{" "}
              </Box>
            </Box>
          </Box>
          <Box hiddenFrom="sm">
            <SkeletonWrapper
              isLoading={isLoading}
              isEmpty={!reports?.doc?.length && !isLoading}
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
              Loader={ReportsTableMobileSkeleton}
            >
              {reports?.doc?.map((report, index) => (
                <Box
                  key={index}
                  className="flex flex-col gap-2 bg-white md:hidden"
                >
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                      REPORT NAME
                    </Text>
                    <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                      PERIOD
                    </Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-xs font-medium text-[#374151]">
                      {formatReportString(report.reportName)}
                    </Text>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {report?.startDate
                        ? format(report?.startDate, "MMM")
                        : ""}{" "}
                      -{" "}
                      {report?.endDate
                        ? format(report?.endDate, "MMM, yyyy")
                        : ""}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                      GENERATED ON
                    </Text>
                    <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                      TYPE
                    </Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      {report?.generatedOn
                        ? format(report?.generatedOn, "MMM d, yyyy")
                        : ""}
                    </Text>
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      {report.reportType}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                      STATUS
                    </Text>
                    <Text className="text-xs leading-[17px] font-medium text-[#6B7280]">
                      ACTION
                    </Text>
                  </Box>
                  <Box className="flex justify-between border-b border-[#e5e7eb] px-4 pt-[10px] pb-[25px]">
                    <Text className="block md:hidden">
                      <Box
                        component="span"
                        className={cn(
                          `rounded-full border px-[10px] py-1 text-xs font-medium text-[#4CAF50]`,
                          report.status === "ready"
                            ? "border-[#BBF7D0] bg-[#DCFCE7] text-[#13A382]"
                            : "border-[#f1f9e2] bg-[#fff9e6] text-[#ffc107]",
                        )}
                      >
                        {report.status}
                      </Box>
                    </Text>
                    <Button
                      className="block h-[17px] bg-transparent text-sm font-normal text-[#2E5AAC] md:hidden"
                      leftSection={<DownloadIcon color="#2E5AAC" />}
                    >
                      Download
                    </Button>
                  </Box>
                </Box>
              ))}
            </SkeletonWrapper>
          </Box>
          <Box visibleFrom="sm">
            <TableWrapper
              isLoading={isLoading}
              data={reports?.doc}
              table={(data) => <ReportsTable {...{ data }} />}
              skeletonRow={10}
              skeletonCol={6}
              emptyComponent={
                <EmptyTable
                  tableHeading={reportsTableHeadings}
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
          total={reports?.total_pages ?? 0}
          onChange={handlePageChange}
          showPageItem
        />
      </AnimateComponent>
    </>
  );
};

export default ReportsPageClient;
{
  /* 
                <Button
                  className="hidden h-[17px] bg-transparent text-sm font-normal text-[#2E5AAC] md:block"
                  leftSection={<DownloadIcon color="#2E5AAC" />}
                >
                  Download
                </Button> */
}
