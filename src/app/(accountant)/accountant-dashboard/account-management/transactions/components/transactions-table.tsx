"use client";

import { useGetTransactions } from "@/hooks/query/use-accounting";
import { Badge, Box, Group, Table, Text, TextInput } from "@mantine/core";
import { useSearchParams } from "next/navigation";

const TransactionsTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const { data, isLoading } = useGetTransactions(search ? `?${search}` : "");
  const transactions = data?.docs ?? [];

  return (
    <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
      <Group justify="space-between" mb={24}>
        <Text className="text-[18px] font-semibold text-[#111827]">
          Recent Transactions
        </Text>
        <TextInput placeholder="Search description..." />
      </Group>

      <Box className="w-full overflow-x-auto">
        <Table highlightOnHover>
          <Table.Thead className="bg-[#f9fafb] text-[#6B7280]">
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Amount (₦)</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {transactions.map((txn) => {
              const type = txn.type;
              const tColor =
                type === "Receipt"
                  ? "green"
                  : type === "Payment"
                    ? "red"
                    : "blue";

              return (
                <Table.Tr key={txn.id}>
                  <Table.Td className="text-sm font-medium">
                    {new Date(txn.date).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td>
                    <Badge color={tColor} variant="light">
                      {type}
                    </Badge>
                  </Table.Td>
                  <Table.Td className="max-w-[200px] truncate text-sm text-[#4B5563]">
                    {txn.description}
                  </Table.Td>
                  <Table.Td className="text-sm font-semibold">
                    ₦{(txn.amount || 0).toLocaleString()}
                  </Table.Td>
                </Table.Tr>
              );
            })}
            {transactions.length === 0 && !isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={4}
                  className="py-4 text-center text-gray-500"
                >
                  No transactions found.
                </Table.Td>
              </Table.Tr>
            )}
            {isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={4}
                  className="py-4 text-center text-gray-500"
                >
                  Loading transactions...
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TransactionsTable;
