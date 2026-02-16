"use client";
import { ThreeDots } from "@/components/icons/three-dots";
import { useGetAllDiocese } from "@/hooks/query/use-diocese";
import { routes } from "@/lib/routes";
import {
  ActionIcon,
  Anchor,
  Group,
  Menu,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { Eye, Search } from "lucide-react";
import { dioceseInformationTableHeadings } from "./extras";

const DioceseInformationTable = () => {
  const { data } = useGetAllDiocese();
  const rows = data?.doc?.map((diocese) => (
    <Table.Tr key={`diocese-table-row-${diocese._id}`}>
      <Table.Td className="text-sm !font-bold text-[#1E1E1E]">
        {diocese.name}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {diocese.parishCount}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {diocese.contributorCount}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {diocese.totalPensioners}
      </Table.Td>
      <Table.Td>
        <Text className="text-sm font-bold text-[#1e1e1e]">
          {diocese.contactName}
        </Text>
        <Text className="text-sm font-normal text-[#6B7280]">
          {diocese.contactEmail}
        </Text>
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
            <Menu.Divider />
            <Menu.Item>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <Eye color="#1E1E1E" size={16} />
                <Anchor
                  href={
                    routes.venerableDashboard.dioceseDirectory +
                    `/${diocese._id}`
                  }
                  className="text-base text-black"
                >
                  View Details
                </Anchor>
              </Group>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      {/* <Group
                gap={16}
                className="mt-2 mb-5 w-full"
            > */}
      <TextInput
        leftSection={<Search color="#9CA3AF" size={20} />}
        placeholder="Search by user names, emails..."
        classNames={{
          input: "h-[32px] md:h-[42px] w-full",
        }}
      />
      {/* </Group> */}
      <Table
        highlightOnHover
        visibleFrom="sm"
        classNames={{
          thead:
            "bg-[#f9fafb] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[67px]",
          td: "h-[82px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {dioceseInformationTableHeadings.map((heading, index) => (
              <Table.Th key={`diocese-information-table-heading-${index}`}>
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

export default DioceseInformationTable;
