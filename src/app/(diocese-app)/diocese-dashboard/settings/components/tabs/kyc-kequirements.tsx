import { Box, Button, Group, Stack, Switch, Text } from "@mantine/core";

const KycRequirements = () => {
  return (
    <Stack className="m-6" gap={20}>
      <Box>
        <Text className="text-xl font-semibold text-[#000000]">
          KYC Document Requirements
        </Text>
        <Text className="text-base font-normal text-[#6B7280]">
          Configure required documents for contributor enrolment and
          verification
        </Text>
      </Box>
      <>
        <Box className="flex items-center justify-between rounded-[8px] border-l-[5px] border-[#2E5AAC] bg-[#f9fafc] px-4 py-6">
          <Stack gap={12}>
            <Text className="text-lg font-semibold text-[#1E1E1E]">
              Birth Certificate
            </Text>
            <Stack gap={4}>
              <Text className="text-base font-normal text-[#6B7280]">
                Valid driver’s license, passport, or national ID card
              </Text>
              <Group>
                <Text className="text-xs font-normal text-[#6B7280]">
                  File types, PDF, JPG, PNG
                </Text>
                <Text className="text-xs font-normal text-[#6B7280]">
                  Max size: 5mb
                </Text>
              </Group>
            </Stack>
          </Stack>
          <Group align="center" className="gap-[20px]">
            <Switch withThumbIndicator={false} />
            <Group align="center" gap={8}>
              <Button
                classNames={{
                  root: "!w-[46px] !h-[28px] !px-[10px] !py-[2px] !rounded-[4px]",
                  label: "font-normal text-sm",
                }}
                variant="outline"
              >
                Edit
              </Button>
              <Button
                classNames={{
                  root: "border border-[#F44336] !w-[66px] !h-[28px] !px-[10px] !py-[2px] !rounded-[4px]",
                  label: "font-normal text-sm text-[#F44336]",
                }}
                variant="outline"
              >
                Delete
              </Button>
            </Group>
          </Group>
        </Box>
      </>
    </Stack>
  );
};

export default KycRequirements;
