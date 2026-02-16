"use client";
import { DownloadIcon } from "@/components/icons/download-icon";
import { UploadIcon } from "@/components/icons/upload-icon";
import { PaginationCard } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Box, Button, Select, Stack, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronRight, FilterIcon } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
import UploadModal from "./upload-modal";

const voucherTransactions = [
  {
    date: "Apr 15, 2025",
    voucherId: "002124 442",
    cbFolio: "CB-2023-1 236",
    description: "Monthly pension payment",
    amount: "N125,000.00",
    status: "Pending Upload",
  },
  {
    date: "Apr 15, 2025",
    voucherId: "002124 443",
    cbFolio: "CB-2023-1 237",
    description: "Monthly pension payment",
    amount: "N125,000.00",
    status: "Confirmed",
  },
  {
    date: "Apr 15, 2025",
    voucherId: "002124 444",
    cbFolio: "CB-2023-1 238",
    description: "Monthly pension payment",
    amount: "N125,000.00",
    status: "Uploaded",
  },
];

const headerStyles = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#6B7280",
};

const PaymentVoucherTable = () => {
  const [opened, { open, close }] = useDisclosure(false);
  // const [status, setStatus] = useQueryState("status");
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    // updateQuery("page", newPage);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    // updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Stack gap={16}>
      <Box className="shadow-[rgba(0, 0, 0, 0.05)] font-poppins mt-6 mb-[50px] w-full rounded-[12px] border border-[#F3F4F6] bg-white">
        <Box className="flex items-center justify-between border-b border-b-[#F3F4F6] px-5 py-4">
          <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
            Payment vouchers
          </Text>
          <Box className="flex items-center gap-4">
            <Select
              classNames={{
                input: "w-[88px] h-[32px]",
              }}
              placeholder="2025"
              data={["2025", "2024", "2023", "2022"]}
            />
            <Link
              href="#"
              className="flex items-center gap-1 text-[10px] font-normal text-[#2E5AAC] md:text-sm"
            >
              View all <ChevronRight size={16} color="#2E5AAC" />
            </Link>
            <Tabs
              variant="pills"
              radius="xs"
              defaultValue="all"
              color="#fff"
              className="hidden md:block"
              classNames={{
                root: "bg-[#ebeff3] px-2 py-[6px]",
                tabLabel: "text-xs text-normal text-[#000]",
                tab: "p-1",
              }}
            >
              <Tabs.List>
                <Tabs.Tab value="all">All</Tabs.Tab>
                <Tabs.Tab value="pending">Pending</Tabs.Tab>
                <Tabs.Tab value="completed">Completed</Tabs.Tab>
              </Tabs.List>
            </Tabs>
            <Box className="block md:hidden">
              <FilterIcon size={12} color="#1E1E1E" />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="hidden grid-cols-2 items-center justify-between bg-[#F9FAFB] px-[20px] py-[13px] md:grid md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_2fr]">
            <Text style={headerStyles}>DATE</Text>
            <Text style={headerStyles}>VOUCHER ID</Text>
            <Text style={headerStyles}>CB FOLIO</Text>
            <Text style={headerStyles}>DESCRIPTION</Text>
            <Text style={headerStyles}>AMOUNT</Text>
            <Text style={headerStyles}>STATUS</Text>
            <Text style={headerStyles}>ACTION</Text>
          </Box>
          {voucherTransactions.map((transaction, index) => (
            <Box
              key={index}
              className="grid grid-cols-1 items-center border-t border-t-[#E5E7EB] bg-white md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_2fr] md:px-5 md:py-[18px]"
            >
              {/* Mobile View */}
              <Box className="flex flex-col gap-2 bg-white md:hidden">
                <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                  <Text style={headerStyles}>DATE</Text>
                  <Text style={headerStyles}>VOCHER ID</Text>
                </Box>
                <Box className="flex justify-between px-4 py-[10px]">
                  <Text className="text-xs font-medium text-[#374151]">
                    {transaction.date}
                  </Text>
                  <Text className="text-xs font-normal text-[#1E1E1E]">
                    {transaction.voucherId}
                  </Text>
                </Box>
                <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                  <Text style={headerStyles}>CB FOLIO</Text>
                  <Text style={headerStyles}>DESCRIPTION</Text>
                </Box>
                <Box className="flex justify-between px-4 py-[10px]">
                  <Text className="text-sm font-normal text-[#1E1E1E]">
                    {transaction.cbFolio}
                  </Text>
                  <Text className="text-sm font-normal text-[#1E1E1E]">
                    {transaction.description}
                  </Text>
                </Box>
                <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                  <Text style={headerStyles}>AMOUNT</Text>
                  <Text style={headerStyles}>STATUS</Text>
                </Box>
                <Box className="flex justify-between px-4 py-2">
                  <Text className="text-sm font-normal text-[#1E1E1E]">
                    {transaction.amount}
                  </Text>
                  <Text className="block md:hidden">
                    <Box
                      component="span"
                      className={cn(
                        `rounded-full border px-[10px] py-1 text-xs font-medium text-[#4CAF50]`,
                        transaction.status === "Confirmed"
                          ? "border-[#bbf7d0] bg-[#dcfce7] text-[#4caf50]"
                          : transaction.status === "Uploaded"
                            ? "border-[#b2c2e1] bg-[#eaeff7] text-[#2E5AAC]"
                            : "border-[#f1f9e2] bg-[#fff9e6] text-[#ffc107]",
                      )}
                    >
                      {transaction.status}
                    </Box>
                  </Text>
                </Box>
                <Box className="flex justify-between bg-[#F9FAFB] px-4 py-2">
                  <Text style={headerStyles}>Action</Text>
                </Box>
                <Box className="flex justify-between border-b border-[#e5e7eb] px-4 pt-[10px] pb-[25px]">
                  <Box className="flex items-center gap-2 md:hidden">
                    <Button
                      className="block h-[25px] rounded-[4px] border border-[#d5deee] bg-transparent px-2 py-1 text-sm font-normal text-[#2E5AAC] md:hidden"
                      leftSection={<DownloadIcon color="#2E5AAC" />}
                    >
                      Download
                    </Button>
                    {transaction.status === "Pending Upload" && (
                      <Button
                        className="block h-[25px] rounded-[4px] border border-[#dbefdc] bg-transparent px-2 py-1 text-sm font-normal text-[#4CAF50] md:hidden"
                        leftSection={<UploadIcon />}
                        onClick={open}
                      >
                        Upload
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
              {/* Desktop View */}
              <Text className="hidden text-xs font-normal text-[#374151] md:block">
                {transaction.date}
              </Text>
              <Text className="hidden text-sm font-normal text-[#1E1E1E] md:block">
                {transaction.voucherId}
              </Text>
              <Text className="hidden text-xs font-medium text-[#374151] md:block">
                {transaction.cbFolio}
              </Text>
              <Text className="hidden text-xs font-normal text-[#1E1E1E] md:block">
                {transaction.description}
              </Text>
              <Text className="hidden text-sm font-normal text-[#1E1E1E] md:block">
                {transaction.amount}
              </Text>
              <Text className="hidden md:block">
                <Box
                  component="span"
                  className={cn(
                    `rounded-full border px-[10px] py-1 text-xs font-medium text-[#4CAF50]`,
                    transaction.status === "Confirmed"
                      ? "border-[#bbf7d0] bg-[#dcfce7] text-[#4caf50]"
                      : transaction.status === "Uploaded"
                        ? "border-[#b2c2e1] bg-[#eaeff7] text-[#2E5AAC]"
                        : "border-[#f1f9e2] bg-[#fff9e6] text-[#ffc107]",
                  )}
                >
                  {transaction.status}
                </Box>
              </Text>
              <Box className="hidden items-center gap-2 md:flex">
                <Button
                  className="hidden h-[25px] rounded-[4px] border border-[#d5deee] bg-transparent px-2 py-1 text-sm font-normal text-[#2E5AAC] md:block"
                  leftSection={<DownloadIcon color="#2E5AAC" />}
                >
                  Download
                </Button>
                {transaction.status === "Pending Upload" && (
                  <Button
                    className="hidden h-[25px] rounded-[4px] border border-[#dbefdc] bg-transparent px-2 py-1 text-sm font-normal text-[#4CAF50] md:block"
                    leftSection={<UploadIcon />}
                    onClick={open}
                  >
                    Upload
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <PaginationCard
        page={page ?? 1}
        pageSize={10}
        total={voucherTransactions.length}
        onChange={handlePageChange}
        showPageItem
      />
      <UploadModal close={close} opened={opened} />
    </Stack>
  );
};

export default PaymentVoucherTable;
