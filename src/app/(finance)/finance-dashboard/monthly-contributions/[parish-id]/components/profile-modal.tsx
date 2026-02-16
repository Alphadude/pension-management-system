"use client";

import {
  Avatar,
  Badge,
  Box,
  Group,
  Modal,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { Calendar, Phone, User } from "lucide-react";

export interface Props {
  year: string;
  month: string;
  salary: string;
  deduction: string;
  remittance: string;
  totalRemittance: string;
}

interface ProfileModalProps {
  opened: boolean;
  onClose: () => void;
  contributions?: Props[];
}

const headerClass =
  "py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase bg-[#F9FAFB] text-left";
const cellClass =
  "py-3 px-4 text-sm font-medium text-[#111827] border-b border-[#E5E7EB]";

export default function ProfileModal({
  opened,
  onClose,
  contributions,
}: ProfileModalProps) {
  const rows: Props[] = contributions ?? [
    {
      year: "2025",
      month: "Jan",
      salary: "₦125,000.00",
      deduction: "₦6,000.00",
      remittance: "₦12,000.00",
      totalRemittance: "₦18,000.00",
    },
    {
      year: "2025",
      month: "Feb",
      salary: "₦130,000.00",
      deduction: "₦6,500.00",
      remittance: "₦13,000.00",
      totalRemittance: "₦19,500.00",
    },
    {
      year: "2025",
      month: "Mar",
      salary: "₦135,000.00",
      deduction: "₦6,750.00",
      remittance: "₦13,500.00",
      totalRemittance: "₦20,250.00",
    },
    {
      year: "2025",
      month: "Apr",
      salary: "₦140,000.00",
      deduction: "₦7,000.00",
      remittance: "₦14,000.00",
      totalRemittance: "₦21,000.00",
    },
    {
      year: "2025",
      month: "May",
      salary: "₦145,000.00",
      deduction: "₦7,250.00",
      remittance: "₦14,500.00",
      totalRemittance: "₦21,750.00",
    },
  ];

  return (
    <Modal opened={opened} onClose={onClose} size="fullscreen" radius="md">
      <Stack gap="md">
        <Stack
          gap="md"
          style={{
            width: "100%",
            maxWidth: 750,
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <Text fw={700} size="20px">
            View Contributor Profile
          </Text>

          <Box>
            <Group gap={8} align="center">
              <User size={20} strokeWidth={2} color="#2563EB" />
              <Text fw={500} size="16px">
                Contributor Profile
              </Text>
            </Group>
          </Box>
          {/* Row 1: Avatar + Name/Email (left), Badge (right) */}
          <Group
            justify="space-between"
            align="center"
            style={{ width: "100%" }}
          >
            <Group gap={12} align="center">
              <Avatar size={50} radius="xl" src="/profile.jpg" />
              <Stack gap={4}>
                <Text fw={600} size="16px">
                  John Michael Smith
                </Text>
                <Text size="14px" color="dimmed">
                  john.smith@email.com
                </Text>
              </Stack>
            </Group>
            <Badge
              color="green"
              variant="light"
              size="lg"
              style={{
                marginBottom: "30px",
                backgroundColor: "#BBF7D0",
                color: "#4CAF50",
                borderRadius: "20px",
                textTransform: "capitalize",
              }}
            >
              Active
            </Badge>
          </Group>

          {/* Row 2: Phone (left), Calendar (right) */}
          <Group justify="space-between" style={{ width: "100%" }}>
            <Group gap={6} align="center">
              <Phone size={16} />
              <Text size="14px" color="dimmed">
                +234 9034 878756
              </Text>
            </Group>

            <Group gap={6} align="center">
              <Calendar size={16} />
              <Text size="14px" color="dimmed">
                Joined: 2020-01-15
              </Text>
            </Group>
          </Group>

          {/* Salary Box */}
          <Box
            style={{
              padding: "18px",
              borderRadius: 10,
              backgroundColor: "#F7F9FC",
              width: "100%",
            }}
          >
            <Stack gap={12}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text size="14px">Last Known Salary:</Text>
                <Text size="18px" fw={700} style={{ color: "#2E5AAC" }}>
                  ₦100,000.00
                </Text>
              </Box>

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text size="14px">Expected 5% Deduction:</Text>
                <Text size="18px" fw={700} style={{ color: "#13A382" }}>
                  ₦5,000.00
                </Text>
              </Box>
            </Stack>
          </Box>
        </Stack>

        {/* Top section with filters */}
        <Box className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-[rgba(0,0,0,0.05)]">
          <Text style={{ fontSize: 20, fontWeight: 700 }}>
            Previous Monthly Contributions
          </Text>

          <Group gap="md" className="hidden md:flex">
            <MonthPickerInput
              placeholder="Pick month"
              classNames={{
                input: "h-[40px] w-[150px]",
              }}
            />
            <YearPickerInput
              placeholder="Pick year"
              classNames={{
                input: "h-[40px] w-[100px]",
              }}
            />
          </Group>
        </Box>

        {/* Desktop Table */}
        {/* Desktop Table */}
        <Box className="hidden md:block" style={{ overflowX: "auto" }}>
          <Table
            withColumnBorders={false}
            highlightOnHover={false}
            style={{
              minWidth: 760,

              overflow: "hidden",
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th className={headerClass}>Year</Table.Th>
                <Table.Th className={headerClass}>Month</Table.Th>
                <Table.Th className={`${headerClass} px-6 py-6 text-right`}>
                  Salary
                </Table.Th>
                <Table.Th className={`${headerClass} px-6 py-6 text-right`}>
                  5% Deduction
                </Table.Th>
                <Table.Th className={`${headerClass} px-6 py-6 text-right`}>
                  10% Remittance
                </Table.Th>
                <Table.Th className={`${headerClass} px-6 py-6 text-right`}>
                  Total Remittance
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {rows.map((c, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td className={`${cellClass} px-3 py-2`}>
                    {c.year}
                  </Table.Td>
                  <Table.Td className={`${cellClass} px-3 py-2`}>
                    {c.month}
                  </Table.Td>
                  <Table.Td className={`${cellClass} px-6 py-6 text-right`}>
                    {c.salary}
                  </Table.Td>
                  <Table.Td className={`${cellClass} px-6 py-6 text-right`}>
                    {c.deduction}
                  </Table.Td>
                  <Table.Td className={`${cellClass} px-6 py-6 text-right`}>
                    {c.remittance}
                  </Table.Td>
                  <Table.Td className={`${cellClass} px-6 py-6 text-right`}>
                    {c.totalRemittance}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>

        {/* Mobile View */}
        <Box className="mt-6 md:hidden">
          {rows.map((c, idx) => (
            <Box
              key={idx}
              className="mb-4 overflow-hidden rounded-lg border border-[#E5E7EB]"
            >
              {/* Year / Month */}
              <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                <Text className="text-xs font-semibold text-[#6B7280]">
                  Year
                </Text>
                <Text className="text-xs font-semibold text-[#6B7280]">
                  Month
                </Text>
              </Box>
              <Box className="flex justify-between px-4 py-2">
                <Text className="text-sm font-medium text-[#111827]">
                  {c.year}
                </Text>
                <Text className="text-sm font-medium text-[#111827]">
                  {c.month}
                </Text>
              </Box>

              {/* Salary / Deduction */}
              <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                <Text className="text-xs font-semibold text-[#6B7280]">
                  Salary
                </Text>
                <Text className="text-xs font-semibold text-[#6B7280]">
                  5% Deduction
                </Text>
              </Box>
              <Box className="flex justify-between px-4 py-2">
                <Text className="text-sm font-medium text-[#111827]">
                  {c.salary}
                </Text>
                <Text className="text-sm font-medium text-[#111827]">
                  {c.deduction}
                </Text>
              </Box>

              {/* Remittance / Total Remittance */}
              <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                <Text className="text-xs font-semibold text-[#6B7280]">
                  10% Remittance
                </Text>
                <Text className="text-xs font-semibold text-[#6B7280]">
                  Total Remittance
                </Text>
              </Box>
              <Box className="flex justify-between px-4 py-2">
                <Text className="text-sm font-medium text-[#111827]">
                  {c.remittance}
                </Text>
                <Text className="text-sm font-medium text-[#111827]">
                  {c.totalRemittance}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Stack>
    </Modal>
  );
}
