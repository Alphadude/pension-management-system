"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { headerStyles } from "@/lib/utils";
import type { GetAllUserResponse, SessionUser } from "@/types/common";
import {
  Avatar,
  Box,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { pensionersTableHeadings } from "./extras";

const ParishPensionersDesktopTable = ({ data }: { data: SessionUser[] }) => {
  const rows = data.map((pensioner, index) => (
    <Table.Tr key={`invoice-table-row-${index}`}>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {index + 1}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {pensioner.id.slice(0, 8)}
      </Table.Td>
      <Table.Td>
        <Group gap={4} align="center">
          <Avatar
            color="cyan"
            w={38}
            h={38}
            src={
              typeof pensioner.profilePhoto === "string"
                ? pensioner.profilePhoto
                : (pensioner.profilePhoto?.url ?? "")
            }
          />
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {pensioner.firstName} {pensioner.lastName}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {pensioner.email}
            </Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {pensioner.gender ?? "-"}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {pensioner.dob ? format(new Date(pensioner.dob), "MMM d, yyyy") : "-"}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {pensioner.datePensionCommenced
          ? format(new Date(pensioner.datePensionCommenced), "MMM d, yyyy")
          : "-"}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        ₦{pensioner.pensionBalance ?? "0"}
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
          {pensionersTableHeadings.map((heading, index) => (
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

const ParishPensionersTable = ({
  data,
  isLoading,
  search,
  setSearch,
  staffNumber,
  setStaffNumber,
  sex,
  setSex,
  dob,
  setDob,
  datePensionCommenced,
  setDatePensionCommenced,
  monthlyPension,
  setMonthlyPension,
  year,
  setYear,
  month,
  setMonth,
  page,
  handlePageChange,
}: {
  data: GetAllUserResponse | undefined;
  isLoading: boolean;
  search: string | null;
  setSearch: (val: string | null) => Promise<unknown>;
  staffNumber: string | null;
  setStaffNumber: (val: string | null) => Promise<unknown>;
  sex: string | null;
  setSex: (val: string | null) => Promise<unknown>;
  dob: string | null;
  setDob: (val: string | null) => Promise<unknown>;
  datePensionCommenced: string | null;
  setDatePensionCommenced: (val: string | null) => Promise<unknown>;
  monthlyPension: string | null;
  setMonthlyPension: (val: string | null) => Promise<unknown>;
  year: string | null;
  setYear: (val: string | null) => Promise<unknown>;
  month: string | null;
  setMonth: (val: string | null) => Promise<unknown>;
  page: number | null;
  handlePageChange: (page: number) => Promise<void>;
}) => {
  return (
    <Stack gap={16} w={"100%"}>
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 w-full rounded-[12px] bg-white">
        <Box className="flex flex-col items-start border-b border-[#F3F4F6] px-5 py-4">
          <Stack gap={4} className="md:gap-2">
            <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
              Monthly Parish Pensioners
            </Text>
            <Text className="text-[10px] font-normal text-[#6B7280] md:text-sm">
              View and manage contribution summaries from all parishes
            </Text>
          </Stack>
          <Group
            gap={16}
            className="mt-2 mb-5 grid w-full grid-cols-2 lg:grid-cols-4"
          >
            <TextInput
              leftSection={<Search color="#9CA3AF" size={20} />}
              placeholder="Search by name or email"
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
              }}
              value={search ?? ""}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TextInput
              placeholder="Staff Number"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={staffNumber ?? ""}
              onChange={(e) => setStaffNumber(e.target.value)}
            />
            <TextInput
              placeholder="Sex"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={sex ?? ""}
              onChange={(e) => setSex(e.target.value)}
            />
            <TextInput
              placeholder="DOB"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={dob ?? ""}
              onChange={(e) => setDob(e.target.value)}
            />
            <TextInput
              placeholder="Date Commenced"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={datePensionCommenced ?? ""}
              onChange={(e) => setDatePensionCommenced(e.target.value)}
            />
            <TextInput
              placeholder="Monthly Pension"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={monthlyPension ?? ""}
              onChange={(e) => setMonthlyPension(e.target.value)}
            />
            <MonthPickerInput
              placeholder="Month"
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
              }}
              value={
                month
                  ? new Date(
                      year ? parseInt(year) : new Date().getFullYear(),
                      new Date(`${month} 1, 2000`).getMonth(),
                      1,
                    )
                  : null
              }
              onChange={async (value) => {
                if (value) {
                  await setMonth(
                    `${new Date(value).toLocaleString("default", { month: "long" })}`,
                  );
                } else {
                  await setMonth(null);
                }
              }}
              clearable
            />
            <YearPickerInput
              placeholder="Year"
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
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
            {data?.doc.map((pensioner, index) => (
              <Box
                key={`recent-activity-table-row-${index}`}
                className="grid grid-cols-1 items-center border-t border-[#E5E7EB] bg-white md:grid-cols-4 md:px-5 md:py-[18px]"
              >
                {/* Mobile View */}
                <Box className="flex flex-col gap-2 bg-white md:hidden">
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>NAME</Text>
                    <Text style={headerStyles}>USER ID</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Group gap={4} align="center">
                      <Avatar color="cyan" w={38} h={38} />
                      <Box>
                        <Text className="text-sm font-bold text-[#1e1e1e]">
                          {pensioner.firstName}
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {pensioner.email}
                        </Text>
                      </Box>
                    </Group>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {pensioner.id.slice(0, 5)}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>MONTHLY PENSION</Text>
                    <Text style={headerStyles}>STATUS</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-xs font-medium text-[#374151]">
                      {pensioner.pensionBalance}
                    </Text>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {pensioner.status}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>LAST PENSION PAYMENT</Text>
                    <Text style={headerStyles}>TOTAL PAID PENSION</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      ₦{pensioner.pensionBalance}
                    </Text>
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      ₦{pensioner.pensionBalance}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          {/* desktop view */}
          <TableWrapper
            isLoading={isLoading}
            data={data?.doc}
            table={(data) => <ParishPensionersDesktopTable data={data} />}
            skeletonRow={9}
            skeletonCol={6}
            emptyComponent={
              <EmptyTable
                tableHeading={pensionersTableHeadings}
                message=" You have no recent activity, all recent activity will appear here!!"
              />
            }
          />
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

export default ParishPensionersTable;
