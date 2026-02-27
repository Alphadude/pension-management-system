"use client";

import { Box, Group, Stack, Table, Text } from "@mantine/core";

// From Fixed Asset Sheet — Statement of Accounts (Jan 2024 → Dec 2024 — Reducing Balance Method)
const DEPRECIATION_SCHEDULE = [
  {
    id: "FA-005",
    name: "Plant / Equipment — Fund",
    rate: 10,
    cost: 14_573_660,
    openingAccumDepr: 5_528_458,
    chargeForYear: 1_457_366,
    closingAccumDepr: 6_985_824,
    bookValue: 7_587_836,
  },
  {
    id: "FA-006",
    name: "Plant / Equipment — Aluu Hostel",
    rate: 10,
    cost: 14_013_695,
    openingAccumDepr: 2_802_739.02,
    chargeForYear: 1_401_369.5,
    closingAccumDepr: 4_204_108.52,
    bookValue: 9_809_586.48,
  },
  {
    id: "FA-007",
    name: "Motor Vehicle",
    rate: 25,
    cost: 733_450,
    openingAccumDepr: 485_725,
    chargeForYear: 183_362.5,
    closingAccumDepr: 669_087.5,
    bookValue: 64_362.5,
  },
  {
    id: "FA-008",
    name: "Furniture & Fittings — Awka",
    rate: 10,
    cost: 16_493_700,
    openingAccumDepr: 1_649_370,
    chargeForYear: 1_649_370,
    closingAccumDepr: 3_298_740,
    bookValue: 13_194_960,
  },
  {
    id: "FA-009",
    name: "Furniture & Fittings — Fund",
    rate: 10,
    cost: 14_332_867,
    openingAccumDepr: 5_573_871.1,
    chargeForYear: 1_433_286.7,
    closingAccumDepr: 7_007_157.8,
    bookValue: 7_325_709.2,
  },
  {
    id: "FA-010",
    name: "Furniture & Fittings — Aluu Hostel",
    rate: 10,
    cost: 21_756_100,
    openingAccumDepr: 474_000,
    chargeForYear: 237_000,
    closingAccumDepr: 711_000,
    bookValue: 21_045_100,
  },
];

const TOTALS = {
  openingAccumDepr: DEPRECIATION_SCHEDULE.reduce(
    (s, a) => s + a.openingAccumDepr,
    0,
  ),
  chargeForYear: DEPRECIATION_SCHEDULE.reduce((s, a) => s + a.chargeForYear, 0),
  closingAccumDepr: DEPRECIATION_SCHEDULE.reduce(
    (s, a) => s + a.closingAccumDepr,
    0,
  ),
  bookValue: DEPRECIATION_SCHEDULE.reduce((s, a) => s + a.bookValue, 0),
};

const fmt = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 2 });

const DepreciationTable = () => {
  return (
    <Stack gap={16}>
      {/* KPI totals */}
      <Box className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Opening Accum. Depr.",
            value: fmt(TOTALS.openingAccumDepr),
            color: "text-orange-600",
          },
          {
            label: "Charge for Year",
            value: fmt(TOTALS.chargeForYear),
            color: "text-red-600",
          },
          {
            label: "Closing Accum. Depr.",
            value: fmt(TOTALS.closingAccumDepr),
            color: "text-red-700",
          },
          {
            label: "Total Net Book Value",
            value: fmt(TOTALS.bookValue),
            color: "text-green-600",
          },
        ].map((s) => (
          <Box
            key={s.label}
            className="rounded-[16px] border border-[#F3F4F6] bg-white p-5 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]"
          >
            <Text className="mb-1 text-sm font-medium text-[#6B7280]">
              {s.label}
            </Text>
            <Text className={`text-lg font-bold ${s.color}`}>{s.value}</Text>
          </Box>
        ))}
      </Box>

      <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
        <Group justify="space-between" mb={24}>
          <Box>
            <Text className="text-[18px] font-semibold text-[#111827]">
              Active Depreciation Schedule
            </Text>
            <Text size="sm" c="dimmed" mt={4}>
              Period: 1 Jan 2024 → 31 Dec 2024 · Method: Reducing Balance
            </Text>
          </Box>
          <Text size="xs" c="dimmed">
            Land & Building assets are NOT depreciated
          </Text>
        </Group>

        <Box className="w-full overflow-x-auto">
          <Table.ScrollContainer minWidth={800}>
            <Table highlightOnHover>
              <Table.Thead className="bg-[#f9fafb] text-[#6B7280]">
                <Table.Tr>
                  <Table.Th>Asset ID</Table.Th>
                  <Table.Th>Asset Name</Table.Th>
                  <Table.Th>Rate (%)</Table.Th>
                  <Table.Th>Opening Acc. Depr. (₦)</Table.Th>
                  <Table.Th>Charge for Year (₦)</Table.Th>
                  <Table.Th>Closing Acc. Depr. (₦)</Table.Th>
                  <Table.Th>Book Value (₦)</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {DEPRECIATION_SCHEDULE.map((asset) => (
                  <Table.Tr key={asset.id}>
                    <Table.Td className="text-sm font-medium text-blue-600">
                      {asset.id}
                    </Table.Td>
                    <Table.Td className="max-w-[200px] truncate text-sm text-[#4B5563]">
                      {asset.name}
                    </Table.Td>
                    <Table.Td className="text-sm">{asset.rate}%</Table.Td>
                    <Table.Td className="text-sm font-semibold text-orange-600">
                      {fmt(asset.openingAccumDepr)}
                    </Table.Td>
                    <Table.Td className="text-sm font-semibold text-red-600">
                      {fmt(asset.chargeForYear)}
                    </Table.Td>
                    <Table.Td className="text-sm font-semibold text-red-700">
                      {fmt(asset.closingAccumDepr)}
                    </Table.Td>
                    <Table.Td className="text-sm font-bold text-green-700">
                      {fmt(asset.bookValue)}
                    </Table.Td>
                  </Table.Tr>
                ))}
                {/* Totals row */}
                <Table.Tr className="bg-blue-50">
                  <Table.Td colSpan={3} className="font-bold text-[#111827]">
                    TOTAL
                  </Table.Td>
                  <Table.Td className="font-bold text-orange-600">
                    {fmt(TOTALS.openingAccumDepr)}
                  </Table.Td>
                  <Table.Td className="font-bold text-red-600">
                    {fmt(TOTALS.chargeForYear)}
                  </Table.Td>
                  <Table.Td className="font-bold text-red-700">
                    {fmt(TOTALS.closingAccumDepr)}
                  </Table.Td>
                  <Table.Td className="font-bold text-green-700">
                    {fmt(TOTALS.bookValue)}
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Box>
      </Box>
    </Stack>
  );
};

export default DepreciationTable;
