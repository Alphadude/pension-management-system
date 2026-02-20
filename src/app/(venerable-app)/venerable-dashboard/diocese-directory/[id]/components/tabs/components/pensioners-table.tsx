import { ExportIcon } from "@/components/icons/export-icon";
import { cn } from "@/lib/utils";
import type { ContributionTypeOptions } from "@/types/common";
import {
  Avatar,
  Box,
  Button,
  Group,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { Search } from "lucide-react";
import { getContributorTypeStyle } from "./extras";

const pensionersTableHeadings = [
  "NAME",
  "USER ID",
  "STATUS",
  "LAST PENSION PENDING",
  "TOTAL PENSION PAID",
];

// Hardcoded pensioners data based on UI typical format
const pensioners = [
  {
    name: "John Michael Smith",
    email: "john.smith@email.com",
    userId: "USR-001",
    status: "Active",
    lastPension: "Apr 15, 2025",
    totalPension: "₦125,000.00",
    avatar: "/images/Profile.svg",
  },
  {
    name: "Maria Elena Rodriguez",
    email: "maria.rodriguez@email.com",
    userId: "USR-002",
    status: "Retired",
    lastPension: "Apr 15, 2025",
    totalPension: "₦125,000.00",
    avatar: "/images/Profile.svg",
  },
  {
    name: "John Michael Smith",
    email: "john.smith@email.com",
    userId: "USR-001",
    status: "Active",
    lastPension: "Apr 15, 2025",
    totalPension: "₦125,000.00",
    avatar: "/images/Profile.svg",
  },
  {
    name: "Maria Elena Rodriguez",
    email: "maria.rodriguez@email.com",
    userId: "USR-002",
    status: "Deceased",
    lastPension: "Apr 15, 2025",
    totalPension: "₦125,000.00",
    avatar: "/images/Profile.svg",
  },
  {
    name: "Maria Elena Rodriguez",
    email: "maria.rodriguez@email.com",
    userId: "USR-002",
    status: "Retired",
    lastPension: "Apr 15, 2025",
    totalPension: "₦125,000.00",
    avatar: "/images/Profile.svg",
  },
];

const PensionersTable = () => {
  const rows = pensioners.map((pensioner, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>
        <Group gap={4} align="center">
          <Avatar
            color="cyan"
            w={38}
            h={38}
            src={
              typeof pensioner.avatar === "string"
                ? pensioner.avatar
                : (pensioner.avatar ?? "")
            }
          />
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {pensioner.name}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {pensioner.email}
            </Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {pensioner.userId}
      </Table.Td>
      <Table.Td className="">
        <Box
          className={cn(
            "rounded-full px-5 py-1 text-center text-xs font-medium font-normal",
            getContributorTypeStyle(
              pensioner.status as ContributionTypeOptions,
            ),
          )}
        >
          {pensioner.status}
        </Box>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {pensioner.lastPension}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {pensioner.totalPension}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Group gap={16} className="mt-2 mb-5 grid w-full grid-cols-[6fr_1fr]">
        <TextInput
          leftSection={<Search color="#9CA3AF" size={20} />}
          placeholder="Search by user names, emails..."
          classNames={{
            input: "h-[32px] md:h-[42px] w-full",
          }}
        />
        <Button
          classNames={{
            root: "h-[42px] bg-transparent w-[115px] border border-[#d1d5db]",
            inner: "pl-2.5",
            label: "text-sm text-[#1E1E1E] font-normal",
          }}
        >
          <ExportIcon /> Export
        </Button>
      </Group>
      <Table
        highlightOnHover
        visibleFrom="sm"
        classNames={{
          thead:
            "bg-[#EFF5FF] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[67px]",
          td: "h-[87px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {pensionersTableHeadings.map((heading: string, index: number) => (
              <Table.Th key={`pensioners-table-heading-${index}`}>
                {heading}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default PensionersTable;
