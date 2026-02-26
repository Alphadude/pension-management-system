"use client";

import { useGetChartOfAccounts } from "@/hooks/query/use-accounting";
import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Table,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { Edit2, Trash } from "lucide-react";

const ChartOfAccountsTable = () => {
  const { data, isLoading } = useGetChartOfAccounts();
  const accounts = data?.docs ?? [];

  return (
    <Box>
      <Group justify="space-between" mb={24}>
        <Text className="text-[18px] font-semibold text-[#111827]">
          Organizational Accounts
        </Text>
        <TextInput placeholder="Search accounts by name..." />
      </Group>

      <Box className="w-full overflow-x-auto">
        <Table highlightOnHover>
          <Table.Thead className="bg-[#f9fafb] text-[#6B7280]">
            <Table.Tr>
              <Table.Th>Account Name</Table.Th>
              <Table.Th>Account Type</Table.Th>
              <Table.Th>Current Balance (₦)</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {accounts.map((account) => {
              const typeColors: Record<string, string> = {
                Asset: "blue",
                Liability: "red",
                Income: "green",
                Expense: "orange",
                Equity: "grape",
              };

              return (
                <Table.Tr key={account.name}>
                  <Table.Td className="text-sm font-medium text-[#111827]">
                    {account.name}
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={typeColors[account.type] ?? "gray"}
                      variant="light"
                    >
                      {account.type}
                    </Badge>
                  </Table.Td>
                  <Table.Td className="text-sm font-semibold">
                    ₦{(account.balance || 0).toLocaleString()}
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <Tooltip label="Edit Account">
                        <ActionIcon variant="subtle" color="blue">
                          <Edit2 size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete Account">
                        <ActionIcon variant="subtle" color="red">
                          <Trash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              );
            })}
            {accounts.length === 0 && !isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={4}
                  className="py-4 text-center text-gray-500"
                >
                  No accounts found in the Chart of Accounts.
                </Table.Td>
              </Table.Tr>
            )}
            {isLoading && (
              <Table.Tr>
                <Table.Td
                  colSpan={4}
                  className="py-4 text-center text-gray-500"
                >
                  Loading accounts...
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ChartOfAccountsTable;
