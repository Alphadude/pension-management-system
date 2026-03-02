"use client";
import { Box, Grid, Group, Progress, Stack, Text } from "@mantine/core";
import {
  Building,
  CreditCard,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

// Real figures from Statement of Accounts (Superannuation Anglican Workers East of Niger)
// As at 31st December 2024
const OVERVIEW = {
  cashBalance: 198_771,
  bankBalance:
    174_914_498.96 +
    3_050_987.38 +
    344_836_477.69 +
    822_255.56 +
    163_919_874.54 +
    70_231.81 +
    905_335.91 +
    10_275_340.81 +
    73_798.3 +
    801_126.88 +
    92_816,
  totalIncome:
    181_072_099.53 +
    50_954_981 +
    44_549_436.33 +
    8_392_300 +
    4_976_700 +
    2_095_000 +
    2_746_000,
  totalExpenses:
    66_653_040 + 10_226_155.4 + 6_361_754.7 + 29_316_673.7 + 11_597_890.2,
  accumulatedFund: 14_877_766_153,
  totalInvestments:
    7_885_932_390 +
    38_514_209 +
    35_784_229.38 +
    200_000_000 +
    100_200_000 +
    40_000_000 +
    100_000_000 +
    3_495_176_088.43 +
    75_272_979.49 +
    33_176_000,
};

const SURPLUS = OVERVIEW.totalIncome - OVERVIEW.totalExpenses;
const BUDGET_UTILIZATION =
  (OVERVIEW.totalExpenses / OVERVIEW.totalIncome) * 100;

const fmt = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) => (
  <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
    <Group mb={12}>
      <Box className={`rounded-full p-2 ${color}`}>
        <Icon size={18} className="text-white" />
      </Box>
      <Text className="text-sm font-medium text-[#6B7280]">{label}</Text>
    </Group>
    <Text className="text-2xl font-bold text-[#111827]">{value}</Text>
    {sub && <Text className="mt-1 text-xs text-[#6B7280]">{sub}</Text>}
  </Box>
);

const AccountManagementPage = () => {
  return (
    <Stack gap={20} className="sm:gap-10">
      {/* Header */}
      <Stack gap={16} className="md:gap-6">
        <Box>
          <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
            Account Management
          </Text>
          <Text className="text-sm font-normal text-[#6B7280] md:text-base">
            {" "}
            Superannuation Anglican Workers East of the Niger Welfare Foundation
            — Statement of Accounts as at 31st December 2024
          </Text>
        </Box>
      </Stack>

      {/* Primary KPI Cards */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            icon={Wallet}
            label="Cash in Hand"
            value={fmt(OVERVIEW.cashBalance)}
            sub="Physical cash balance"
            color="bg-blue-500"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            icon={CreditCard}
            label="Total Bank Balance"
            value={fmt(OVERVIEW.bankBalance)}
            sub="Across FBN, Zenith, ECO, Globus, Access"
            color="bg-indigo-500"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            icon={TrendingUp}
            label="Total Income (2024)"
            value={fmt(OVERVIEW.totalIncome)}
            sub="UK Investment + Rents + Contributions"
            color="bg-green-500"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <StatCard
            icon={TrendingDown}
            label="Total Expenses (2024)"
            value={fmt(OVERVIEW.totalExpenses)}
            sub="Operations + Depreciation + Bad Debt"
            color="bg-red-500"
          />
        </Grid.Col>
      </Grid>

      {/* Secondary KPI Cards */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <StatCard
            icon={DollarSign}
            label="Surplus for the Year"
            value={fmt(SURPLUS)}
            sub="Income minus Expenditure"
            color="bg-teal-500"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <StatCard
            icon={Building}
            label="Total Investments"
            value={fmt(OVERVIEW.totalInvestments)}
            sub="UK + Nigeria equities, real estate, fixed deposits"
            color="bg-purple-500"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
          <StatCard
            icon={Wallet}
            label="Accumulated Fund"
            value={fmt(OVERVIEW.accumulatedFund)}
            sub="Net total assets as at 31 Dec 2024"
            color="bg-amber-500"
          />
        </Grid.Col>
      </Grid>

      {/* Budget Utilization */}
      <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
        <Text className="mb-4 text-[18px] font-semibold text-[#111827]">
          Income vs Expenditure Utilization
        </Text>
        <Stack gap={8}>
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Expenditure as % of Income
            </Text>
            <Text
              size="sm"
              fw={700}
              c={BUDGET_UTILIZATION > 80 ? "red" : "green"}
            >
              {BUDGET_UTILIZATION.toFixed(1)}%
            </Text>
          </Group>
          <Progress
            value={BUDGET_UTILIZATION}
            color={BUDGET_UTILIZATION > 80 ? "red" : "green"}
            size="lg"
            radius="xl"
          />
          <Group justify="space-between" mt={4}>
            <Text size="xs" c="dimmed">
              Total Income: {fmt(OVERVIEW.totalIncome)}
            </Text>
            <Text size="xs" c="dimmed">
              Surplus: {fmt(SURPLUS)}
            </Text>
          </Group>
        </Stack>
      </Box>

      {/* Bank Balances Breakdown */}
      <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
        <Text className="mb-4 text-[18px] font-semibold text-[#111827]">
          Bank &amp; Cash Balances (Note 5)
        </Text>
        <Grid>
          {[
            { bank: "FBNI", balance: 174_914_498.96 },
            { bank: "FBN II", balance: 3_050_987.38 },
            { bank: "Zenith Bank (Pound)", balance: 344_836_477.69 },
            { bank: "Zenith Bank (Naira)", balance: 163_919_874.54 },
            { bank: "Zenith Bank (Dollar)", balance: 822_255.56 },
            { bank: "ECO Bank", balance: 905_335.91 },
            { bank: "Globus Bank", balance: 10_275_340.81 },
            { bank: "Access Bank Savings", balance: 70_231.81 },
            { bank: "FBN Dom I", balance: 801_126.88 },
            { bank: "FBN Dom II", balance: 92_816 },
            { bank: "CCB (In Liquidation)", balance: 73_798.3 },
            { bank: "Cash in Hand", balance: 198_771 },
          ].map((item) => (
            <Grid.Col key={item.bank} span={{ base: 12, sm: 6, lg: 4 }}>
              <Box className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                <Text size="sm" fw={500} className="text-[#374151]">
                  {item.bank}
                </Text>
                <Text size="sm" fw={700} className="text-[#111827]">
                  {fmt(item.balance)}
                </Text>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default AccountManagementPage;
