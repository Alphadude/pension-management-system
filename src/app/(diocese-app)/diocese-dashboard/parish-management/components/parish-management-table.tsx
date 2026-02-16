"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetAllParishContributions } from "@/hooks/query/use-contribution";
import { routes } from "@/lib/routes";
import type { ParishContributionResponse } from "@/types/common";
import { Box, Group, Stack, Table, Text, TextInput } from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { Search } from "lucide-react";
import Link from "next/link";
import ConfirmationModal from "./confirmation-modal";
import { parishManagementTableHeadings } from "./extras";

interface Props {
  data: ParishContributionResponse["data"]["parishes"];
}

const ParishManagementDesktopTable = ({ data }: Props) => {
  const rows = data?.map((user, index) => (
    <Table.Tr key={index}>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user.parishName}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user.numberOfContributors}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        ₦{user.totalContributions}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user?.lastContributionDate
          ? format(user?.lastContributionDate, "MMM d, yyyy")
          : ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal">
        <Link
          className="text-[#2E5AAC]"
          href={routes.dioceseDashboard.ParishManagement + `/${user.parishId}`}
        >
          View Details
        </Link>
      </Table.Td>
    </Table.Tr>
  ));
  return (
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
          {parishManagementTableHeadings.map(
            (heading: string, index: number) => (
              <Table.Th key={`parish-management-table-heading-${index}`}>
                {heading}
              </Table.Th>
            ),
          )}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const ParishManagementTable = () => {
  const [opened, { open: _open, close }] = useDisclosure(false);
  const { data, isLoading, error } = useGetAllParishContributions();

  console.warn(data?.data, "parent data");

  // const [page, setPage] = useQueryState("page", parseAsInteger);

  // const handlePageChange = async (newPage: number) => {
  //     await setPage(newPage);
  //     updateQuery("page", newPage);
  // };

  // useEffect(() => {

  //     setPage(1);
  //     updateQuery("page", 1);

  // }, []);

  return (
    <Stack gap={16} w={"100%"}>
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins w-full rounded-[12px] bg-white">
        <Box className="flex flex-col items-start border-b border-[#F3F4F6] px-5 py-4">
          <Stack gap={4} className="md:gap-2">
            <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
              Monthly Parish Contributions
            </Text>
            <Box className="flex w-full items-center gap-80 md:w-auto">
              <Text className="text-[10px] font-normal text-[#6B7280] md:text-sm">
                View and manage contribution summaries from all parishes
              </Text>
            </Box>
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
            />
            <MonthPickerInput
              placeholder="Pick date"
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
                placeholder: "hidden md:block",
              }}
            />
            <YearPickerInput
              placeholder="Pick year"
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
                placeholder: "hidden md:block",
              }}
            />
          </Group>
        </Box>
        <TableWrapper
          isLoading={isLoading}
          data={data?.data.parishes ?? []}
          table={(data) => <ParishManagementDesktopTable data={data ?? []} />}
          skeletonRow={9}
          skeletonCol={8}
          emptyComponent={
            <EmptyTable
              tableHeading={parishManagementTableHeadings}
              message=" You have no recent activity, all recent activity will appear here!!"
            />
          }
        />
        {error && (
          <Text color="red" size="sm">
            Error loading data: {error.message}
          </Text>
        )}
      </Box>
      {/* <PaginationCard
                page={page ?? 1}
                pageSize={10}
                total={invoices?.total_pages ?? 0}
                onChange={handlePageChange}
                showPa
                geItem
            /> */}
      <ConfirmationModal onClose={close} opened={opened} />
    </Stack>
  );
};

export default ParishManagementTable;
