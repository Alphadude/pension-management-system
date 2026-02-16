import type { GetInvoiceApiResponse } from "@/types/common";
import { Box, Table } from "@mantine/core";
import { getInvoiceStatusStyle, invoiceTableHeadings } from "./extras";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import numeral from "numeral";

type Props = {
  data: GetInvoiceApiResponse["doc"];
};

const InvoiceTable = ({ data }: Props) => {
  const rows = data.map((invoice, index) => (
    <Table.Tr key={`invoice-table-row-${index}`}>
      <Table.Td>{format(invoice?.date, "MMM d, yyyy")}</Table.Td>
      <Table.Td>{invoice?.invoiceNumber}</Table.Td>
      <Table.Td> ₦{numeral(invoice?.totalAmount).format("0,0.00")}</Table.Td>
      <Table.Td>
        <Box
          component="span"
          className={cn(
            "rounded-full border px-[10px] py-1 text-xs font-medium capitalize",
            getInvoiceStatusStyle(invoice.status),
          )}
        >
          {invoice.status}
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
          {invoiceTableHeadings.map((heading, index) => (
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

export default InvoiceTable;
