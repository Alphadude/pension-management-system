import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { ThreeDots } from "@/components/icons/three-dots";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import UserFilters from "@/components/ui/user-filters";
import { useGetAllUsers } from "@/hooks/query/use-user";
import { routes } from "@/lib/routes";
import type { GetAllUserResponse } from "@/types/common";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { ArrowLeft, Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
const contributorsTableHeadings = [
  "ID",
  "NAME",
  "GENDER",
  "YEAR OF BIRTH",
  "YEAR STARTED",
  "BASIC SALARY",
  "TOTAL CONTRIBUTION",
  "ACTIONS",
];

type Props = {
  data: GetAllUserResponse["doc"];
};

const ContributorsDesktopTable = ({ data }: Props) => {
  const [_opened, { open, close: _close }] = useDisclosure(false);
  const rows = data.map((contributor, idx) => (
    <Table.Tr key={idx}>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor?.id.slice(0, 6) ?? ""}
      </Table.Td>
      <Table.Td>
        <Group gap={4} align="center">
          <Avatar
            color="cyan"
            w={38}
            h={38}
            src={
              typeof contributor?.profilePhoto === "object"
                ? contributor?.profilePhoto?.url
                : (contributor?.profilePhoto ?? undefined)
            }
          />
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {contributor?.firstName ?? ""} {contributor?.lastName ?? ""}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {contributor?.email ?? ""}
            </Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor?.gender ?? "-"}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor?.dob ? format(new Date(contributor.dob), "yyyy") : "-"}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">-</Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">-</Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor?.pensionBalance ?? "0"}
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
            <Menu.Item onClick={open}>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <Eye color="#1E1E1E" size={16} />
                <Box>View Details</Box>
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
            "bg-[#f9fafb] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[41px]",
          td: "h-[87px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {contributorsTableHeadings.map((heading: string, index: number) => (
              <Table.Th key={`contributor-table-heading-${index}`}>
                {heading}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

const ContributorsTable = () => {
  const { data: sessionData } = useSession();

  const { data, isLoading, updateQuery } = useGetAllUsers();

  const [search, setSearch] = useQueryState("search");
  const [debouncedSearchValue] = useDebouncedValue(search?.trim(), 200);

  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [year, _setYear] = useQueryState("year");
  const [month, _setMonth] = useQueryState("month");
  const [gender, setGender] = useQueryState("gender");
  const [yearOfBirth, setYearOfBirth] = useQueryState("yearOfBirth");
  const [yearStarted, setYearStarted] = useQueryState("yearStarted");
  const [basicSalary, setBasicSalary] = useQueryState("basicSalary");
  const [totalContribution, setTotalContribution] =
    useQueryState("totalContribution");
  const [contributorId, setContributorId] = useQueryState("contributorId");

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    updateQuery("role", "contributor");
    updateQuery("parish", sessionData?.user.parish);
    updateQuery("search", debouncedSearchValue ?? "");
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
    debouncedSearchValue,
    gender,
    yearOfBirth,
    yearStarted,
    basicSalary,
    totalContribution,
    contributorId,
  ]);

  return (
    <Stack gap={16}>
      <Stack
        gap={4}
        className="flex w-full flex-col items-start rounded-[12px] border-b border-[#F3F4F6] bg-white md:gap-4"
      >
        <Stack className="w-full px-2 py-2.5 md:p-6">
          <Link
            className="flex items-center gap-2 text-xs font-semibold text-[#2E5AAC]"
            href={routes.parishDashboard.monthlyContribution}
          >
            <ArrowLeft size={16} />
            Go Back
          </Link>
          <Stack gap={4} className="md:gap-2">
            <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
              Search Contributors
            </Text>
            <Text className="text-[10px] font-normal text-[#6B7280] md:text-sm">
              Search by Name, ID, or Email
            </Text>
          </Stack>
          <UserFilters />
        </Stack>
        <TableWrapper
          isLoading={isLoading}
          data={data?.doc}
          table={(data) => <ContributorsDesktopTable data={data ?? []} />}
          skeletonRow={9}
          skeletonCol={8}
          emptyComponent={
            <EmptyTable
              tableHeading={contributorsTableHeadings}
              message=" You have no recent activity, all recent activity will appear here!!"
            />
          }
        />
      </Stack>

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

export default ContributorsTable;
