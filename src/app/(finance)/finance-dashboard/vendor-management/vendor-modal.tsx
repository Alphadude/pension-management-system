"use client";

import { BigFileIcon } from "@/components/icons/big-file-icon";
import { handleDropzoneReject } from "@/lib/utils";
import { Box, Button, Card, Group, Modal, Stack, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { Eye, UploadIcon } from "lucide-react";

interface VendorModalProps {
  opened: boolean;
  onClose: () => void;
  invoice: {
    vendor: string;
    id: string;
    amount: string;
    date: string;
    status: string;
    previewUrl?: string; // optional thumbnail / invoice image
  } | null;
}

const VendorModal = ({ opened, onClose, invoice }: VendorModalProps) => {
  if (!invoice) return null;

  const handleDrop = () => {
    // Handle drop logic
  };
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="xl"
      title={
        <Stack gap={8}>
          <Text fw={700} size="28px" className="text-[#111827]">
            Approve Invoice & Generate Voucher
          </Text>
          <Text size="sm" c="dimmed">
            Review invoice details and upload the payment voucher.
          </Text>
        </Stack>
      }
    >
      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Left: Short Invoice Details card */}
        <div className="w-1/2 max-w-[48%]">
          <Text fw={600} mb="sm">
            Invoice Details
          </Text>

          <Card padding="lg" radius="md" className="border border-gray-200">
            <Stack gap="xs">
              <Group justify="apart">
                <Text fw={600}>Vendor Name:</Text>
                <Text>{invoice.vendor}</Text>
              </Group>

              <Group justify="apart">
                <Text fw={600}>Invoice ID:</Text>
                <Text>{invoice.id}</Text>
              </Group>

              <Group justify="apart">
                <Text fw={600}>Amount:</Text>
                <Text>{invoice.amount}</Text>
              </Group>

              <Group justify="apart">
                <Text fw={600}>Date Submitted:</Text>
                <Text>{invoice.date}</Text>
              </Group>

              <Group justify="apart">
                <Text fw={600}>Status:</Text>
                <Text
                  className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {invoice.status}
                </Text>
              </Group>
            </Stack>
          </Card>
        </div>

        {/* Right: Taller card containing small preview card + dropzone */}
        <div className="w-1/2 max-w-[52%]">
          <Group justify="apart" mb="sm">
            <Text fw={600}>Invoice Preview</Text>
            <Group
              gap={6}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              <Eye size={16} />
              <Text size="sm">View</Text>
            </Group>
          </Group>

          <Card
            padding="lg"
            radius="md"
            className="flex h-[520px] flex-col border border-gray-200"
          >
            {/* Dropzone (fills remaining height) */}
            {/* <Dropzone
                            // onDrop={(files) => {
                            //     (files);

                            // }}
                            // onReject={(files) => ("Rejected files", files)}
                            accept={[MIME_TYPES.pdf, MIME_TYPES.png, MIME_TYPES.jpeg]}
                            maxSize={5 * 1024 ** 2}
                            multiple={false}
                            className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-4 w-full flex items-center justify-center cursor-pointer hover:border-blue-400 transition"
                        >
                            {file ? (
                                <Box className="flex items-center justify-between w-full px-3">
                                    <Box className="flex items-center gap-3">
                                        <FileIcon size={18} />
                                        <Text size="sm" fw={500} className="truncate">
                                            {file.name}
                                        </Text>
                                    </Box>

                                    <Button
                                        variant="subtle"
                                        color="red"
                                        size="xs"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFile(null);
                                        }}
                                        leftSection={<X size={16} />}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ) : (
                                <Stack align="center" gap="xs" className="text-gray-500">
                                    <Upload size={24} />
                                    <Text size="sm" fw={500}>
                                        Drag & drop or click to upload voucher
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        PDF, PNG, JPEG (max 5MB)
                                    </Text>
                                </Stack>
                            )}
                        </Dropzone> */}
          </Card>
        </div>
      </div>

      <Box className="rounded-2xl bg-[#fff] p-6 md:p-10">
        <Dropzone
          onDrop={handleDrop}
          onReject={handleDropzoneReject}
          maxSize={5 * 1024 ** 2}
          accept={["text/csv", "application/vnd.ms-excel"]}
        >
          <Stack
            align="center"
            justify="center"
            mih={220}
            style={{ pointerEvents: "none" }}
            className="text-center"
          >
            <Dropzone.Idle>
              <BigFileIcon />
            </Dropzone.Idle>
            <Stack className="gap-2.5">
              <Text className="text-base font-bold text-[#1E1E1E] md:text-xl">
                Choose a CSV file to upload
              </Text>
              <Text className="text-sm font-normal text-[#6B7280] md:text-base">
                File should contain contributor information with proper headers
              </Text>
            </Stack>
            <Text className="flex items-center gap-2.5 rounded-[4px] border border-[#D1D5DB] p-3 text-base font-normal">
              <Box component="span">
                <UploadIcon size={16} />
              </Box>
              Select CSV File
            </Text>
          </Stack>
        </Dropzone>
      </Box>
      <Button
        fullWidth
        radius="xl"
        size="lg"
        styles={{
          root: {
            backgroundColor: "#315CBF", // blue background
            height: "50px", // adjust height
            fontSize: "16px", // text size
            fontWeight: 500,
          },
          label: {
            color: "white", // text color
          },
        }}
      >
        Send Voucher to Vendor
      </Button>
    </Modal>
  );
};

export default VendorModal;
