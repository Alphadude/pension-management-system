import { cn } from "@/lib/utils";
import type { ReportsResponse } from "@/types/common";
import { Box, Button, Table } from "@mantine/core";
import { format } from "date-fns";
import { DownloadIcon } from "lucide-react";
import { reportsTableHeadings } from "../../transaction-history/components/extras";
import { formatReportString } from "./reports-page-client";

interface Props {
  data: ReportsResponse["doc"];
}

const ReportsTable = ({ data }: Props) => {
  const rows = data.map((report, index) => (
    <Table.Tr key={`payment-history-table-row-${index}`}>
      <Table.Td>{formatReportString(report.reportName)}</Table.Td>
      <Table.Td>
        {format(report?.startDate, "MMM")} -{" "}
        {format(report?.endDate, "MMM d, yyyy")}
      </Table.Td>
      <Table.Td>
        {" "}
        {report?.generatedOn
          ? format(new Date(report.generatedOn), "MMM d, yyyy")
          : "—"}
      </Table.Td>
      <Table.Td>
        <Box
          component="span"
          className={cn(
            `rounded-full border px-[10px] py-1 text-xs font-medium text-[#4CAF50]`,
            report.status === "ready"
              ? "border-[#BBF7D0] bg-[#DCFCE7] text-[#13A382]"
              : "border-[#f1f9e2] bg-[#fff9e6] text-[#ffc107]",
          )}
        >
          {report?.status}
        </Box>
      </Table.Td>
      <Table.Td>{report?.reportType}</Table.Td>
      <Table.Td>
        <Button
          className="hidden bg-transparent text-sm font-normal text-[#2E5AAC] md:block"
          leftSection={<DownloadIcon color="#2E5AAC" />}
        >
          Download
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table
      highlightOnHover
      visibleFrom="sm"
      classNames={{
        thead:
          "bg-[#f9fafb] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[40px]",
        td: "h-[57px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          {reportsTableHeadings.map((heading, index) => (
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

export default ReportsTable;
