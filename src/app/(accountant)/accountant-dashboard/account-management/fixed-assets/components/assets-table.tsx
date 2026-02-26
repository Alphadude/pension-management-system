"use client";

import { useGetFixedAssets } from "@/hooks/query/use-accounting";
import { Badge, Box, Group, Table, Text, TextInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";

const AssetsTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const { data, isLoading } = useGetFixedAssets(search ? `?${search}` : "");
  const assets = data?.docs ?? [];

  return (
    <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
      <Group justify="space-between" mb={24}>
        <Text className="text-[18px] font-semibold text-[#111827]">
          Asset Register
        </Text>
        <TextInput placeholder="Search assets by name or ID..." />
      </Group>

      <Box className="w-full overflow-x-auto">
        <Table highlightOnHover>
          <Table.Thead className="bg-[#f9fafb] text-[#6B7280]">
            <Table.Tr>
              <Table.Th>Asset ID</Table.Th>
              <Table.Th>Asset Name</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Cost (₦)</Table.Th>
              <Table.Th>Book Value (₦)</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {assets.map((asset) => {
              const tColor =
                asset.status === "Active"
                  ? "green"
                  : asset.status === "Disposed"
                    ? "red"
                    : "gray";

              return (
                <Table.Tr key={asset.id ?? asset.uniqueAssetId}>
                  <Table.Td className="text-sm font-medium text-blue-600">
                    {asset.uniqueAssetId}
                  </Table.Td>
                  <Table.Td className="max-w-[200px] truncate text-sm text-[#4B5563]">
                    {asset.name}
                  </Table.Td>
                  <Table.Td className="text-sm text-[#4B5563]">
                    {asset.category}
                  </Table.Td>
                  <Table.Td className="text-sm font-semibold">
                    ₦{(asset.cost || 0).toLocaleString()}
                  </Table.Td>
                  <Table.Td className="text-sm font-semibold text-[#111827]">
                    ₦{(asset.currentBookValue || 0).toLocaleString()}
                  </Table.Td>
                  <Table.Td>
                    <Badge color={tColor} variant="light">
                      {asset.status}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              );
            })}
            {assets.length === 0 && !isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={6}
                  className="py-4 text-center text-gray-500"
                >
                  No assets found.
                </Table.Td>
              </Table.Tr>
            )}
            {isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={6}
                  className="py-4 text-center text-gray-500"
                >
                  Loading assets...
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AssetsTable;
