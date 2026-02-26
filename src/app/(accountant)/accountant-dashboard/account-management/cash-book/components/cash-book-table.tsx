"use client";

import { useGetLedgerEntries } from "@/hooks/query/use-accounting";
import { Box, Group, Table, Text, TextInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";

interface CashBookTableProps {
  type: "Cash" | "Bank";
}

const CashBookTable = ({ type }: CashBookTableProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  // In a real implementation, we pass an account ID specific to the main Cash or Bank GL account
  const accountId = type === "Cash" ? "cash-gl-id" : "bank-gl-id";

  const { data, isLoading } = useGetLedgerEntries(
    accountId,
    search ? `?${search}` : "",
  );
  const entries = data?.docs ?? [];

  return (
    <Box>
      <Group justify="space-between" mb={24}>
        <Text className="text-[18px] font-semibold text-[#111827]">
          {type} History
        </Text>
        <TextInput placeholder="Search records..." />
      </Group>

      <Box className="w-full overflow-x-auto">
        <Table highlightOnHover>
          <Table.Thead className="bg-[#f9fafb] text-[#6B7280]">
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Receipts (Dr.)</Table.Th>
              <Table.Th>Payments (Cr.)</Table.Th>
              <Table.Th>Balance</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {entries.map((entry, idx) => (
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
            {entries.length === 0 && !isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={5}
                  className="py-4 text-center text-gray-500"
                >
                  No {type.toLowerCase()} transactions found.
                </Table.Td>
              </Table.Tr>
            )}
            {isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={5}
                  className="py-4 text-center text-gray-500"
                >
                  Loading {type.toLowerCase()} entries...
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default CashBookTable;
