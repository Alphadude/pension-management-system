"use client";

import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  Progress,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Check, Edit2, Plus, X } from "lucide-react";
import { useState } from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const INITIAL_ACCOUNTS = [
  "Pensions Paid",
  "Contribution Refund",
  "Salaries / Allowances",
  "EXCO Transport Allowances",
  "Training",
  "Seminar for Fin. Sec",
  "Car Running Cost",
  "Equipment – Fund",
  "Equipment – Aluu Hostel",
  "Stationery",
  "Repairs",
  "Hospitality / Office Entertainment",
  "Light / Power",
  "Postage",
  "Audit Fee",
  "Aluu Hostel Expenses",
  "Contingency",
  "Leave Allowance",
];

// Real Cash Book data from Statement of Accounts (Jan–Dec 2024 distributed for demo)
const INITIAL_DATA: Record<
  string,
  Record<string, { budget: number; actual: number }>
> = {};

MONTHS.forEach((month) => {
  INITIAL_DATA[month] = {};
  INITIAL_ACCOUNTS.forEach((account) => {
    // For demo purposes, we distribute the yearly budget roughly across months
    // In a real app, this would come from an API
    INITIAL_DATA[month]![account] = {
      budget: 0,
      actual: 0,
    };
  });
});

// Seed some data for Q1 2024 to make it look realistic
INITIAL_DATA.January!["Pensions Paid"] = { budget: 30000000, actual: 28000000 };
INITIAL_DATA.January!["Salaries / Allowances"] = {
  budget: 800000,
  actual: 800000,
};
INITIAL_DATA.February!["Pensions Paid"] = {
  budget: 30000000,
  actual: 29000000,
};

const fmt = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

const BudgetingClientPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>("January");
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [data, setData] = useState(INITIAL_DATA);
  const [isEditing, setIsEditing] = useState<string | null>(null); // account name being edited
  const [opened, { open, close }] = useDisclosure(false);

  // Form for adding new account
  const addAccountForm = useForm({
    initialValues: {
      accountName: "",
      budget: 0,
      actual: 0,
    },
    validate: {
      accountName: (value) =>
        value.trim().length > 0 ? null : "Account name is required",
    },
  });

  const handleAddAccount = (values: typeof addAccountForm.values) => {
    const newAccount = values.accountName.trim();
    if (accounts.includes(newAccount)) {
      addAccountForm.setFieldError("accountName", "Account already exists");
      return;
    }

    // Add to accounts list
    setAccounts((prev) => [...prev, newAccount]);

    // Initialize data for this account across all months
    setData((prev) => {
      const updated = { ...prev };
      MONTHS.forEach((month) => {
        updated[month] = {
          ...updated[month],
          [newAccount]: {
            budget: month === selectedMonth ? values.budget : 0,
            actual: month === selectedMonth ? values.actual : 0,
          },
        };
      });
      return updated;
    });

    addAccountForm.reset();
    close();
  };

  // Current month's data
  const currentMonthData = selectedMonth ? (data[selectedMonth] ?? {}) : {};

  // Form state for editing
  const [tempBudget, setTempBudget] = useState(0);
  const [tempActual, setTempActual] = useState(0);

  const startEditing = (account: string, budget: number, actual: number) => {
    setIsEditing(account);
    setTempBudget(budget);
    setTempActual(actual);
  };

  const saveEdit = () => {
    if (!selectedMonth || !isEditing) return;

    setData((prev) => ({
      ...prev,
      [selectedMonth]: {
        ...prev[selectedMonth],
        [isEditing]: {
          budget: tempBudget,
          actual: tempActual,
        },
      },
    }));
    setIsEditing(null);
  };

  const cancelEdit = () => {
    setIsEditing(null);
  };

  // Aggregated totals for the selected month
  const monthlyBudgetTotal = Object.values(currentMonthData).reduce(
    (s, r) => s + r.budget,
    0,
  );
  const monthlyActualTotal = Object.values(currentMonthData).reduce(
    (s, r) => s + r.actual,
    0,
  );
  const monthlyVariance = monthlyBudgetTotal - monthlyActualTotal;

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="flex-start">
          <Box className="flex-1">
            <Title
              order={2}
              className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold"
            >
              Budget vs Actuals
            </Title>
            <Text className="mb-4 text-sm font-normal text-[#6B7280] md:text-base">
              Monthly Expense Variance Analysis for Superannuation Anglican
              Workers East of the Niger Welfare Foundation.
            </Text>
          </Box>
          <Group>
            <Select
              placeholder="Select Month"
              data={MONTHS}
              value={selectedMonth}
              onChange={setSelectedMonth}
              classNames={{ root: "w-40" }}
              allowDeselect={false}
            />
            <Button leftSection={<Plus size={16} />} onClick={open}>
              Add Account
            </Button>
          </Group>
        </Group>
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        title="Add New Expense Account"
        centered
      >
        <form onSubmit={addAccountForm.onSubmit(handleAddAccount)}>
          <Stack>
            <TextInput
              label="Account Name"
              placeholder="e.g. Office Equipment"
              required
              {...addAccountForm.getInputProps("accountName")}
            />
            <Group grow>
              <NumberInput
                label="Budget (₦)"
                placeholder="0"
                min={0}
                thousandSeparator=","
                {...addAccountForm.getInputProps("budget")}
              />
              <NumberInput
                label="Actual (₦)"
                placeholder="0"
                min={0}
                thousandSeparator=","
                {...addAccountForm.getInputProps("actual")}
              />
            </Group>
            <Group justify="flex-end" mt="md">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button type="submit">Add Account</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Summary totals for current month */}
      <Box className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Monthly Budget",
            value: fmt(monthlyBudgetTotal),
            color: "text-blue-600",
          },
          {
            label: "Monthly Actual",
            value: fmt(monthlyActualTotal),
            color: "text-orange-600",
          },
          {
            label: "Monthly Saving",
            value: fmt(monthlyVariance),
            color: monthlyVariance >= 0 ? "text-green-600" : "text-red-600",
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
          Expense Variance Analysis - {selectedMonth} 2024
        </Text>

        <Box className="overflow-x-auto">
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead className="bg-gray-50 text-sm text-gray-500">
                <Table.Tr>
                  <Table.Th className="font-medium">Expense Account</Table.Th>
                  <Table.Th className="font-medium">Budget (₦)</Table.Th>
                  <Table.Th className="font-medium">Actual (₦)</Table.Th>
                  <Table.Th className="font-medium">Variance (₦)</Table.Th>
                  <Table.Th className="w-48 font-medium">Utilization</Table.Th>
                  <Table.Th className="w-24 font-medium">Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {accounts.map((account) => {
                  const row = currentMonthData[account] ?? {
                    budget: 0,
                    actual: 0,
                  };
                  const variance = row.budget - row.actual;
                  const utilization =
                    row.budget > 0 ? (row.actual / row.budget) * 100 : 0;
                  const isOver = utilization > 100;
                  const isEditingThis = isEditing === account;

                  return (
                    <Table.Tr key={account}>
                      <Table.Td className="font-medium text-[#111827]">
                        {account}
                      </Table.Td>
                      <Table.Td className="text-sm">
                        {isEditingThis ? (
                          <NumberInput
                            value={tempBudget}
                            onChange={(v) => setTempBudget(Number(v))}
                            size="xs"
                            min={0}
                            thousandSeparator=","
                          />
                        ) : (
                          row.budget.toLocaleString()
                        )}
                      </Table.Td>
                      <Table.Td className="text-sm">
                        {isEditingThis ? (
                          <NumberInput
                            value={tempActual}
                            onChange={(v) => setTempActual(Number(v))}
                            size="xs"
                            min={0}
                            thousandSeparator=","
                          />
                        ) : (
                          row.actual.toLocaleString()
                        )}
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
                      <Table.Td>
                        {isEditingThis ? (
                          <Group gap={4}>
                            <ActionIcon
                              color="green"
                              variant="light"
                              onClick={saveEdit}
                            >
                              <Check size={16} />
                            </ActionIcon>
                            <ActionIcon
                              color="red"
                              variant="light"
                              onClick={cancelEdit}
                            >
                              <X size={16} />
                            </ActionIcon>
                          </Group>
                        ) : (
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() =>
                              startEditing(account, row.budget, row.actual)
                            }
                          >
                            <Edit2 size={16} />
                          </ActionIcon>
                        )}
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
