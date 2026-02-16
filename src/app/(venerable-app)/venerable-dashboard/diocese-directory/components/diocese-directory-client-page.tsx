import { Box, Group, Stack, Text } from "@mantine/core";
import DioceseInformationTable from "./diocese-information-table";

const DioceseDirectoryClientPage = () => {
  return (
    <Stack gap={16} bg={"#fff"} p={16} className="rounded-[16px]">
      <Group justify="space-between" align="center">
        <Box>
          <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
            Venerable Dashboard
          </Text>
          <Text className="text-sm font-normal text-[#6B7280] md:text-base">
            System operational • Last updated: 20:21:23
          </Text>
        </Box>
      </Group>
      <Stack gap={8}>
        <Text className="text-xl font-bold text-[#1F2937]">
          Diocese Directory
        </Text>
        <Text className="text-sm font-normal text-[#1E1E1E]">
          Comprehensive overview of all dioceses in the system
        </Text>
      </Stack>
      <DioceseInformationTable />
    </Stack>
  );
};

export default DioceseDirectoryClientPage;
