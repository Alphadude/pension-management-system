import { Box, Stack, Text } from "@mantine/core";

const AccountManagementPage = () => {
  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Box>
          <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
            Account Management
          </Text>
          <Text className="text-sm font-normal text-[#6B7280] md:text-base">
            {" "}
            System operational • Manage accountant features here
          </Text>
        </Box>
      </Stack>

      {/* Placeholder for future Account Management Tables/Features */}
      <Box className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
        <Text className="text-gray-500">
          Account Management Features Coming Soon
        </Text>
      </Box>
    </Stack>
  );
};

export default AccountManagementPage;
