"use client";
import { headerStyles } from "@/lib/utils";
import { Box, Group, Stack, Table, Text } from "@mantine/core";
import { contributorTableHeadings } from "./extras";
import type { Contributor } from "./import-contributors-client";

const ContributorDataPreviewDesktopTable = ({
  data,
}: {
  data: Contributor[];
}) => {
  const rows = data.map((contributor, index) => (
    <Table.Tr key={`contributor-table-row-${index}`}>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor.id}
      </Table.Td>
      <Table.Td className="text-sm !font-bold text-[#1e1e1e]">
        {contributor.firstName} {contributor.lastName}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor.gender}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor.yearOfBirth}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor.yearStarted}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor.basicSalary}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor.totalContribution}
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
          {contributorTableHeadings.map((heading, index) => (
            <Table.Th key={`contributor-table-heading-${index}`}>
              {heading}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const ContributorDataPreviewTable = ({ data }: { data: Contributor[] }) => {
  return (
    <Stack gap={16} w={"100%"}>
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 w-full rounded-[12px] bg-white">
        <Box className="flex flex-col items-start border-b border-[#F3F4F6] px-5 py-4">
          <Group className={"w-full"} justify="space-between" align="center">
            <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
              Data Preview
            </Text>
            <Group gap={16} className="mt-2">
              <Text className="text-xs font-medium text-[#1E40AF]">
                Total Records: {data.length}
              </Text>
              <Text className="text-xs font-medium text-[#059669]">
                Valid Records: {data.length}
              </Text>
              <Text className="text-xs font-medium text-[#DC2626]">
                Error: 0
              </Text>
            </Group>
          </Group>
        </Box>
        <Box>
          {/* mobile view */}
          <Box className="flex flex-col gap-2 bg-white md:hidden">
            {data?.map((contributor, index) => (
              <Box
                key={`contributor-mobile-row-${index}`}
                className="grid grid-cols-1 items-center border-t border-[#E5E7EB] bg-white"
              >
                <Box className="flex flex-col gap-2 bg-white">
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>ID</Text>
                    <Text style={headerStyles}>NAME</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {contributor.id}
                    </Text>
                    <Text className="text-xs font-bold text-[#1E1E1E]">
                      {contributor.firstName} {contributor.lastName}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>GENDER</Text>
                    <Text style={headerStyles}>YEAR OF BIRTH</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-xs font-medium text-[#374151]">
                      {contributor.gender}
                    </Text>
                    <Text className="text-xs font-medium text-[#1E1E1E]">
                      {contributor.yearOfBirth}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>YEAR STARTED</Text>
                    <Text style={headerStyles}>BASIC SALARY</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      {contributor.yearStarted}
                    </Text>
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      {contributor.basicSalary}
                    </Text>
                  </Box>
                  <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                    <Text style={headerStyles}>TOTAL CONTRIBUTION</Text>
                  </Box>
                  <Box className="flex justify-between px-4 py-[10px]">
                    <Text className="text-sm font-normal text-[#1E1E1E]">
                      {contributor.totalContribution}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <ContributorDataPreviewDesktopTable data={data} />
        </Box>
      </Box>
    </Stack>
  );
};

export default ContributorDataPreviewTable;
