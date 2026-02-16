import {
  Avatar,
  Button,
  Card,
  Group,
  Modal,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { DownloadIcon, SearchIcon } from "lucide-react";
import React from "react";

interface ParishSubmissionDetailsProps {
  opened: boolean;
  onClose: () => void;
}

const ParishSubmissionDetails: React.FC<ParishSubmissionDetailsProps> = ({
  opened,
  onClose,
}) => {
  const parishData = {
    parishName: "St. Peter’s Parish",
    submittedBy: "Fr. John Smith",
    submissionDate: "05/02/2024",
    email: "fr.john@stpeters.org",
    phone: "+1 (555) 123–4567",
    status: "Pending",
  };

  const contributors = [
    {
      name: "John Michael Smith",
      email: "john.smith@email.com",
      salary: 125000,
      deduction: 6000,
      remittance: 12000,
      total: 18000,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Maria Elena Rodriguez",
      email: "maria.rodriguez@email.com",
      salary: 125000,
      deduction: 6000,
      remittance: 12000,
      total: 18000,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(n);

  const totals = {
    salary: contributors.reduce((a, c) => a + c.salary, 0),
    deduction: contributors.reduce((a, c) => a + c.deduction, 0),
    remittance: contributors.reduce((a, c) => a + c.remittance, 0),
    total: contributors.reduce((a, c) => a + c.total, 0),
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="75%" // makes it 80% of the viewport width
      title={
        <div>
          <Text fw={600} size="lg">
            Remittance Submission Details
          </Text>
          <Text className="text-black" size="sm">
            Review the complete remittance submission from{" "}
            {parishData.parishName}.
          </Text>
        </div>
      }
    >
      {/* Search + Export */}
      <Group justify="space-between" mb="md" mt="sm">
        <TextInput
          placeholder="Search Contributors"
          leftSection={<SearchIcon size={16} />}
          className="w-1/2"
        />
        <Button
          leftSection={<DownloadIcon size={18} className="text-black" />}
          variant="outline"
          className="rounded-md border border-[#D0D5DD] bg-white font-medium text-black shadow-none hover:bg-gray-50"
          styles={{
            label: { color: "black" },
          }}
        >
          Export List
        </Button>
      </Group>
      {/* Parish + Contact Info */}
      <div className="mb-5 grid gap-4 md:grid-cols-2">
        {/* Parish Information */}
        <Card withBorder radius="md" p="md">
          <Text fw={600} mb={10}>
            Parish Information
          </Text>

          {/* Parish Name & Submitted By in 2 columns */}
          <div className="mb-3 grid grid-cols-2 gap-y-1">
            <Text className="text-grey text-[20px]">Parish Name</Text>
            <Text className="ml-20 text-[20px] text-gray-600">
              Submitted By
            </Text>

            <Text fw={600}>{parishData.parishName}</Text>
            <Text className="ml-20 font-medium">{parishData.submittedBy}</Text>
          </div>

          {/* Submission Date */}
          <div className="flex flex-col gap-1">
            <Text className="text-grey text-[20px]">Submission Date</Text>
            <Text fw={600}>{parishData.submissionDate}</Text>
          </div>
        </Card>

        {/* Contact Information */}
        <Card withBorder radius="md" p="md">
          <Text fw={600} mb={10}>
            Contact Information
          </Text>

          <div className="mb-3 grid grid-cols-2 gap-y-1">
            <Text className="text-grey text-[20px]">Email</Text>
            <Text className="text-grey ml-16 text-[20px]">Phone</Text>

            <Text fw={600}>{parishData.email}</Text>
            <Text className="ml-16 font-medium">{parishData.phone}</Text>
          </div>

          <div className="flex flex-col gap-1">
            <Text className="text-grey text-[20px]">Status</Text>
            <span className="mt-1 inline-block w-fit rounded-full border border-yellow-200 bg-yellow-50 px-3 py-0.5 font-semibold text-yellow-600">
              {parishData.status}
            </span>
          </div>
        </Card>
      </div>

      {/* Contributors Table */}
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr className="bg-[#F9FAFB]">
            <Table.Th className="text-sm font-semibold text-black">
              Name
            </Table.Th>
            <Table.Th className="text-sm font-semibold text-black">
              Salary
            </Table.Th>
            <Table.Th className="text-sm font-semibold text-black">
              5% Deduction
            </Table.Th>
            <Table.Th className="text-sm font-semibold text-black">
              10% Remittance
            </Table.Th>
            <Table.Th className="text-sm font-semibold text-black">
              Total Remittance
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {contributors.map((c, i) => (
            <Table.Tr key={i}>
              <Table.Td>
                <Group>
                  <Avatar src={c.avatar} radius="xl" />
                  <div>
                    <Text fw={500}>{c.name}</Text>
                    <Text size="xs" c="dimmed">
                      {c.email}
                    </Text>
                  </div>
                </Group>
              </Table.Td>
              <Table.Td>{formatCurrency(c.salary)}</Table.Td>
              <Table.Td>{formatCurrency(c.deduction)}</Table.Td>
              <Table.Td>{formatCurrency(c.remittance)}</Table.Td>
              <Table.Td>{formatCurrency(c.total)}</Table.Td>
            </Table.Tr>
          ))}
          {/* Totals Row */}
          <Table.Tr>
            <Table.Td fw={600}>Totals</Table.Td>
            <Table.Td fw={600}>{formatCurrency(totals.salary)}</Table.Td>
            <Table.Td fw={600}>{formatCurrency(totals.deduction)}</Table.Td>
            <Table.Td fw={600}>{formatCurrency(totals.remittance)}</Table.Td>
            <Table.Td fw={600} c="blue">
              {formatCurrency(totals.total)}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

      {/* Footer Buttons */}
      <Group justify="flex-end" mt="xl">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button color="blue">Approve Remittance</Button>
      </Group>
    </Modal>
  );
};

export default ParishSubmissionDetails;
