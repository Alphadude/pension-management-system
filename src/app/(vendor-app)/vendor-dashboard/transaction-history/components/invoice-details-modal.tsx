import { DownloadIcon } from "@/components/icons/download-icon";
import { cn } from "@/lib/utils";
import type { GetInvoiceApiResponse } from "@/types/common";
import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface ModalProps {
  opened: boolean;
  close: VoidFunction;
  paymentItem: GetInvoiceApiResponse["doc"][number] | null;
}

const headerStyles = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#6B7280",
};

const tableHeading = ["DESCRIPTION", "AMOUNT", "UNIT COST", "SUBTOTAL"];

const InvoiceDetailsModal = ({ opened, close, paymentItem }: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const invoiceInfo = {
    invoiceNumber: "INV-2024-0045",
    submissionDate: "2024-03-15",
    vendorName: "Nepsix",
    status: "Paid",
  };

  const paymentInfo = {
    referenceNumber: "PAY-2024-0078",
    paymentDate: "2024-03-20",
    paymentMode: "Bank Transfer",
    amountPaid: "₦850,000",
  };

  const paymentLabel = [
    { label: "Reference Number", value: paymentInfo.referenceNumber },
    { label: "Payment Date", value: paymentInfo.paymentDate },
    { label: "Payment Mode", value: paymentInfo.paymentMode },
    { label: "Amount Paid", value: paymentInfo.amountPaid },
  ];

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Invoice-${paymentItem?.id ?? "Summary"}`,
    pageStyle: `
            @page {
                size: A4;
                margin: 20mm;
            }
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
                .no-print {
                    display: none !important;
                }
            }
        `,
  });

  if (!paymentItem) return;

  const labels = [
    { label: "Invoice Number", value: paymentItem?.invoiceNumber },
    { label: "Submission Date", value: invoiceInfo.submissionDate },
    { label: "Vendor Name", value: invoiceInfo.vendorName },
    { label: "Status", value: paymentItem?.status },
  ];

  const rows = paymentItem?.lineItems?.map((item, index) => (
    <Table.Tr key={`payment-item-line-items-${index}`}>
      <Table.Td>{item?.description}</Table.Td>
      <Table.Td> ₦{item?.unitCost?.toLocaleString()}</Table.Td>
      <Table.Td> ₦{item?.totalCost?.toLocaleString()}</Table.Td>
      <Table.Td> ₦{item?.totalCost?.toLocaleString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Modal.Root
      opened={opened}
      onClose={close}
      className="font-[poppins]"
      classNames={{
        content: "rounded-[12px]",
        header: "px-5 md:px-[45px] pb-[6px] bg-green-250 w-full",
        body: " md:px-[45px]",
        title: "text-lg md:text-xl font-semibold md:font-bold text-[#1E1E1E]",
      }}
      size={"90%"}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Text className="text-base font-bold text-[#1F2937] md:text-2xl">
            Invoice & Payment Details
          </Text>
          <Button
            leftSection={<DownloadIcon color="#fff" />}
            className="text-xs font-normal md:text-base"
            onClick={handlePrint}
          >
            Download Invoice
          </Button>
        </Modal.Header>
        <Modal.Body ref={contentRef}>
          <Stack gap={24} mt={16}>
            <Box className="flex w-full flex-col items-center justify-between gap-6 rounded-[12px] px-0 py-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:flex-row md:p-5">
              <Stack gap={16} w={"100%"}>
                <Text className="text-lg font-semibold text-[#1F2937]">
                  Personal information
                </Text>
                <Box className="grid w-full grid-cols-2 gap-4">
                  {labels.map((item, index) => (
                    <Stack gap={4} key={index}>
                      <Text className="text-sm font-medium !text-[#6B7280]">
                        {item.label}
                      </Text>
                      {item.label === "Status" ? (
                        <Text
                          className={cn(
                            "w-fit rounded-full border border-[#b2c2e1] bg-[#eaeff7] px-5 py-1 text-sm font-medium text-[#2E5AAC] capitalize",
                            {
                              "border-[#bbf7d0] bg-[#dcfce7] text-[#4caf50]":
                                item.value?.toLowerCase() === "paid",
                              "border-[#f1f9e2] bg-[#fff9e6] text-[#ffc107]":
                                item.value?.toLowerCase() === "awaiting",
                            },
                          )}
                        >
                          {item.value}
                        </Text>
                      ) : (
                        <Text className="text-sm font-normal text-[#111827]">
                          {item.value}
                        </Text>
                      )}
                    </Stack>
                  ))}
                </Box>
              </Stack>
              <Divider orientation="vertical" />
              <Stack w={"100%"}>
                <Text className="text-lg font-semibold text-[#1F2937]">
                  Amount Summary
                </Text>
                <Stack gap={8}>
                  <Group align="center" justify="space-between">
                    <Text className="text-sm font-normal text-[#6B7280]">
                      Subtotal
                    </Text>
                    <Text className="text-sm font-normal text-[#111827]">
                      ₦850,000
                    </Text>
                  </Group>
                  <Group align="center" justify="space-between">
                    <Text className="text-sm font-normal text-[#6B7280]">
                      VAT
                    </Text>
                    <Text className="text-sm font-normal text-[#111827]">
                      ₦63,750
                    </Text>
                  </Group>
                  <Divider />
                  <Group align="center" justify="space-between">
                    <Text className="text-sm font-medium text-[#111827]">
                      Total Amount
                    </Text>
                    <Text className="text-sm font-medium text-[#111827]">
                      ₦{paymentItem?.totalAmount?.toLocaleString()}
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Box>
            <Box className="w-full rounded-[12px] p-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:p-5">
              <Box className="flex items-center justify-between border-b border-b-[#F3F4F6] px-5 py-4">
                <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
                  Invoice Line Items
                </Text>
              </Box>
              {/* Mobile View */}
              <Box hiddenFrom="md">
                {paymentItem?.lineItems?.map((item, index) => (
                  <Box
                    key={`payment-item-line-items-${index}`}
                    className="grid grid-cols-1 items-center border-t border-t-[#E5E7EB] bg-white md:grid-cols-4 md:px-5 md:py-[18px]"
                  >
                    <Box className="flex flex-col gap-2 bg-white md:hidden">
                      <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                        <Text style={headerStyles}>DESCRIPTION</Text>
                        <Text style={headerStyles}>QUANTITY</Text>
                      </Box>
                      <Box className="flex justify-between px-4 py-[10px]">
                        <Text className="text-xs font-medium text-[#374151]">
                          {item.description}
                        </Text>
                        <Text className="text-xs font-normal text-[#1E1E1E]">
                          {item.quantity}
                        </Text>
                      </Box>
                      <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                        <Text style={headerStyles}>UNIT COST</Text>
                        <Text style={headerStyles}>SUBTOTAL</Text>
                      </Box>
                      <Box className="flex justify-between border-b border-[#e5e7eb] px-4 py-2">
                        <Text className="text-sm font-normal text-[#1E1E1E]">
                          ₦{item?.unitCost?.toLocaleString()}
                        </Text>
                        <Text className="text-sm font-medium text-[#1E1E1E]">
                          ₦{item?.totalCost?.toLocaleString()}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Desktop View */}
              <Box visibleFrom="md">
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
                      {tableHeading.map((heading, index) => (
                        <Table.Th key={`invoice-modal-table-heading-${index}`}>
                          {heading}
                        </Table.Th>
                      ))}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Box>
            </Box>
            <Box className="rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:p-5">
              <Box className="flex w-full flex-col items-baseline justify-between gap-7 md:flex-row">
                <Stack gap={16} w={"100%"}>
                  <Text className="text-lg font-semibold text-[#1F2937]">
                    Personal information
                  </Text>
                  <Box className="grid w-full grid-cols-2 gap-4">
                    {paymentLabel.map((item, index) => (
                      <Stack gap={4} key={index}>
                        <Text className="text-sm font-medium !text-[#6B7280]">
                          {item.label}
                        </Text>
                        {item.label === "Status" ? (
                          <Text
                            className={cn(
                              "w-fit rounded-full border px-5 py-1 text-sm font-medium",
                              item.value === "Paid"
                                ? "border-[#bbf7d0] bg-[#dcfce7] text-[#4caf50]"
                                : item.value === "Awaiting"
                                  ? "border-[#b2c2e1] bg-[#eaeff7] text-[#2E5AAC]"
                                  : "border-[#f1f9e2] bg-[#fff9e6] text-[#ffc107]",
                            )}
                          >
                            {item.value}
                          </Text>
                        ) : (
                          <Text className="text-sm font-normal text-[#111827]">
                            {item.value}
                          </Text>
                        )}
                      </Stack>
                    ))}
                  </Box>
                </Stack>
                <Divider orientation="vertical" />
                <Stack w={"100%"} gap={12}>
                  <Text className="text-sm font-semibold text-[#111827]">
                    Receiving Bank Details
                  </Text>
                  <Stack gap={11}>
                    <Stack gap={0}>
                      <Text className="text-sm font-normal text-[#6B7280]">
                        Bank
                      </Text>
                      <Text className="text-sm font-normal text-[#111827]">
                        {paymentItem?.bankName}
                      </Text>
                    </Stack>
                    <Stack gap={0}>
                      <Text className="text-sm font-normal text-[#6B7280]">
                        Account Number
                      </Text>
                      <Text className="text-sm font-normal text-[#111827]">
                        {paymentItem?.accountNumber}
                      </Text>
                    </Stack>
                    <Stack gap={0}>
                      <Text className="text-sm font-normal text-[#6B7280]">
                        Account Name
                      </Text>
                      <Text className="text-sm font-normal text-[#111827]">
                        {paymentItem?.accountName}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>{" "}
              <Stack
                gap={8}
                p={16}
                className="rounded-[8px] bg-[#F9FAFB]"
                mt={24}
              >
                <Text className="text-sm font-semibold text-[#111827]">
                  Payment Notes
                </Text>
                <Text className="font0normal text-sm text-[#4B5563]">
                  Payment processed as per agreed terms.
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default InvoiceDetailsModal;
