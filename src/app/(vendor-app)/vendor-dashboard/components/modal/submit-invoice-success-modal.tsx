import { SuccessFilledIcon } from "@/components/icons/success-filled-icon";
import { Box, Button, Modal, Stack, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
};

const SubmitInvoiceSuccessModal = ({ opened, close }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      radius={16}
      withCloseButton={false}
      classNames={{
        body: "py-[33px] px-[11px] sm:px-7 sm:py-10",
      }}
    >
      <SuccessFilledIcon className="mx-auto" />
      <Stack
        align="center"
        className="gap-y-[13px] text-center text-xs leading-[14px] text-[#4A4A4A] sm:gap-y-4"
      >
        <Text className="text-primary text-[27px] leading-10 font-bold sm:text-[32px] sm:leading-12">
          Submission Successful!
        </Text>
        <Text inherit className="font-normal sm:text-sm sm:leading-[17px]">
          Your invoice has been submitted successfully and is now under review.
          You will receive an email confirmation shortly.
        </Text>
        <Box className="">
          <Text inherit className="font-bold sm:text-xl sm:leading-12">
            What&apos;s Next?
          </Text>
          <Text inherit className="sm:text-sm sm:leading-[17px]">
            {" "}
            Our team will review your your invoice within 3-5 business days. You
            will be notified via email once the review is complete
          </Text>
        </Box>
      </Stack>
      <Button
        fullWidth
        onClick={close}
        className="mx-auto mt-[22px] max-w-[323px]"
      >
        Close
      </Button>
    </Modal>
  );
};

export default SubmitInvoiceSuccessModal;
