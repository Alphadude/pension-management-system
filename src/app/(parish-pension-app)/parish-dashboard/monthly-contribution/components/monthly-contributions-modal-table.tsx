import { useGetUserContributions } from "@/hooks/query/use-contribution";
import { Table } from "@mantine/core";
import { format } from "date-fns";
import { monthlyContributionsModalTableHeadings } from "./extras";

const MonthlyContributionsModalTable = ({
  contributorId,
}: {
  contributorId: string;
}) => {
  const { data } = useGetUserContributions(contributorId);
  const rows = data?.doc.map((contribution, index) => (
    <Table.Tr key={`invoice-table-row-${index}`}>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contribution?.month ? format(contribution?.month, "MMM") : ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        ₦{contribution?.salary ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        ₦{contribution?.deduction ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        ₦{contribution?.remittance ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        ₦{contribution?.totalRemittance ?? ""}
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
          {monthlyContributionsModalTableHeadings.map((heading, index) => (
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

export default MonthlyContributionsModalTable;
