import { Box, Button, Modal, Text } from "@mantine/core";
import { Check } from "lucide-react";
interface Props {
  opened: boolean;
  close: () => void;
}

const ContactSupportModal = ({ opened, close }: Props) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="sm"
        classNames={{
          body: "md:p-10 p-[33px]",
          content: "rounded-[13px]",
        }}
      >
        <Box className="flex flex-col items-center gap-[22px] md:gap-[27px]">
          <Box className="flex flex-col gap-[13px] md:gap-4">
            <Box className="flex flex-col items-center gap-1">
              <Box className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#2E5AAC] md:h-[80px] md:w-[80px]">
                <Check color="#fff" size={60} />
              </Box>
              <Text className="text-[26px] leading-10 font-bold text-[#2E5AAC] md:text-[32px] md:leading-12">
                Success
              </Text>
            </Box>
            <Text className="text-[11px] leading-3.5 font-normal text-[#4A4A4A] md:text-[14px] md:leading-4">
              Your message has been sent
            </Text>
          </Box>
          <Button
            className="w-full text-sm font-medium md:text-base"
            onClick={close}
          >
            Continue
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ContactSupportModal;
