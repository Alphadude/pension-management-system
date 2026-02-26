"use client";

import { useGetLedgerEntries } from "@/hooks/query/use-accounting";
import { Box, Group, Table, Text, TextInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";

interface LedgerTableProps {
  accountId: string;
}

const LedgerTable = ({ accountId }: LedgerTableProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const { data, isLoading } = useGetLedgerEntries(
    accountId,
    search ? `?${search}` : "",
  );
  const ledgerEntries = data?.docs ?? [];

  return (
    <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
      <Group justify="space-between" mb={24}>
        <Text className="text-[18px] font-semibold text-[#111827]">
          Transaction History
        </Text>
        <TextInput placeholder="Search within ledger..." />
      </Group>

      <Box className="w-full overflow-x-auto">
        <Table highlightOnHover>
          <Table.Thead className="bg-[#f9fafb] text-[#6B7280]">
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Debit (Dr.)</Table.Th>
              <Table.Th>Credit (Cr.)</Table.Th>
              <Table.Th>Balance</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {ledgerEntries.map((entry, idx) => (
              <Table.Tr key={idx}>
                <Table.Td className="text-sm font-medium">
                  {new Date(entry.date).toLocaleDateString()}
                </Table.Td>
                <Table.Td className="max-w-[250px] truncate text-sm text-[#4B5563]">
                  {entry.description}
                </Table.Td>
                <Table.Td className="text-sm font-semibold text-green-700">
                  {(entry.debit ?? 0) > 0
                    ? `₦${entry.debit.toLocaleString()}`
                    : "-"}
                </Table.Td>
                <Table.Td className="text-sm font-semibold text-red-700">
                  {(entry.credit ?? 0) > 0
                    ? `₦${entry.credit.toLocaleString()}`
                    : "-"}
                </Table.Td>
                <Table.Td className="text-sm font-bold text-[#111827]">
                  ₦{(entry.runningBalance || 0).toLocaleString()}
                </Table.Td>
              </Table.Tr>
            ))}
            {ledgerEntries.length === 0 && !isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={5}
                  className="py-4 text-center text-gray-500"
                >
                  No entries found for this ledger.
                </Table.Td>
              </Table.Tr>
            )}
            {isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={5}
                  className="py-4 text-center text-gray-500"
                >
                  Loading ledger entries...
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default LedgerTable;
