"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useCreateSubmission } from "@/hooks/mutate/use-parish";
import { useGetAllContributions } from "@/hooks/query/use-contribution";
import { headerStyles } from "@/lib/utils";
import type { RemittanceItem } from "@/types/common";
import {
  Avatar,
  Box,
  Button,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Download, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";
import { previousMonthlyContributionsTableHeadings } from "../../components/extras";
import ConfirmationModal from "./confirmation-modal";
import { monthlyRemittanceTableHeadings, monthNames } from "./extras";

const MonthlyRemittanceDesktopTable = ({
  data,
}: {
  data: RemittanceItem[];
}) => {
  const rows = data.map((user, index) => (
    <Table.Tr key={`invoice-table-row-${index}`}>
      <Table.Td>
        <Group gap={4} align="center">
          <Avatar color="cyan" w={38} h={38} />
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {user?.user?.firstName ?? ""} {user?.user?.lastName ?? ""}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {user?.user?.email ?? ""}
            </Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user?.salary ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user?.deduction ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user?.remittance ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user?.totalRemittance ?? ""}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table
      highlightOnHover
      visibleFrom="sm"
      classNames={{
        thead:
          "bg-[#f9fafb] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[67px]",
        td: "h-[87px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          {monthlyRemittanceTableHeadings.map((heading, index) => (
            <Table.Th key={`invoice-table-heading-${index}`}>
              {heading}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const MonthlyRemittanceTable = () => {
  const { data: sessionUser } = useSession();
  const { data, isLoading, updateQuery } = useGetAllContributions();
  const { mutate, isPending } = useCreateSubmission();
  const [opened, { open, close }] = useDisclosure(false);
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [year, setYear] = useQueryState("year");
  const [month, setMonth] = useQueryState("month");

  const currentDate = new Date();
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear().toString();

  const displayMonth = month ?? currentMonth;
  const displayYear = year ?? currentYear;

  const totalContributors = data?.doc?.length ?? 0;
  const totalContribution =
    data?.doc?.reduce((sum, item) => sum + (item.totalRemittance ?? 0), 0) ?? 0;
  const parishAddition =
    data?.doc?.reduce((sum, item) => sum + (item.deduction ?? 0), 0) ?? 0;
  const toDiocese =
    data?.doc?.reduce((sum, item) => sum + (item.remittance ?? 0), 0) ?? 0;

  const reportPeriod = `${displayMonth} ${displayYear}`;
  const submissionDeadline = "February 5, 2024";
  const recipients = sessionUser?.user.diocese;

  const handleSubmit = () => {
    const payload = {
      month: displayMonth ?? currentMonth,
      year: displayYear ?? currentYear,
      deadline: "2023-11-05T23:59:59.000Z",
      status: "pending",
      totalAmount: totalContribution,
      diocese: sessionUser?.user?.diocese ?? "",
      contributions: data?.doc?.map((item) => item._id) ?? [],
    };
    mutate(payload, {
      onSuccess: () => close(),
    });
  };

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  const handleExportCSV = useCallback(() => {
    const items = data?.doc;
    if (!items || items.length === 0) return;

    const escapeCSV = (value: string | number | undefined | null): string => {
      const str = String(value ?? "");
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headers = [
      "Contributor Name",
      "Email",
      "Salary Paid",
      "5% Deduction",
      "10% Parish Remittance",
      "Total Remittance",
    ];
    const rows = items.map((item) =>
      [
        escapeCSV(
          `${item?.user?.firstName ?? ""} ${item?.user?.lastName ?? ""}`.trim(),
        ),
        escapeCSV(item?.user?.email),
        escapeCSV(item?.salary),
        escapeCSV(item?.deduction),
        escapeCSV(item?.remittance),
        escapeCSV(item?.totalRemittance),
      ].join(","),
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `monthly-remittance-${(displayMonth ?? "").toLowerCase()}-${displayYear}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data?.doc, displayMonth, displayYear]);

  useEffect(() => {
    updateQuery("parish", sessionUser?.user?.parish);
    updateQuery("year", year);
    updateQuery("month", month);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, sessionUser]);

  return (
    <Stack gap={16} w={"100%"} className="mb-10">
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 w-full rounded-[12px] bg-white">
        <Box className="flex flex-col items-start border-b border-[#F3F4F6] px-5 py-4">
          <Group justify="space-between" align="center" w="100%">
            <Stack gap={4} className="md:gap-2">
              <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
                Monthly Remittance
              </Text>
              <Text className="text-[10px] font-normal text-[#6B7280] md:text-sm">
                {displayMonth} {displayYear} - All Contributors
              </Text>
            </Stack>
            <Button
              onClick={handleExportCSV}
              leftSection={<Download size={16} />}
              disabled={!data?.doc || data.doc.length === 0}
            >
              Export CSV
            </Button>
          </Group>
          <Group
            gap={16}
            className="mt-2 mb-5 grid w-full grid-cols-[5fr_1fr_1fr]"
          >
            <TextInput
              leftSection={<Search color="#9CA3AF" size={20} />}
              placeholder="Search by user names, emails..."
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
              }}
              // value={search ?? ""}
              // onChange={async (e) => {
              //   await setSearch(e.target.value);
              // }}
            />
            <MonthPickerInput
              placeholder="Enter Month"
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
                placeholder: "hidden md:block",
              }}
              value={
                month
                  ? new Date(
                      year ? parseInt(year) : new Date().getFullYear(),
                      monthNames.indexOf(month),
                      1,
                    )
                  : null
              }
              onChange={async (value) => {
                if (value) {
                  const monthName = monthNames[new Date(value).getMonth()];
                  await setMonth(monthName ?? "");
                } else {
                  await setMonth(null);
                }
              }}
              valueFormat="MMM"
              clearable
            />
            <YearPickerInput
              placeholder="Enter Year"
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
                placeholder: "hidden md:block",
              }}
              value={year ? new Date(parseInt(year), 0, 1) : null}
              onChange={async (value) => {
                if (value) {
                  await setYear(`${new Date(value).getFullYear()}`);
                } else {
                  await setYear(null);
                }
              }}
              clearable
            />
          </Group>
        </Box>
        <Box>
          {/* mobile view */}
          <Box className="flex flex-col gap-2 bg-white md:hidden">
            {data?.doc?.map((user, index) => (
              <Box
                key={`recent-activity-table-row-${index}`}
                className="grid grid-cols-1 items-center border-t border-[#E5E7EB] bg-white md:grid-cols-4 md:px-5 md:py-[18px]"
              >
                {/* Mobile View */}
                <Box className="flex flex-col gap-2 bg-white md:hidden">
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>NAME</Text>
                    <Text style={headerStyles}>SALARY PAID</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Group gap={4} align="center">
                      <Avatar color="cyan" w={38} h={38} />
                      <Box>
                        <Text className="text-sm font-bold text-[#1e1e1e]">
                          {user?.user?.firstName ?? ""}{" "}
                          {user?.user?.lastName ?? ""}
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {user?.user?.email ?? ""}
                        </Text>
                      </Box>
                    </Group>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {user?.salary ?? ""}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>5% DEDUCTION</Text>
                    <Text style={headerStyles}>10% Parish Remittance</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-xs font-medium text-[#374151]">
                      {user?.deduction ?? ""}
                    </Text>
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      ₦{user?.remittance ?? ""}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>total remittance</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      ₦{user?.totalRemittance ?? ""}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          {/* desktop view */}
          <TableWrapper
            isLoading={isLoading}
            data={data?.doc ?? []}
            table={(data) => <MonthlyRemittanceDesktopTable data={data} />}
            skeletonRow={9}
            skeletonCol={5}
            emptyComponent={
              <EmptyTable
                tableHeading={previousMonthlyContributionsTableHeadings}
                message=" You have no recent activity, all recent activity will appear here!!"
              />
            }
          />
        </Box>
      </Box>
      <Group justify="end">
        <Button onClick={open} disabled={isPending}>
          Confirm & Remit
        </Button>
      </Group>
      <PaginationCard
        page={page ?? 1}
        pageSize={10}
        total={data?.total_pages ?? 0}
        onChange={handlePageChange}
        showPageItem
      />
      <ConfirmationModal
        onClose={close}
        opened={opened}
        reportPeriod={reportPeriod}
        submissionDeadline={submissionDeadline}
        recipients={recipients}
        totalContributors={totalContributors}
        totalContribution={`₦${totalContribution.toLocaleString()}`}
        parishAddition={`₦${parishAddition.toLocaleString()}`}
        toDiocese={`₦${toDiocese.toLocaleString()}`}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </Stack>
  );
};

export default MonthlyRemittanceTable;
