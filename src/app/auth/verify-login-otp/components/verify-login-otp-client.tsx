"use client";
import { useVerifyLoginOtp } from "@/hooks/mutate/use-auth";
import { routes } from "@/lib/routes";
import type { VerifyOtpFormValues } from "@/types/common";
import { Box, Button, PinInput, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import { object, string } from "yup";

const otpSchema = object({
  email: string().email().required("Email is required"),
  otp: string().required("OTP is required"),
});

const VerifyLoginOTPClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParams = searchParams.get("email");
  const redirectParams = searchParams.get("redirect");

  if (!emailParams || !redirectParams) {
    router.push(routes.auth.login);
  }
  const { mutate, isPending } = useVerifyLoginOtp();
  const initialValues: VerifyOtpFormValues = {
    email: emailParams!,
    otp: "",
  };

  const form = useForm({
    initialValues,
    validate: yupResolver(otpSchema),
  });

  const handleSubmitForm = (values: VerifyOtpFormValues) => {
    mutate({
      email: values.email,
      otp: +values.otp,
    });
  };

  return (
    <Box className="flex h-full w-full flex-col items-center gap-[30px] px-[20px] py-[40px] lg:w-[400px] lg:px-0">
      <Box className="flex flex-col items-center gap-2">
        <Text className="text-[28px] font-bold text-[#1E1E1E] lg:text-[32px]">
          OTP Verification
        </Text>
        <Text className="text-[14px] font-normal text-[#6B7280] lg:text-base">
          Check your email to see the verification code
        </Text>
      </Box>
      <form
        onSubmit={form.onSubmit(handleSubmitForm)}
        className="flex flex-col items-center gap-6"
      >
        <PinInput placeholder="" {...form.getInputProps("otp")} />
        <Button loading={isPending} type="submit" className="w-[392px]">
          Verify
        </Button>
        {/* <Group gap={8} justify="center" align="center">
          <Text className="font-poppins text-sm leading-[17px] text-[#1E1E1E]">
            Resend in
          </Text>
          <Text className="text-primary font-inter text-sm leading-[17px] font-normal">
            00:59
          </Text>
        </Group> */}
      </form>
    </Box>
  );
};

export default VerifyLoginOTPClient;
