"use client";
import BulkUploadModal from "@/app/(finance)/finance-dashboard/pension-management/[id]/[uid]/components/bulk-upload-modal";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { MoneyIcon } from "@/components/icons/money-icon";
import { ThreeDots } from "@/components/icons/three-dots";
import { Parish } from "@/components/parish";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetAllContributions } from "@/hooks/query/use-contribution";
import { routes } from "@/lib/routes";
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
import { ArrowLeft, Eye, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import {
  monthlyContributionsTableHeadings,
  monthlyDesktopContributionsTableHeadings,
} from "./extra";
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
        {contribution?.user?.id.slice(0, 6) ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.year ? format(contribution?.year, "MMM d, yyyy") : ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.salary ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.deduction ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.remittance ?? ""}
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
                    routes.dioceseDashboard.ParishManagement +
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
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
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
            {monthlyDesktopContributionsTableHeadings.map((heading, index) => (
              <Table.Th key={`invoice-table-heading-${index}`}>
                {heading}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <UserProfileModal
        close={close}
        opened={opened}
        contributorId={contributionId}
        userId={userId}
      />
    </>
  );
};

const ParisRemittanceClient = () => {
  const params = useParams();
  const parishId = params?.id as string;

  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [search, setSearch] = useQueryState("search");
  const [year, setYear] = useQueryState("year");
  const [month, setMonth] = useQueryState("month");

  const [debouncedSearchValue] = useDebouncedValue(search?.trim(), 200);
  const [bulkModalOpened, { open: openBulk, close: closeBulk }] =
    useDisclosure(false);
  const { data, isLoading, updateQuery } = useGetAllContributions();

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    // updateQuery("year", year);
    // updateQuery("month", month);
    // updateQuery("search", debouncedSearchValue ?? "");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("parish", parishId);
    updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, debouncedSearchValue]);

  return (
    <Stack gap={16} w={"100%"}>
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 w-full rounded-[12px] bg-white">
        <Box className="flex flex-col items-start border-b border-[#F3F4F6] px-5 py-4">
          <Group className="w-full" align="center" justify="space-between">
            <Stack gap={4} className="md:gap-2">
              <Link
                className="flex items-center gap-2 text-xs font-semibold text-[#2E5AAC]"
                href={routes.dioceseDashboard.ParishManagement}
              >
                <ArrowLeft size={16} />
                Go Back
              </Link>
              <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
                <Parish parishId={parishId} />
              </Text>
              <Text className="text-[10px] font-normal text-[#6B7280] md:text-sm">
                Monthly Contributor Entry
              </Text>
            </Stack>
            <Group gap={16}>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-blue-500 bg-white"
                radius="md"
                onClick={openBulk}
              >
                Bulk Upload
              </Button>
              <Button
                component={Link}
                href={
                  data?.doc?.[0]
                    ? `${routes.dioceseDashboard.ParishManagement}/${parishId}/enter-contribution`
                    : "#"
                }
                disabled={!data?.doc?.[0]}
              >
                Enter Monthly Contribution
              </Button>
            </Group>
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
      <BulkUploadModal
        opened={bulkModalOpened}
        close={closeBulk}
        parishId={parishId}
      />
    </Stack>
  );
};

export default ParisRemittanceClient;
