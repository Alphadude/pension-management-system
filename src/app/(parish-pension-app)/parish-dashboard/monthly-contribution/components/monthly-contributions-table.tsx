"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { MoneyIcon } from "@/components/icons/money-icon";
import { ThreeDots } from "@/components/icons/three-dots";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetAllContributions } from "@/hooks/query/use-contribution";
import { routes } from "@/lib/routes";
import { headerStyles } from "@/lib/utils";
import type { ContributionResponse } from "@/types/common";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Button,
  Group,
  Menu,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Eye, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { monthNames } from "../../monthly-remittance/components/extras";
import { monthlyContributionsTableHeadings } from "./extras";
import UserProfileModal from "./user-profile-modal";

type Props = {
  data: ContributionResponse["doc"];
};

const MonthlyContributionsDesktopTable = ({ data }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [userId, setUserId] = useState("");
  const [contributionId, setContributionId] = useState("");
  const rows = data.map((contribution, index) => (
    <Table.Tr key={`invoice-table-row-${index}`}>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.user?.id.slice(0, 6) ?? ""}
      </Table.Td>
      <Table.Td>
        <Group gap={4} align="center">
          <Avatar
            color="cyan"
            w={38}
            h={38}
            src={
              typeof contribution?.user?.profilePhoto === "string"
                ? contribution?.user?.profilePhoto
                : (contribution?.user?.profilePhoto?.url ?? "")
            }
          />
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {contribution?.user?.firstName ?? ""}{" "}
              {contribution?.user?.lastName ?? ""}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {contribution?.user?.email ?? ""}
            </Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.user?.gender ?? "-"}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.user?.dob
          ? format(new Date(contribution.user.dob), "yyyy")
          : "-"}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">-</Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.salary ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.totalRemittance ?? ""}
      </Table.Td>
      <Table.Td>
        <Menu trigger="hover" shadow="md" width={200} position="bottom-start">
          <Menu.Target>
            <ActionIcon
              variant="transparent"
              className="flex h-[16px] w-[30px] items-center justify-center rounded-[8px] px-[7px] py-[6px]"
            >
              <ThreeDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label className="text-sm text-[#1E1E1E]">Actions</Menu.Label>
            <Menu.Item>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <MoneyIcon color="#1E1E1E" />
                <Link
                  href={
                    routes.parishDashboard.monthlyContribution +
                    `/${contribution?.user?._id}/enter-contribution`
                  }
                >
                  Contribution
                </Link>
              </Group>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <Eye color="#1E1E1E" size={16} />
                <Anchor
                  className="text-sm font-normal text-[#1E1E1E]"
                  component="button"
                  onClick={() => {
                    setUserId(contribution?.user?._id);
                    setContributionId(contribution?._id);
                    open();
                  }}
                >
                  View Profile
                </Anchor>
              </Group>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <UserProfileModal
          close={close}
          opened={opened}
          contributorId={contributionId}
          userId={userId}
        />
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
          {monthlyContributionsTableHeadings.map((heading, index) => (
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

const MonthlyContributionsTable = () => {
  const { data: sessionUser } = useSession();
  const { data, isLoading, updateQuery } = useGetAllContributions();
  const [search, setSearch] = useQueryState("search");
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [year, setYear] = useQueryState("year");
  const [month, setMonth] = useQueryState("month");
  const [gender, setGender] = useQueryState("gender");
  const [yearOfBirth, setYearOfBirth] = useQueryState("yearOfBirth");
  const [yearStarted, setYearStarted] = useQueryState("yearStarted");
  const [basicSalary, setBasicSalary] = useQueryState("basicSalary");
  const [totalContribution, setTotalContribution] =
    useQueryState("totalContribution");
  const [contributorId, setContributorId] = useQueryState("contributorId");

  const [debouncedSearch] = useDebouncedValue(search, 300);

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    updateQuery("parish", sessionUser?.user?.parish);
    updateQuery("year", year ?? undefined);
    updateQuery("month", month ?? undefined);
    updateQuery("search", debouncedSearch ?? undefined);
    updateQuery("gender", gender ?? undefined);
    updateQuery("yearOfBirth", yearOfBirth ?? undefined);
    updateQuery("yearStarted", yearStarted ?? undefined);
    updateQuery("basicSalary", basicSalary ?? undefined);
    updateQuery("totalContribution", totalContribution ?? undefined);
    updateQuery("contributorId", contributorId ?? undefined);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    year,
    month,
    sessionUser,
    debouncedSearch,
    gender,
    yearOfBirth,
    yearStarted,
    basicSalary,
    totalContribution,
    contributorId,
  ]);

  return (
    <Stack gap={16} w={"100%"}>
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 w-full rounded-[12px] bg-white">
        <Box className="flex flex-col items-start border-b border-[#F3F4F6] px-5 py-4">
          <Group className="w-full" align="center" justify="space-between">
            <Stack gap={4} className="md:gap-2">
              <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
                Previous Monthly Contributions
              </Text>
              <Text className="text-[10px] font-normal text-[#6B7280] md:text-sm">
                Find and filter contributors by name, ID, month
              </Text>
            </Stack>
            <Button component="a" href={routes.parishDashboard.searchUser}>
              Enter Monthly Contribution
            </Button>
          </Group>
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
              placeholder="Contributor ID"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={contributorId ?? ""}
              onChange={(e) => setContributorId(e.target.value)}
            />
            <TextInput
              placeholder="Gender"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={gender ?? ""}
              onChange={(e) => setGender(e.target.value)}
            />
            <TextInput
              placeholder="Year of Birth"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={yearOfBirth ?? ""}
              onChange={(e) => setYearOfBirth(e.target.value)}
            />
            <TextInput
              placeholder="Year Started"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={yearStarted ?? ""}
              onChange={(e) => setYearStarted(e.target.value)}
            />
            <TextInput
              placeholder="Basic Salary"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={basicSalary ?? ""}
              onChange={(e) => setBasicSalary(e.target.value)}
            />
            <TextInput
              placeholder="Total Contribution"
              classNames={{ input: "h-[32px] md:h-[42px] w-full" }}
              value={totalContribution ?? ""}
              onChange={(e) => setTotalContribution(e.target.value)}
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
            {data?.doc.map((contribution, index) => (
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
                          {contribution?.user?.firstName ?? ""}
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {contribution?.user?.email ?? ""}
                        </Text>
                      </Box>
                    </Group>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {contribution?.user?.id ?? ""}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>DATE</Text>
                    <Text style={headerStyles}>SALARY</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-xs font-medium text-[#374151]">
                      {contribution?.year
                        ? format(contribution?.year, "MMM d, yyyy")
                        : ""}
                    </Text>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {contribution?.salary ?? ""}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>5% DEDUCTION</Text>
                    <Text style={headerStyles}>10% REMITTANCE</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      ₦{contribution?.deduction ?? ""}
                    </Text>
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      ₦{contribution?.remittance ?? ""}
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
                            <Link
                              href={
                                routes.parishDashboard.monthlyContribution +
                                `/${contribution?.user?._id}/enter-contribution`
                              }
                            >
                              Contribution
                            </Link>
                          </Group>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item>
                          <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                            <Eye color="#1E1E1E" size={16} />
                            <Link
                              href={
                                routes.parishDashboard.monthlyContribution +
                                `${contribution?.id}/view-profile`
                              }
                            >
                              View Profile
                            </Link>
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
            table={(data) => <MonthlyContributionsDesktopTable data={data} />}
            skeletonRow={9}
            skeletonCol={8}
            emptyComponent={
              <EmptyTable
                tableHeading={monthlyContributionsTableHeadings}
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

export default MonthlyContributionsTable;
