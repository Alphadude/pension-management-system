"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { MoneyIcon } from "@/components/icons/money-icon";
import { ThreeDots } from "@/components/icons/three-dots";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetAllContributions } from "@/hooks/query/use-contribution";
import { headerStyles } from "@/lib/utils";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { useDebouncedValue } from "@mantine/hooks";
import { Eye, Search } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
import { previousMonthlyContributionsTableHeadings } from "./extras";
import PreviousMonthlyContributionsDesktopTable from "./monthly-contributions-desktop-table";

const PreviousMonthlyContributionsTable = () => {
  const [search, setSearch] = useQueryState("search");

  const [debouncedSearchValue] = useDebouncedValue(search?.trim(), 200);
  const { data, isLoading, updateQuery } = useGetAllContributions();
  // const allQ = useGetAllContributions();
  // const searchQ = useSearchContributions(debouncedSearchValue!);

  // const data = debouncedSearchValue ? searchQ.data : allQ.data;
  // const isLoading = debouncedSearchValue ? searchQ.isLoading : allQ.isLoading;
  // const updateQuery = debouncedSearchValue
  //     ? searchQ.updateQuery
  //     : allQ.updateQuery;

  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [year, setYear] = useQueryState("year");

  const [month, setMonth] = useQueryState("month");

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    updateQuery("year", year);
    updateQuery("month", month);
    updateQuery("search", debouncedSearchValue ?? "");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, debouncedSearchValue]);

  return (
    <Stack gap={16} w={"100%"}>
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 w-full rounded-[12px] bg-white">
        <Box className="flex flex-col items-start border-b border-[#F3F4F6] px-5 py-4">
          <Stack gap={4} className="md:gap-2">
            <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
              Top Contributing Parish
            </Text>
            <Text className="text-[10px] font-normal text-[#6B7280] md:text-sm">
              Highest contributing parishes this month
            </Text>
          </Stack>
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
              value={search ?? ""}
              onChange={async (e) => {
                await setSearch(e.target.value);
              }}
            />
            <MonthPickerInput
              placeholder="Enter Month"
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
                placeholder: "hidden md:block",
              }}
              onChange={async (value) => {
                if (value) {
                  await setMonth(
                    `${new Date(value).toLocaleString("default", { month: "long" })}`,
                  );
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
              value={year}
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
            {(data?.doc ?? []).map((contribution, index) => (
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
                          {contribution.user.firstName}
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {contribution.user.email}
                        </Text>
                      </Box>
                    </Group>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      test
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>DATE</Text>
                    <Text style={headerStyles}>SALARY</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-xs font-medium text-[#374151]">
                      {contribution.year}
                    </Text>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {contribution.salary}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>5% DEDUCTION</Text>
                    <Text style={headerStyles}>10% REMITTANCE</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      ₦{contribution.deduction}
                    </Text>
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      ₦{contribution.remittance}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>Actions</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Menu
                      trigger="hover"
                      shadow="md"
                      width={200}
                      position="bottom-start"
                    >
                      <Menu.Target>
                        <ActionIcon
                          variant="transparent"
                          className="flex h-[16px] w-[30px] items-center justify-center rounded-[8px] px-[7px] py-[6px]"
                        >
                          <ThreeDots />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label className="text-sm text-[#1E1E1E]">
                          Actions
                        </Menu.Label>
                        <Menu.Item>
                          <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                            <MoneyIcon color="#1E1E1E" />
                            <Link href={"#"}>Contribution</Link>
                          </Group>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item>
                          <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                            <Eye color="#1E1E1E" size={16} />
                            <Link href={"#"}>View Profile</Link>
                          </Group>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          {/* desktop view */}
          <TableWrapper
            isLoading={isLoading}
            data={data?.doc}
            table={(data) => (
              <PreviousMonthlyContributionsDesktopTable data={data} />
            )}
            skeletonRow={9}
            skeletonCol={8}
            emptyComponent={
              <EmptyTable
                tableHeading={previousMonthlyContributionsTableHeadings}
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

export default PreviousMonthlyContributionsTable;
