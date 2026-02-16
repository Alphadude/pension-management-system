"use client";

import { ThreeDots } from "@/components/icons/three-dots";
import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Menu,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { Eye, Search } from "lucide-react";
import { useState } from "react";
import VendorModal from "../vendor-modal";

// Define allowed status values
type InvoiceStatus =
  | "Under Review"
  | "Signed Voucher Received"
  | "Voucher Sent"
  | "Paid";

interface Invoice {
  vendor: string;
  id: string;
  amount: string;
  date: string;
  status: InvoiceStatus;
}

// Status colors mapping
const statusColor: Record<InvoiceStatus, string> = {
  "Under Review": "red",
  "Signed Voucher Received": "blue",
  "Voucher Sent": "yellow",
  Paid: "green",
};

const VendorManagementTable = () => {
  const [search, setSearch] = useState("");
  const [_month, setMonth] = useState<string | null>(null);
  const [_year, setYear] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Dummy Data
  const invoices: Invoice[] = [
    {
      vendor: "Power Solutions Ltd",
      id: "INV-001",
      amount: "₦125,000.00",
      date: "Jan 15, 2025",
      status: "Under Review",
    },
    {
      vendor: "Power Solutions Ltd",
      id: "INV-002",
      amount: "₦180,000.00",
      date: "Feb 05, 2025",
      status: "Signed Voucher Received",
    },
    {
      vendor: "Nepsix Team",
      id: "INV-003",
      amount: "₦90,000.00",
      date: "Mar 10, 2025",
      status: "Voucher Sent",
    },
    {
      vendor: "Power Solutions Ltd",
      id: "INV-004",
      amount: "₦250,000.00",
      date: "Apr 22, 2025",
      status: "Paid",
    },
  ];

  return (
    <Box p="lg" className="rounded-2xl bg-white shadow-sm">
      {/* Header */}
      <Group justify="space-between" mb="md">
        <Box>
          <Text className="text-[22px] font-bold text-[#1E1E1E] md:text-[26px]">
            Vendor Invoices
          </Text>
          <Text className="text-sm text-[#6B7280]">
            Manage and track all submitted vendor invoices.
          </Text>
        </Box>
      </Group>

      {/* Search & Filters */}
      <Group justify="space-between" mb="lg" className="flex-wrap gap-3">
        <TextInput
          placeholder="Search by vendor or invoice number..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<Search size={16} />}
          className="w-full md:w-[500px]"
        />

        <Group className="gap-3">
          <Select
            placeholder="Status"
            data={[
              "Paid",
              "Under Review",
              "Voucher Sent",
              "Signed Voucher Received",
            ]}
            classNames={{
              input: "h-[32px] md:h-[42px] w-[100px] ",
            }}
          />

          <MonthPickerInput
            placeholder="Enter Month"
            classNames={{
              input:
                "h-[32px] md:h-[42px] w-full text-black placeholder:text-black",
              placeholder: "hidden md:block",
            }}
            onChange={(value) => {
              if (value) {
                setMonth(
                  new Date(value).toLocaleString("default", { month: "long" }),
                );
              } else {
                setMonth(null);
              }
            }}
            valueFormat="MMM"
            clearable
          />

          <YearPickerInput
            placeholder="Year"
            classNames={{
              input:
                "h-[32px] md:h-[42px] w-[100px] text-black placeholder:text-black", // 👈 text + placeholder black
              placeholder: "hidden md:block",
            }}
            onChange={(value) => {
              if (value) {
                setYear(new Date(value).getFullYear().toString());
              } else {
                setYear(null);
              }
            }}
            clearable
          />
        </Group>
      </Group>

      {/* Table */}
      <Table
        highlightOnHover
        visibleFrom="sm"
        classNames={{
          thead:
            "bg-[#f9fafb] text-[#6B7280] font-medium text-[12px] leading-[17px] uppercase h-[60px]",
          td: "h-[67px] text-[14px] font-medium font-inter leading-[17px] text-[#1E1E1E]",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="text-sm font-medium text-[#6B7280]">
              VENDOR NAME
            </Table.Th>
            <Table.Th className="text-sm font-medium text-[#6B7280]">
              INVOICE ID
            </Table.Th>
            <Table.Th className="text-sm font-medium text-[#6B7280]">
              AMOUNT
            </Table.Th>
            <Table.Th className="text-sm font-medium text-[#6B7280]">
              DATE SUBMITTED
            </Table.Th>
            <Table.Th className="text-sm font-medium text-[#6B7280]">
              STATUS
            </Table.Th>
            <Table.Th className="text-sm font-medium text-[#6B7280]">
              ACTIONS
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {invoices.map((invoice, index) => (
            <Table.Tr key={index} className="text-[#1E1E1E]">
              <Table.Td className="font-semibold">{invoice.vendor}</Table.Td>
              <Table.Td>{invoice.id}</Table.Td>
              <Table.Td>{invoice.amount}</Table.Td>
              <Table.Td>{invoice.date}</Table.Td>
              <Table.Td>
                <Badge
                  color={statusColor[invoice.status]}
                  variant="light"
                  radius="xl"
                  className="px-3 py-1 capitalize"
                >
                  {invoice.status.toLowerCase()}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Menu shadow="md" width={180}>
                  <Menu.Target>
                    <ActionIcon
                      variant="transparent"
                      className="flex h-[16px] w-[30px] items-center justify-center rounded-[8px] px-[7px] py-[6px]"
                    >
                      <ThreeDots />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Actions</Menu.Label>
                    <Menu.Item
                      leftSection={<Eye size={16} />}
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setOpened(true);
                      }}
                    >
                      View Details
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <VendorModal
        opened={opened}
        onClose={() => setOpened(false)}
        invoice={selectedInvoice}
      />
    </Box>
  );
};

export default VendorManagementTable;
