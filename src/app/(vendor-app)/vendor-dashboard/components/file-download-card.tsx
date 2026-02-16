import { CalendarIcon } from "@/components/icons/calendar-icon";
import { DownloadOutlineIcon } from "@/components/icons/download-outline-icon";
import { Flex, Stack, Text } from "@mantine/core";

type Props = {
  dateRange: string;
  fileSize: string;
};

const FileDownloadCard = ({ dateRange, fileSize }: Props) => {
  return (
    <Flex className="justify-between gap-x-2 rounded-[12px] border border-[#6B72801A] px-3 py-1.5">
      <Flex className="gap-x-[6px] sm:gap-x-2">
        <CalendarIcon />
        <Stack gap={3}>
          <Text className="font-poppins sm:leading:[17px] text-xs leading-[17px] font-normal sm:text-sm">
            {dateRange}
          </Text>
          <Text className="text-[10px] leading-[13px] text-[#6B7280] sm:text-xs sm:leading-[17px]">
            {fileSize}
          </Text>
        </Stack>
      </Flex>
      <button className="flex cursor-pointer items-center gap-x-[3px]">
        <DownloadOutlineIcon />
        <Text className="text-primary text-[11px] leading-[13px] font-normal sm:text-sm sm:leading-[17px]">
          Download
        </Text>
      </button>
    </Flex>
  );
};

export default FileDownloadCard;
