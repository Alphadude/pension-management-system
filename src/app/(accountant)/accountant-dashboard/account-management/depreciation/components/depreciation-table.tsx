"use client";

import { useGetFixedAssets } from "@/hooks/query/use-accounting";
import { Box, Group, Table, Text, TextInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";

const DepreciationTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  // Reuse getAssets since it has all the details needed for the schedule overview
  const { data, isLoading } = useGetFixedAssets(search ? `?${search}` : "");
  // Filter out fully disposed assets for the schedule view
  const assets = (data?.docs ?? []).filter((a) => a.status !== "Disposed");

  return (
    <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
      <Group justify="space-between" mb={24}>
        <Text className="text-[18px] font-semibold text-[#111827]">
          Active Depreciation Schedule
        </Text>
        <TextInput placeholder="Search schedule..." />
      </Group>

      <Box className="w-full overflow-x-auto">
        <Table highlightOnHover>
          <Table.Thead className="bg-[#f9fafb] text-[#6B7280]">
            <Table.Tr>
              <Table.Th>Asset ID</Table.Th>
              <Table.Th>Asset Name</Table.Th>
              <Table.Th>Cost (₦)</Table.Th>
              <Table.Th>Rate (%)</Table.Th>
              <Table.Th>Acc. Depr. (₦)</Table.Th>
              <Table.Th>Book Value (₦)</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {assets.map((asset) => (
              <Table.Tr key={asset.id ?? asset.uniqueAssetId}>
                <Table.Td className="text-sm font-medium text-blue-600">
                  {asset.uniqueAssetId}
                </Table.Td>
                <Table.Td className="max-w-[200px] truncate text-sm text-[#4B5563]">
                  {asset.name}
                </Table.Td>
                <Table.Td className="text-sm font-semibold">
                  ₦{(asset.cost || 0).toLocaleString()}
                </Table.Td>
                <Table.Td className="text-sm">
                  {asset.depreciationRate}%
                </Table.Td>
                <Table.Td className="text-sm font-semibold text-red-700">
                  ₦{(asset.accumulatedDepreciation || 0).toLocaleString()}
                </Table.Td>
                <Table.Td className="text-sm font-bold text-[#111827]">
                  ₦{(asset.currentBookValue || 0).toLocaleString()}
                </Table.Td>
              </Table.Tr>
            ))}
            {assets.length === 0 && !isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={6}
                  className="py-4 text-center text-gray-500"
                >
                  No active assets found for depreciation.
                </Table.Td>
              </Table.Tr>
            )}
            {isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={6}
                  className="py-4 text-center text-gray-500"
                >
                  Loading schedule...
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default DepreciationTable;
