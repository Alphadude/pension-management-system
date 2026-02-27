"use client";

import type { AccountType, ChartOfAccount } from "@/types/accounting";
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
import { useState } from "react";

// Seeded from Trial Balance — Statement of Accounts (31st Dec 2024)
const SEED_ACCOUNTS: ChartOfAccount[] = [
  // ── ASSETS ───────────────────────────────────────────────
  { id: "1", name: "UK Investment", type: "Asset", balance: 7_885_932_390 },
  {
    id: "2",
    name: "UK Real Estate Investment",
    type: "Asset",
    balance: 3_495_176_088.43,
  },
  {
    id: "3",
    name: "Zenith Bank (London)",
    type: "Asset",
    balance: 580_286_097,
  },
  {
    id: "4",
    name: "Stanbic IBTC Investment",
    type: "Asset",
    balance: 75_272_979.49,
  },
  {
    id: "5",
    name: "Nigeria Investments: Stock & Shares",
    type: "Asset",
    balance: 38_514_209,
  },
  { id: "6", name: "BGL Investment", type: "Asset", balance: 35_784_229.38 },
  {
    id: "7",
    name: "Fidelity Bank Investment",
    type: "Asset",
    balance: 200_000_000,
  },
  { id: "8", name: "ARM Investment", type: "Asset", balance: 100_200_000 },
  { id: "9", name: "Globus Investment", type: "Asset", balance: 40_000_000 },
  {
    id: "10",
    name: "Zenith Bank Investment",
    type: "Asset",
    balance: 100_000_000,
  },
  { id: "11", name: "FBNI (Bank)", type: "Asset", balance: 174_914_498.96 },
  { id: "12", name: "FBN II", type: "Asset", balance: 3_050_987.38 },
  {
    id: "13",
    name: "Zenith Bank (Naira)",
    type: "Asset",
    balance: 163_919_874.54,
  },
  {
    id: "14",
    name: "Zenith Bank Pound (Owutu)",
    type: "Asset",
    balance: 344_836_477.69,
  },
  {
    id: "15",
    name: "Zenith Bank Dollar (Owutu)",
    type: "Asset",
    balance: 822_255.56,
  },
  { id: "16", name: "ECO Bank", type: "Asset", balance: 905_335.91 },
  { id: "17", name: "Globus Bank", type: "Asset", balance: 10_275_340.81 },
  { id: "18", name: "Access Bank Savings", type: "Asset", balance: 70_231.81 },
  { id: "19", name: "FBN Dom I", type: "Asset", balance: 801_126.88 },
  { id: "20", name: "FBN Dom II", type: "Asset", balance: 92_816 },
  { id: "21", name: "Cash in Hand", type: "Asset", balance: 198_771 },
  { id: "22", name: "Debtors", type: "Asset", balance: 5_503_427 },
  {
    id: "23",
    name: "Loan to Joint Provinces",
    type: "Asset",
    balance: 50_000_000,
  },
  { id: "24", name: "Loan to Staff", type: "Asset", balance: 1_550_000 },
  { id: "25", name: "ICON Brokers (Receivable)", type: "Asset", balance: 139 },
  { id: "26", name: "Investment Trip", type: "Asset", balance: 33_176_000 },
  { id: "27", name: "Computer Software", type: "Asset", balance: 530_000 },
  // ── LIABILITIES ──────────────────────────────────────────
  {
    id: "28",
    name: "Bookshop House – Enugu Diocese",
    type: "Liability",
    balance: 44_000,
  },
  {
    id: "29",
    name: "Bookshop House – Niger Diocese",
    type: "Liability",
    balance: 44_000,
  },
  {
    id: "30",
    name: "Bookshop House – Niger Delta Diocese",
    type: "Liability",
    balance: 17_000,
  },
  {
    id: "31",
    name: "Bookshop House – Aba Diocese",
    type: "Liability",
    balance: 27_000,
  },
  {
    id: "32",
    name: "Trinity College Umuahia",
    type: "Liability",
    balance: 40_350,
  },
  { id: "33", name: "PAYE Payable", type: "Liability", balance: 6_864 },
  {
    id: "34",
    name: "Contribution in Advance",
    type: "Liability",
    balance: 31_237_932.85,
  },
  { id: "35", name: "Loan from GARC", type: "Liability", balance: 10_000_000 },
  // ── INCOME ────────────────────────────────────────────────
  {
    id: "36",
    name: "UK Investment Income",
    type: "Income",
    balance: 181_072_099.53,
  },
  {
    id: "37",
    name: "UK Real Estate Rent",
    type: "Income",
    balance: 50_954_981,
  },
  {
    id: "38",
    name: "UK Zenith Bank Interest",
    type: "Income",
    balance: 44_549_436.33,
  },
  {
    id: "39",
    name: "Contributions Received",
    type: "Income",
    balance: 420_933_735.02,
  },
  {
    id: "40",
    name: "Interest Income (Nigeria)",
    type: "Income",
    balance: 87_544_265.56,
  },
  { id: "41", name: "Dividend", type: "Income", balance: 901_355.54 },
  { id: "42", name: "Aluu Hostel Rent", type: "Income", balance: 8_392_300 },
  { id: "43", name: "Awka Hostel Rent", type: "Income", balance: 4_976_700 },
  { id: "44", name: "Other Income", type: "Income", balance: 2_095_000 },
  {
    id: "45",
    name: "Fin. Sec's Seminar Fee",
    type: "Income",
    balance: 2_746_000,
  },
  {
    id: "46",
    name: "UK Investment Revaluation Gain",
    type: "Income",
    balance: 9_364_813_006.28,
  },
  {
    id: "47",
    name: "Zenith Dollar Revaluation Gain",
    type: "Income",
    balance: 1_738_083.04,
  },
  { id: "48", name: "Card Replacement Fee", type: "Income", balance: 30_000 },
  {
    id: "49",
    name: "Printing of Accounts / Sale of Scrap",
    type: "Income",
    balance: 265_000,
  },
  { id: "50", name: "Tender Income", type: "Income", balance: 1_800_000 },
  // ── EXPENSES ─────────────────────────────────────────────
  {
    id: "51",
    name: "UK Investment Management Fee",
    type: "Expense",
    balance: 26_561_895.64,
  },
  {
    id: "52",
    name: "UK Real Estate Charges",
    type: "Expense",
    balance: 1_447_308.38,
  },
  { id: "53", name: "Audit Fee", type: "Expense", balance: 1_000_000 },
  { id: "54", name: "Bad Debt", type: "Expense", balance: 11_597_890.2 },
  { id: "55", name: "Pensions Paid", type: "Expense", balance: 311_039_293.19 },
  {
    id: "56",
    name: "Contribution Refund",
    type: "Expense",
    balance: 29_146_859.3,
  },
  {
    id: "57",
    name: "Salaries / Allowances",
    type: "Expense",
    balance: 9_353_545.32,
  },
  {
    id: "58",
    name: "EXCO Management Allowances",
    type: "Expense",
    balance: 8_535_000,
  },
  { id: "59", name: "Car Running Cost", type: "Expense", balance: 3_442_100 },
  {
    id: "60",
    name: "Car Insurance / Particulars Renewal",
    type: "Expense",
    balance: 25_700,
  },
  { id: "61", name: "Training", type: "Expense", balance: 8_346_100 },
  { id: "62", name: "Light / Power", type: "Expense", balance: 462_700 },
  { id: "63", name: "Stationery", type: "Expense", balance: 665_950 },
  { id: "64", name: "Postage", type: "Expense", balance: 134_800 },
  { id: "65", name: "Repairs", type: "Expense", balance: 425_500 },
  { id: "66", name: "Hospitality", type: "Expense", balance: 657_200 },
  {
    id: "67",
    name: "Seminar for Fin. Sec",
    type: "Expense",
    balance: 4_016_600,
  },
  { id: "68", name: "Contingency", type: "Expense", balance: 140_500 },
  { id: "69", name: "Depreciation", type: "Expense", balance: 6_361_754.7 },
  {
    id: "70",
    name: "Finance Cost / GARC Interest",
    type: "Expense",
    balance: 29_316_673.7,
  },
  { id: "71", name: "Personnel Cost", type: "Expense", balance: 10_226_155.4 },
  { id: "72", name: "Aluu Hostel Expenses", type: "Expense", balance: 670_000 },
  { id: "73", name: "Foundation Laying", type: "Expense", balance: 580_000 },
  // ── EQUITY ────────────────────────────────────────────────
  {
    id: "74",
    name: "Accumulated Fund",
    type: "Equity",
    balance: 5_172_390_584.41,
  },
];

const TYPE_COLORS: Record<AccountType, string> = {
  Asset: "blue",
  Liability: "red",
  Income: "green",
  Expense: "orange",
  Equity: "grape",
};

const ChartOfAccountsTable = () => {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<AccountType | "All">("All");

  const filtered = SEED_ACCOUNTS.filter((a) => {
    const matchType = activeType === "All" || a.type === activeType;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <Box>
      <Group justify="space-between" mb={16}>
        <Text className="text-[18px] font-semibold text-[#111827]">
          Organizational Accounts ({SEED_ACCOUNTS.length} accounts)
        </Text>
        <TextInput
          placeholder="Search accounts by name..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          w={240}
        />
      </Group>

      {/* Type filter tabs */}
      <Group gap={8} mb={20}>
        {(
          ["All", "Asset", "Liability", "Income", "Expense", "Equity"] as const
        ).map((t) => (
          <Badge
            key={t}
            variant={activeType === t ? "filled" : "light"}
            color={
              t === "All" ? "gray" : (TYPE_COLORS[t as AccountType] ?? "gray")
            }
            style={{ cursor: "pointer" }}
            onClick={() => setActiveType(t)}
          >
            {t}{" "}
            {t !== "All"
              ? `(${SEED_ACCOUNTS.filter((a) => a.type === t).length})`
              : `(${SEED_ACCOUNTS.length})`}
          </Badge>
        ))}
      </Group>

      <Box className="w-full overflow-x-auto">
        <Table highlightOnHover>
          <Table.Thead className="bg-[#f9fafb] text-[#6B7280]">
            <Table.Tr>
              <Table.Th>Account Name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Balance (₦)</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((account) => (
              <Table.Tr key={account.id}>
                <Table.Td className="text-sm font-medium text-[#111827]">
                  {account.name}
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={TYPE_COLORS[account.type] ?? "gray"}
                    variant="light"
                  >
                    {account.type}
                  </Badge>
                </Table.Td>
                <Table.Td className="text-sm font-semibold">
                  ₦
                  {account.balance.toLocaleString("en-NG", {
                    maximumFractionDigits: 2,
                  })}
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
            ))}
            {filtered.length === 0 && (
              <Table.Tr>
                <Table.Td
                  colSpan={4}
                  className="py-4 text-center text-gray-500"
                >
                  No accounts match your search.
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
