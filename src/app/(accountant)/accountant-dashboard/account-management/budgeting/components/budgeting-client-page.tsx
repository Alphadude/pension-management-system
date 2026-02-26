"use client";

import {
  Box,
  Button,
  Group,
  Progress,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";

// Mock data demonstrating what the Budget vs Actual engine would output
const MOCK_BUDGETS = [
  { account: "Office Supplies", budget: 500000, actual: 350000 },
  { account: "Marketing", budget: 1500000, actual: 1600000 },
  { account: "Software Subscriptions", budget: 300000, actual: 150000 },
  { account: "Travel & Transport", budget: 800000, actual: 750000 },
];

const BudgetingClientPage = () => {
  const [period, setPeriod] = useState<string | null>("Q1-2026");

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="flex-start">
          <Box className="flex-1">
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Budget vs Actuals
            </Text>
            <Text className="mb-4 text-sm font-normal text-[#6B7280] md:text-base">
              {" "}
              Define budgets for expense accounts and track variances against
              actual recorded transactions.
            </Text>
          </Box>
          <Group>
            <Select
              placeholder="Select Period"
              data={["Q1-2026", "Q2-2026", "2026-FY"]}
              value={period}
              onChange={setPeriod}
              classNames={{ root: "w-32" }}
            />
            <Button leftSection={<Plus size={16} />}>New Budget</Button>
          </Group>
        </Group>
      </Stack>

      <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)] md:p-8">
        <Text className="mb-6 text-[18px] font-semibold text-[#111827]">
          Expense Variance Analysis ({period})
        </Text>

        <Box className="overflow-x-auto">
          <Table.ScrollContainer minWidth={600}>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead className="bg-gray-50 text-sm text-gray-500">
                <Table.Tr>
                  <Table.Th className="font-medium">Expense Account</Table.Th>
                  <Table.Th className="font-medium">Budget (₦)</Table.Th>
                  <Table.Th className="font-medium">Actual (₦)</Table.Th>
                  <Table.Th className="font-medium">Variance (₦)</Table.Th>
                  <Table.Th className="w-64 font-medium">Utilization</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {MOCK_BUDGETS.map((row) => {
                  const variance = row.budget - row.actual;
                  const utilization = (row.actual / row.budget) * 100;
                  const isOver = utilization > 100;

                  return (
                    <Table.Tr key={row.account}>
                      <Table.Td className="font-medium text-[#111827]">
                        {row.account}
                      </Table.Td>
                      <Table.Td>{row.budget.toLocaleString()}</Table.Td>
                      <Table.Td>{row.actual.toLocaleString()}</Table.Td>
                      <Table.Td
                        className={`font-semibold ${isOver ? "text-red-600" : "text-green-600"}`}
                      >
                        {variance > 0
                          ? `+${variance.toLocaleString()}`
                          : variance.toLocaleString()}
                      </Table.Td>
                      <Table.Td>
                        <Group justify="space-between" mb={4}>
                          <Text size="xs" c="dimmed">
                            Progress
                          </Text>
                          <Text size="xs" fw={700} c={isOver ? "red" : "green"}>
                            {utilization.toFixed(1)}%
                          </Text>
                        </Group>
                        <Progress
                          value={Math.min(utilization, 100)}
                          color={isOver ? "red" : "green"}
                          size="sm"
                          striped={isOver}
                        />
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Box>
      </Box>
    </Stack>
  );
};

export default BudgetingClientPage;
