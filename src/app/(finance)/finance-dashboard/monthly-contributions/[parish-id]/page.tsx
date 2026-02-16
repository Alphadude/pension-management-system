"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { MoneyIcon } from "@/components/icons/money-icon";
import { ThreeDots } from "@/components/icons/three-dots";
import { Parish } from "@/components/parish";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetAllContributions } from "@/hooks/query/use-contribution";
import { routes } from "@/lib/routes";
import type { ContributionResponse } from "@/types/common";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProfileModal from "./components/profile-modal";
import { monthlyContributionsTableHeadings } from "./extras";

type Props = {
  data: ContributionResponse["doc"];
};

const MonthlyContributionsDesktopTable = ({ data }: Props) => {
  const rows = data.map((contribution, index) => (
    <Table.Tr key={`invoice-table-row-${index}`}>
      <Table.Td>
        <Group gap={4} align="center">
          <Avatar
            color="cyan"
            w={38}
            h={38}
            src={
              typeof contribution?.user?.profilePhoto === "string"
                ? contribution?.user?.profilePhoto
                : (contribution?.user?.profilePhoto?.url ?? "")
            }
          />
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {contribution?.user?.firstName ?? ""}{" "}
              {contribution?.user?.lastName ?? ""}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {contribution?.user?.email ?? ""}
            </Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.user?.id.slice(0, 6) ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.year ? format(contribution?.year, "MMM d, yyyy") : ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.salary ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.deduction ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.remittance ?? ""}
      </Table.Td>
      <Table.Td>
        <Menu trigger="hover" shadow="md" width={200} position="bottom-start">
          <Menu.Target>
            <ActionIcon
              variant="transparent"
              className="flex h-[16px] w-[30px] items-center justify-center rounded-[8px] px-[7px] py-[6px]"
            >
              <ThreeDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label className="text-sm text-[#1E1E1E]">Actions</Menu.Label>
            <Menu.Item>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <MoneyIcon color="#1E1E1E" />
                <Link
                  href={
                    routes.financeDashboard.monthlyContributions +
                    `/${contribution.id}/enter-contribution`
                  }
                >
                  Contribution
                </Link>
              </Group>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <Eye color="#1E1E1E" size={16} />
                <Link href={"#"}>View Profile</Link>
              </Group>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table
      highlightOnHover
      visibleFrom="sm"
      classNames={{
        thead:
          "bg-[#f9fafb] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[67px]",
        td: "h-[87px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          {monthlyContributionsTableHeadings.map((heading, index) => (
            <Table.Th key={`invoice-table-heading-${index}`}>
              {heading}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const Page = () => {
  const [opened, { open: _open, close }] = useDisclosure(false);
  const { data, isLoading, updateQuery } = useGetAllContributions();
  const params = useParams();
  const parishId = params["parish-id"] as string;

  useEffect(() => {
    if (parishId) {
      updateQuery("parish", parishId);
    }
  }, [parishId, updateQuery]);

  return (
    <Box className="min-h-screen bg-gray-50">
      <Box className="rounded-lg bg-white p-6 shadow">
        {/* Back Button */}
        <Group gap="xs" mb="md">
          <ArrowLeft className="h-4 w-4 text-blue-600" />
          <Text c="blue.6" size="sm" fw={500} className="cursor-pointer">
            Go Back
          </Text>
        </Group>

        {/* Parish Header */}
        <Stack gap={0} mb="lg">
          <Text size="xl" fw={700}>
            <Parish parishId={parishId} />
          </Text>
          <Text c="dimmed">Total Paid: ₦125,000.00</Text>
        </Stack>

        {/* Search and Filters Row */}
        <Group justify="space-between" align="flex-end" wrap="wrap" mb="lg">
          {/* Search Input */}
          <TextInput
            placeholder="Search by user names, emails..."
            className="w-full md:w-[500px]"
          />

          {/* Right Filters */}
          <Group gap="md" wrap="nowrap">
            <Select
              placeholder="Status"
              data={["Active", "Retired", "Deceased"]}
              className="max-w-[100px]"
            />
            <MonthPickerInput
              placeholder="January"
              dropdownType="modal"
              className="max-w-[100px]"
            />
            <Select
              placeholder="2023"
              data={["2023", "2024", "2025"]}
              className="max-w-[100px]"
            />
          </Group>
        </Group>
        <ProfileModal opened={opened} onClose={close} />
        {/* desktop view */}
        <TableWrapper
          isLoading={isLoading}
          data={data?.doc}
          table={(data) => <MonthlyContributionsDesktopTable data={data} />}
          skeletonRow={9}
          skeletonCol={8}
          emptyComponent={
            <EmptyTable
              tableHeading={monthlyContributionsTableHeadings}
              message=" You have no recent activity, all recent activity will appear here!!"
            />
          }
        />
      </Box>
    </Box>
  );
};

export default Page;
