import { CalendarIcon } from "@/components/icons/calendar-icon";
import { DownloadIcon } from "@/components/icons/download-icon";
import { Box, Button, Modal, Select, Text } from "@mantine/core";
import {} from "lucide-react";

interface ModalProps {
  opened: boolean;
  close: () => void;
}

const data = [
  {
    report_period: "January - March 2023",
    file_size: "245 KB",
  },
  {
    report_period: "April - June 2023",
    file_size: "312 KB",
  },
  {
    report_period: "July - September 2023",
    file_size: "198 KB",
  },
];

const PensionStatementModal = ({ opened, close }: ModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Pension Statements"
      className="font-[poppins]"
      classNames={{
        content: "rounded-[16px]",
        header: "px-[25px] pt-10 pb-[6px]",
        body: "px-[25px] pb-10",
        title:
          "text-base md:text-xl font-semi-bold md:font-bold text-[#1E1E1E]",
      }}
    >
      <Box className="flex flex-col gap-4">
        <Select
          classNames={{
            wrapper: "w-[88px] h-[32px]",
            label: "font-normal text-xs md:text-sm",
            input: "px-1 py-[1.5px] text-[10px] md:text-sm text-[#1E1E1E]",
          }}
          label="Select Year"
          placeholder="2025"
          data={["2025", "2024", "2023", "2022"]}
        />
        <Box className="flex flex-col gap-4">
          {data.map((item, index) => {
            return (
              <Box
                key={`data-${index}`}
                className="flex w-full items-center justify-between rounded-[8px] border border-[#6B72801A] px-4 py-2"
              >
                <Box className="flex items-center gap-2">
                  <CalendarIcon />
                  <Box>
                    <Text className="text-xs font-normal text-[#1E1E1E] md:text-sm">
                      {item.report_period}
                    </Text>
                    <Text className="text-xs text-[10px] font-normal text-[#6B7280]">
                      {item.file_size}
                    </Text>
                  </Box>
                </Box>
                <Button
                  classNames={{
                    label: "flex items-center gap-1",
                  }}
                  className="bg-transparent text-[11px] font-normal text-[#2E5AAC] md:text-sm"
                >
                  <DownloadIcon color="#2E5AAC" /> Download
                </Button>
              </Box>
            );
          })}
          <Text className="text-[10px] font-normal text-[#6B7280] md:text-xs">
            Statements are generated quarterly and available for download in PDF
            format. For statements older than 3 years, please contact support.
          </Text>
        </Box>
      </Box>
    </Modal>
  );
};

export default PensionStatementModal;
