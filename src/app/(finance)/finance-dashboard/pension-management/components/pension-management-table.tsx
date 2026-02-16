"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { ThreeDots } from "@/components/icons/three-dots";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetAllDiocese } from "@/hooks/query/use-diocese";
import type { GetAllDiocesesResponse } from "@/types/common";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Menu,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { Download, Eye } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { dioceseInformationTableHeadings } from "./extras";

interface PMTableProps {
  data: GetAllDiocesesResponse["doc"];
}

const PMTable = ({ data }: PMTableProps) => {
  return (
    <Table
      highlightOnHover
      visibleFrom="sm"
      classNames={{
        thead:
          "bg-[#f9fafb] text-[#6B7280] font-medium text-[12px] leading-[17px] uppercase h-[60px]",
        td: "h-[67px] text-[14px] font-medium font-inter leading-[17px] text-[#1E1E1E]",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          {dioceseInformationTableHeadings.map((heading, index) => (
            <Table.Th key={`diocese-information-table-heading-${index}`}>
              {heading}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.map((row) => (
          <Table.Tr key={row._id}>
            <Table.Td className="font-medium">{`Diocese of ${row.name}`}</Table.Td>
            <Table.Td>{row.totalPensioners ?? 0}</Table.Td>
            <Table.Td>₦{row.totalPensionPaid ?? 0}</Table.Td>
            <Table.Td>{row.activePensioners ?? 0}</Table.Td>
            <Table.Td>
              <Menu shadow="md" width={180}>
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
                  <Menu.Item
                    component={Link}
                    href={`/finance-dashboard/pension-management/${row._id}`}
                  >
                    <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                      <Eye color="#1E1E1E" size={16} />
                      <span>View Details</span>
                    </Group>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

const PensionManagementTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const { data, isLoading, updateQuery } = useGetAllDiocese();

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {/* Header */}
        <Group justify="space-between" mb="md">
          <Stack gap={2}>
            <Text fw={600} fz="lg">
              Pension Record
            </Text>
            <Text fz="sm" c="dimmed">
              View and manage current month pension payments
            </Text>
          </Stack>
          <Button leftSection={<Download size={16} />} color="blue" radius="md">
            Export CSV
          </Button>
        </Group>

        {/* Search */}
        <TextInput
          placeholder="Search by diocese name..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          mb="md"
        />

        <TableWrapper
          isLoading={isLoading}
          data={data?.doc}
          table={(data) => <PMTable {...{ data }} />}
          skeletonRow={10}
          skeletonCol={5}
          emptyComponent={
            <EmptyTable
              tableHeading={dioceseInformationTableHeadings}
              message=" You have no recent transactions, all recent transactions will appear
                        here!!"
            />
          }
        />
      </Card>
      <PaginationCard
        page={page ?? 1}
        pageSize={10}
        total={data?.total_pages ?? 0}
        onChange={handlePageChange}
        showPageItem
      />
    </>
  );
};

export default PensionManagementTable;
