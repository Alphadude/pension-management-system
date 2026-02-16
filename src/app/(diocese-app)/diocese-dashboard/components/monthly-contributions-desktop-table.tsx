import { MoneyIcon } from "@/components/icons/money-icon";
import { ThreeDots } from "@/components/icons/three-dots";
import type { ContributionResponse } from "@/types/common";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  Table,
  Text,
} from "@mantine/core";
import { Eye } from "lucide-react";
import Link from "next/link";
import { previousMonthlyContributionsTableHeadings } from "./extras";

type Props = {
  data: ContributionResponse["doc"];
};

const PreviousMonthlyContributionsDesktopTable = ({ data }: Props) => {
  const rows = data.map((contribution, index) => (
    <Table.Tr key={`invoice-table-row-${index}`}>
      <Table.Td>
        <Group gap={4} align="center">
          <Avatar
            color="cyan"
            w={38}
            h={38}
            src={
              typeof contribution.user.profilePhoto === "string"
                ? contribution.user.profilePhoto
                : (contribution.user.profilePhoto?.url ?? "")
            }
          />
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {contribution.user.firstName} {contribution.user.lastName}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {contribution.user.email}
            </Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution.user.id.slice(0, 6)}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution.year}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution.salary}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution.deduction}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution.remittance}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution.totalRemittance}
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
                <Link href={"#"}>Contribution</Link>
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
          {previousMonthlyContributionsTableHeadings.map((heading, index) => (
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

export default PreviousMonthlyContributionsDesktopTable;
