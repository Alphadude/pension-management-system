"use client";

import { ThreeDots } from "@/components/icons/three-dots";
import { PaginationCard } from "@/components/ui/pagination";
import { useGetAllParishes } from "@/hooks/query/use-parish";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Menu,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { Download, Eye, Search } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";

const MonthlyContributionsTable = () => {
  const [search, setSearch] = useState("");
  const { data, updateQuery } = useGetAllParishes();
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  return (
    <Card shadow="sm" radius="md" withBorder>
      {/* Header */}
      <Group justify="space-between" mb="md">
        <Stack gap={2}>
          <Text fw={600} fz="lg">
            All Contributions
          </Text>
          <Text fz="sm" c="dimmed">
            Find and filter contributors by name, ID, month
          </Text>
        </Stack>
        <Button leftSection={<Download size={16} />} color="blue" radius="md">
          Export CSV
        </Button>
      </Group>

      {/* Search */}
      <TextInput
        placeholder="Search by parish name..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
        leftSection={<Search size={16} className="text-gray-500" />}
      />

      {/* Table */}
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
            <Table.Th>PARISH NAME</Table.Th>
            <Table.Th>TOTAL CONTRIBUTORS</Table.Th>
            <Table.Th>TOTAL PAID CONTRIBUTION</Table.Th>
            <Table.Th>ACTIVE CONTRIBUTORS</Table.Th>
            <Table.Th>ACTIONS</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.doc.map((row) => (
            <Table.Tr key={row.id}>
              <Table.Td className="font-medium">{`${row.name}`}</Table.Td>
              <Table.Td>{row.contributorCount}</Table.Td>
              <Table.Td>{row.totalPaidContributor}</Table.Td>
              <Table.Td>{row.activeContributors}</Table.Td>
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
                      href={`/finance-dashboard/monthly-contributions/${row.id}`}
                    >
                      <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                        <Eye color="#1E1E1E" size={16} />
                        <Box component="span">View Details</Box>
                      </Group>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <PaginationCard
        page={page ?? 1}
        pageSize={10}
        total={data?.total_pages ?? 0}
        onChange={handlePageChange}
        showPageItem
      />
    </Card>
  );
};

export default MonthlyContributionsTable;
