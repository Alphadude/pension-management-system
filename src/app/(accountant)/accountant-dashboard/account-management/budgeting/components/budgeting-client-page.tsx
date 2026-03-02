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

// Real Cash Book data from Statement of Accounts (Jan–Dec 2024)
const CASH_BOOK_BUDGETS = [
  { account: "Pensions Paid", budget: 350_000_000, actual: 311_039_293.19 },
  { account: "Contribution Refund", budget: 35_000_000, actual: 29_146_859.3 },
  {
    account: "Salaries / Allowances",
    budget: 9_353_545.32,
    actual: 9_353_545.32,
  },
  {
    account: "EXCO Transport Allowances",
    budget: 10_000_000,
    actual: 8_535_000,
  },
  { account: "Training", budget: 10_000_000, actual: 8_346_100 },
  { account: "Seminar for Fin. Sec", budget: 5_000_000, actual: 4_016_600 },
  { account: "Car Running Cost", budget: 5_000_000, actual: 3_442_100 },
  { account: "Equipment – Fund", budget: 10_000_000, actual: 7_587_836 },
  {
    account: "Equipment – Aluu Hostel",
    budget: 12_000_000,
    actual: 9_809_586.48,
  },
  { account: "Stationery", budget: 700_000, actual: 665_950 },
  { account: "Repairs", budget: 500_000, actual: 425_500 },
  {
    account: "Hospitality / Office Entertainment",
    budget: 700_000,
    actual: 657_200,
  },
  { account: "Light / Power", budget: 600_000, actual: 462_700 },
  { account: "Postage", budget: 200_000, actual: 134_800 },
  { account: "Audit Fee", budget: 2_000_000, actual: 2_000_000 },
  { account: "Aluu Hostel Expenses", budget: 1_000_000, actual: 670_000 },
  { account: "Contingency", budget: 500_000, actual: 140_500 },
  { account: "Leave Allowance", budget: 600_000, actual: 418_306.04 },
];

const fmt = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

const BudgetingClientPage = () => {
  const [period, setPeriod] = useState<string | null>("2024-FY");

  const totalBudget = CASH_BOOK_BUDGETS.reduce((s, r) => s + r.budget, 0);
  const totalActual = CASH_BOOK_BUDGETS.reduce((s, r) => s + r.actual, 0);
  const totalVariance = totalBudget - totalActual;

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
              Expense accounts from Cash Book — Superannuation Anglican Workers
              East of the Niger Welfare Foundation (2024).
            </Text>
          </Box>
          <Group>
            <Select
              placeholder="Select Period"
              data={["Q1-2024", "Q2-2024", "Q3-2024", "Q4-2024", "2024-FY"]}
              value={period}
              onChange={setPeriod}
              classNames={{ root: "w-32" }}
            />
            <Button leftSection={<Plus size={16} />}>New Budget</Button>
          </Group>
        </Group>
      </Stack>

      {/* Summary totals */}
      <Box className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Budget",
            value: fmt(totalBudget),
            color: "text-blue-600",
          },
          {
            label: "Total Actual",
            value: fmt(totalActual),
            color: "text-orange-600",
          },
          {
            label: "Total Saving",
            value: fmt(totalVariance),
            color: totalVariance >= 0 ? "text-green-600" : "text-red-600",
          },
        ].map((s) => (
          <Box
            key={s.label}
            className="rounded-[16px] border border-[#F3F4F6] bg-white p-5 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]"
          >
            <Text className="mb-1 text-sm font-medium text-[#6B7280]">
              {s.label}
            </Text>
            <Text className={`text-xl font-bold ${s.color}`}>{s.value}</Text>
          </Box>
        ))}
      </Box>

      <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)] md:p-8">
        <Text className="mb-6 text-[18px] font-semibold text-[#111827]">
          Expense Variance Analysis ({period})
        </Text>

        <Box className="overflow-x-auto">
          <Table.ScrollContainer minWidth={700}>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead className="bg-gray-50 text-sm text-gray-500">
                <Table.Tr>
                  <Table.Th className="font-medium">Expense Account</Table.Th>
                  <Table.Th className="font-medium">Budget (₦)</Table.Th>
                  <Table.Th className="font-medium">Actual (₦)</Table.Th>
                  <Table.Th className="font-medium">Variance (₦)</Table.Th>
                  <Table.Th className="w-52 font-medium">Utilization</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {CASH_BOOK_BUDGETS.map((row) => {
                  const variance = row.budget - row.actual;
                  const utilization = (row.actual / row.budget) * 100;
                  const isOver = utilization > 100;

                  return (
                    <Table.Tr key={row.account}>
                      <Table.Td className="font-medium text-[#111827]">
                        {row.account}
                      </Table.Td>
                      <Table.Td className="text-sm">
                        {row.budget.toLocaleString()}
                      </Table.Td>
                      <Table.Td className="text-sm">
                        {row.actual.toLocaleString()}
                      </Table.Td>
                      <Table.Td
                        className={`font-semibold ${isOver ? "text-red-600" : "text-green-600"}`}
                      >
                        {variance > 0
                          ? `+${variance.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`
                          : variance.toLocaleString("en-NG", {
                              maximumFractionDigits: 0,
                            })}
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
