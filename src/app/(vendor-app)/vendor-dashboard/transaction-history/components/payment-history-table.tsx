import { DownloadIcon } from "@/components/icons/download-icon";
import { ThreeDots } from "@/components/icons/three-dots";
import { ViewIcon } from "@/components/icons/view-icon";
import { cn } from "@/lib/utils";
import type { GetInvoiceApiResponse } from "@/types/common";
import { ActionIcon, Box, Group, Menu, Table, Text } from "@mantine/core";
import { format } from "date-fns";
import numeral from "numeral";
import { getInvoiceStatusStyle } from "../../components/extras";
import { paymentHistoryTableHeadings } from "./extras";

type Props = {
  data: GetInvoiceApiResponse["doc"];
  handleOpendInvoiceDetailsModal: (
    item: GetInvoiceApiResponse["doc"][number],
  ) => void;
};

const PaymentHistoryTable = ({
  data,
  handleOpendInvoiceDetailsModal,
}: Props) => {
  const rows = data.map((invoice, index) => (
    <Table.Tr key={`payment-history-table-row-${index}`}>
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
      <Table.Td>
        <Menu trigger="hover" shadow="md" width={200} position="bottom-start">
          <Menu.Target>
            <ActionIcon
              variant="transparent"
              className="flex h-[16px] w-[30px] items-center justify-center rounded-[8px] bg-[#F9FAFC] px-[7px] py-[6px]"
            >
              <ThreeDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              <Group
                className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#a6aab3]"
                onClick={() => handleOpendInvoiceDetailsModal(invoice)}
              >
                <ViewIcon color="#6B7280" />
                <Text>View full invoice</Text>
              </Group>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#a6aab3]">
                <DownloadIcon color="#6B7280" />
                <Text>Download</Text>
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
          "bg-[#EFF5FF] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[67px]",
        td: "h-[57px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          {paymentHistoryTableHeadings.map((heading, index) => (
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

export default PaymentHistoryTable;
