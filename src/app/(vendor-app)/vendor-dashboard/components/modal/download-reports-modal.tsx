import { Modal, Select, Stack, Text } from "@mantine/core";
import FileDownloadCard from "../file-download-card";

type Props = {
  opened: boolean;
  close: () => void;
};

const DownloadReportsModal = ({ opened, close }: Props) => {
  return (
    <Modal
      opened={opened}
      radius={16}
      centered
      onClose={close}
      title={
        <Text className="text-base leading-[17px] font-bold text-[#1E1E1E] sm:text-xl sm:leading-12">
          Reports
        </Text>
      }
    >
      <Stack className="gap-y-3 sm:gap-y-4">
        <Select
          label="Select Year"
          data={["2025", "2024", "2023", "2022"]}
          value={"2025"}
          classNames={{
            input: "h-7",
            root: "w-[114px]",
          }}
        />
        <FileDownloadCard dateRange="January - March 2023" fileSize="245 KB" />
        <FileDownloadCard dateRange="April - June 2023" fileSize="245 KB" />
        <FileDownloadCard dateRange="July - August 2023" fileSize="245 KB" />
        <FileDownloadCard
          dateRange="September - December 2023"
          fileSize="245 KB"
        />
        <Text className="text-[10px] leading-3 font-normal text-[#6B7280] sm:text-xs sm:leading-[17px]">
          Statements are generated quarterly and available for download in PDF
          format. For statements older than 3 years, please contact support.
        </Text>
      </Stack>
    </Modal>
  );
};

export default DownloadReportsModal;
