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

      <Box className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
          <Text className="text-sm font-medium text-[#6B7280]">
            Total Cash Balance
          </Text>
          <Text className="mt-2 text-2xl font-bold text-[#111827]">₦0.00</Text>
        </Box>
        <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
          <Text className="text-sm font-medium text-[#6B7280]">
            Total Bank Balance
          </Text>
          <Text className="mt-2 text-2xl font-bold text-[#111827]">₦0.00</Text>
        </Box>
        <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
          <Text className="text-sm font-medium text-[#6B7280]">
            Total Income (YTD)
          </Text>
          <Text className="mt-2 text-2xl font-bold text-green-600">₦0.00</Text>
        </Box>
        <Box className="rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]">
          <Text className="text-sm font-medium text-[#6B7280]">
            Total Expenses (YTD)
          </Text>
          <Text className="mt-2 text-2xl font-bold text-red-600">₦0.00</Text>
        </Box>
      </Box>

      {/* Placeholder for Quick Actions or Recent Activity */}
      <Box className="mt-6 flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
        <Text className="text-gray-500">
          Accounting Overview Charts Coming Soon
        </Text>
      </Box>
    </Stack>
  );
};

export default AccountManagementPage;
