import { PurpleChurchIcon } from "@/components/icons/purple-church-icon";
import { Box, Flex, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ParishModal from "./components/parish-modal";

const Parishes = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Stack bg={"#fff"} className="rounded-[12px]" gap={16} p={20} mt={16}>
        <Stack gap={4}>
          <Text className="text-2xl font-bold text-[#1E1E1E]">
            Parish Directory
          </Text>
          <Text className="text-base font-normal text-[#6B7280]">
            Complete list of parishes in this diocese
          </Text>
        </Stack>
        <Stack gap={12}>
          <Box
            onClick={open}
            component="button"
            className="w-full rounded-[8px] border border-[#D1D5DB66] p-[17px]"
          >
            <Flex gap={16} align="center" direction={"row"}>
              <PurpleChurchIcon />
              <Text>Holy Cross Cathedral</Text>
            </Flex>
          </Box>
        </Stack>
      </Stack>
      <ParishModal opened={opened} close={close} />
    </>
  );
};

export default Parishes;
