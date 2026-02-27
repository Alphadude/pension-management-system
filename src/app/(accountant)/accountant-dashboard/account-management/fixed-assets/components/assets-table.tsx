"use client";

import { Badge, Box, Group, Stack, Table, Text } from "@mantine/core";

// Fixed Asset schedule from Statement of Accounts — Fixed Asset Sheet (31 Dec 2024)
const FIXED_ASSETS = [
  {
    id: "FA-001",
    name: "Land & Building — Fund",
    category: "Land & Building",
    location: "Fund HQ",
    cost: 460_429_049,
    additions: 450_000,
    accumulated: 0,
    depreciationRate: 0,
    bookValue: 460_879_049,
    status: "Active" as const,
  },
  {
    id: "FA-002",
    name: "Land / Building — Aluu Hostel",
    category: "Land & Building",
    location: "Aluu",
    cost: 490_742_426.75,
    additions: 0,
    accumulated: 0,
    depreciationRate: 0,
    bookValue: 490_742_426.75,
    status: "Active" as const,
  },
  {
    id: "FA-003",
    name: "Building — Awka",
    category: "Land & Building",
    location: "Awka",
    cost: 303_433_393.86,
    additions: 0,
    accumulated: 0,
    depreciationRate: 0,
    bookValue: 303_433_393.86,
    status: "Active" as const,
  },
  {
    id: "FA-004",
    name: "Building — Uni Niger Hostel",
    category: "Land & Building",
    location: "Niger",
    cost: 0,
    additions: 259_016_908,
    accumulated: 0,
    depreciationRate: 0,
    bookValue: 259_016_908,
    status: "Active" as const,
  },
  {
    id: "FA-005",
    name: "Plant / Equipment — Fund",
    category: "Plant & Equipment",
    location: "Fund HQ",
    cost: 12_852_660,
    additions: 1_721_000,
    accumulated: 6_985_824,
    depreciationRate: 10,
    bookValue: 7_587_836,
    status: "Active" as const,
  },
  {
    id: "FA-006",
    name: "Plant / Equipment — Aluu Hostel",
    category: "Plant & Equipment",
    location: "Aluu",
    cost: 14_013_695,
    additions: 0,
    accumulated: 4_204_108.52,
    depreciationRate: 10,
    bookValue: 9_809_586.48,
    status: "Active" as const,
  },
  {
    id: "FA-007",
    name: "Motor Vehicle",
    category: "Motor Vehicle",
    location: "Fund HQ",
    cost: 733_450,
    additions: 0,
    accumulated: 669_087.5,
    depreciationRate: 25,
    bookValue: 64_362.5,
    status: "Active" as const,
  },
  {
    id: "FA-008",
    name: "Furniture & Fittings — Awka",
    category: "Furniture & Fittings",
    location: "Awka",
    cost: 16_493_700,
    additions: 0,
    accumulated: 3_298_740,
    depreciationRate: 10,
    bookValue: 13_194_960,
    status: "Active" as const,
  },
  {
    id: "FA-009",
    name: "Furniture & Fittings — Fund",
    category: "Furniture & Fittings",
    location: "Fund HQ",
    cost: 14_332_867,
    additions: 0,
    accumulated: 7_007_157.8,
    depreciationRate: 10,
    bookValue: 7_325_709.2,
    status: "Active" as const,
  },
  {
    id: "FA-010",
    name: "Furniture & Fittings — Aluu Hostel",
    category: "Furniture & Fittings",
    location: "Aluu",
    cost: 2_370_000,
    additions: 19_386_100,
    accumulated: 711_000,
    depreciationRate: 10,
    bookValue: 21_045_100,
    status: "Active" as const,
  },
];

const fmt = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

const TOTALS = {
  cost: FIXED_ASSETS.reduce((s, a) => s + a.cost, 0),
  additions: FIXED_ASSETS.reduce((s, a) => s + a.additions, 0),
  accumulated: FIXED_ASSETS.reduce((s, a) => s + a.accumulated, 0),
  bookValue: FIXED_ASSETS.reduce((s, a) => s + a.bookValue, 0),
};

const AssetsTable = () => {
  return (
    <Stack gap={16}>
      {/* Summary cards */}
      <Box className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Total Cost",
            value: fmt(TOTALS.cost),
            color: "text-blue-600",
          },
          {
            label: "Total Additions",
            value: fmt(TOTALS.additions),
            color: "text-indigo-600",
          },
          {
            label: "Accum. Depr.",
            value: fmt(TOTALS.accumulated),
            color: "text-red-600",
          },
          {
            label: "Net Book Value",
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

      {/* Asset register table */}
      <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
        <Group justify="space-between" mb={24}>
          <Text className="text-[18px] font-semibold text-[#111827]">
            Asset Register — Fixed Asset Schedule (31 Dec 2024)
          </Text>
          <Badge variant="light" color="blue">
            {FIXED_ASSETS.length} Assets
          </Badge>
        </Group>

        <Box className="w-full overflow-x-auto">
          <Table.ScrollContainer minWidth={900}>
            <Table highlightOnHover>
              <Table.Thead className="bg-[#f9fafb] text-[#6B7280]">
                <Table.Tr>
                  <Table.Th>Asset ID</Table.Th>
                  <Table.Th>Asset Name</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Location</Table.Th>
                  <Table.Th>Cost (₦)</Table.Th>
                  <Table.Th>Additions (₦)</Table.Th>
                  <Table.Th>Accum. Depr. (₦)</Table.Th>
                  <Table.Th>Rate</Table.Th>
                  <Table.Th>Book Value (₦)</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {FIXED_ASSETS.map((asset) => (
                  <Table.Tr key={asset.id}>
                    <Table.Td className="text-sm font-medium text-blue-600">
                      {asset.id}
                    </Table.Td>
                    <Table.Td className="max-w-[200px] truncate text-sm text-[#4B5563]">
                      {asset.name}
                    </Table.Td>
                    <Table.Td className="text-sm text-[#4B5563]">
                      {asset.category}
                    </Table.Td>
                    <Table.Td className="text-sm text-[#4B5563]">
                      {asset.location}
                    </Table.Td>
                    <Table.Td className="text-sm font-semibold">
                      {fmt(asset.cost)}
                    </Table.Td>
                    <Table.Td className="text-sm text-indigo-700">
                      {asset.additions > 0 ? fmt(asset.additions) : "—"}
                    </Table.Td>
                    <Table.Td className="text-sm font-semibold text-red-700">
                      {asset.accumulated > 0 ? fmt(asset.accumulated) : "—"}
                    </Table.Td>
                    <Table.Td className="text-sm">
                      {asset.depreciationRate > 0
                        ? `${asset.depreciationRate}%`
                        : "N/A"}
                    </Table.Td>
                    <Table.Td className="text-sm font-bold text-green-700">
                      {fmt(asset.bookValue)}
                    </Table.Td>
                    <Table.Td>
                      <Badge color="green" variant="light">
                        {asset.status}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
                {/* Totals row */}
                <Table.Tr className="bg-blue-50 font-bold">
                  <Table.Td colSpan={4} className="font-bold text-[#111827]">
                    TOTAL
                  </Table.Td>
                  <Table.Td className="font-bold">{fmt(TOTALS.cost)}</Table.Td>
                  <Table.Td className="font-bold text-indigo-700">
                    {fmt(TOTALS.additions)}
                  </Table.Td>
                  <Table.Td className="font-bold text-red-700">
                    {fmt(TOTALS.accumulated)}
                  </Table.Td>
                  <Table.Td>—</Table.Td>
                  <Table.Td className="font-bold text-green-700">
                    {fmt(TOTALS.bookValue)}
                  </Table.Td>
                  <Table.Td>—</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Box>
      </Box>
    </Stack>
  );
};

export default AssetsTable;
