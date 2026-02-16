import { getInvoiceStatusStyle } from "@/app/(vendor-app)/vendor-dashboard/components/extras";
import { cn } from "@/lib/utils";
import type { GetUserContributionsApiResponse } from "@/types/common";
import { Box, Table, Text } from "@mantine/core";
import { format } from "date-fns";
import ContributionTypeItem from "./contribution-type-item";
import { contributionTableHeadings, getContributionTypeStyle } from "./extras";

type Props = {
  data: GetUserContributionsApiResponse["doc"];
};

const ContributionTable = ({ data }: Props) => {
  const rows = data.map((contribution, index) => (
    <Table.Tr key={`contribution-table-row-${index}`}>
      <Table.Td>{format(contribution?.createdAt, "MMM d, yyyy")}</Table.Td>
      <Table.Td>
        <ContributionTypeItem type={contribution?.type} />
      </Table.Td>
      <Table.Td>
        <Text
          inherit
          className={cn(getContributionTypeStyle(contribution?.type))}
        >
          {contribution?.type?.toLowerCase() === "debit" ? "-" : ""} ₦
          {contribution?.totalRemittance?.toLocaleString()}
        </Text>
      </Table.Td>
      <Table.Td>{contribution?.station ?? ""}</Table.Td>
      <Table.Td>
        <Box
          component="span"
          className={cn(
            "rounded-full border px-[10px] py-1 text-xs font-medium capitalize",
            getInvoiceStatusStyle(contribution.status),
          )}
        >
          {contribution.status}
        </Box>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table
      highlightOnHover
      visibleFrom="sm"
      classNames={{
        thead:
          "bg-[#EFF5FF] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[67px]",
        td: "h-[57px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          {contributionTableHeadings.map((heading, index) => (
            <Table.Th key={`contribution-table-heading-${index}`}>
              {heading}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default ContributionTable;
