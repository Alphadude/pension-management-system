"use client";

import { Box, Button, Modal, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { CircleCheck } from "lucide-react";
import { object, string } from "yup";

interface TwoFactorAuthenticationModalProps {
  opened: boolean;
  onClose: () => void;
}

type TwoFactorFormValues = {
  phoneNumber: string;
  code: string;
};

const initialValues: TwoFactorFormValues = {
  phoneNumber: "",
  code: "",
};
const validationSchema = object({
  phoneNumber: string().required("Phone number is required"),
  code: string()
    .required("Code is required")
    .matches(/^\d{6}$/, "Code must be exactly 6 digits"),
});

const TwoFactorAuthenticationModal = ({
  opened,
  onClose,
}: TwoFactorAuthenticationModalProps) => {
  const form = useForm<TwoFactorFormValues>({
    initialValues,
    validate: yupResolver(validationSchema),
  });

  const handleSubmit = (values: TwoFactorFormValues) => {
    console.warn("Phone Number:", values.phoneNumber);
    console.warn("Verification Code:", values.code);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Verify Phone Number"
      centered
      size="md"
      className="font-[inter]"
      classNames={{
        title: "text-[20px] font-semibold text-black-900",
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text className="text-sm text-gray-600">
          We’ll send a verification code to your phone number.
        </Text>

        <label className="mb-1 block pt-2 font-[poppins] text-[14px] text-[Dark]">
          Phone Number
        </label>
        <TextInput
          type="tel"
          placeholder="+234908734543"
          {...form.getInputProps("phoneNumber")}
          className="mb-2"
        />

        <Text className="mt-2 font-[poppins] text-[14px] text-[#6B7280]">
          Enter your phone number including country code. We’ll send
          verification codes to this number.
        </Text>

        <Box className="mt-4 mb-4 rounded-md border border-gray-300 p-3 text-sm">
          <Box className="mb-4 flex items-start gap-2">
            <CircleCheck className="mt-1 text-[#2E5AAC]" size={28} />
            <Text className="mt-1.5 font-[poppins] text-[14px] text-[#6B7280]">
              We’ve sent a 6-digit verification code to{" "}
              <span className="font-medium text-blue-600">
                {form.values.phoneNumber}
              </span>
              . It may take a few minutes to arrive.
            </Text>
          </Box>

          <label className="mb-1 block pt-2 font-[poppins] text-[14px] text-[Dark]">
            Verification Code
          </label>
          <TextInput
            type="text"
            placeholder="Enter 6-digit code"
            {...form.getInputProps("code")}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          radius="md"
          className="bg-[#2E5AAC] py-2 font-[poppins] text-[16px] font-medium text-[#FFFFFF]"
        >
          Verify
        </Button>

        <Text className="mt-3 text-center font-[poppins] text-[14px]">
          Resend in <span className="font-medium text-blue-600">59s</span>
        </Text>
      </form>
    </Modal>
  );
};

export default TwoFactorAuthenticationModal;
