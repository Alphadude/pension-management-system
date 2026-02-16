"use client";

import AuthFormContainer from "@/components/layout/auth-form-container";
import { useForgetPassword } from "@/hooks/mutate/use-auth";
import { routes } from "@/lib/routes";
import type { ForgetPasswordFormValues } from "@/types/common";
import { Box, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { object, string } from "yup";

const initialValues: ForgetPasswordFormValues = {
  email: "",
};

const forgetPasswordSchema = object({
  email: string()
    .email("Email address is incorrect")
    .required("Email address is required"),
});

const ForgotPasswordClient = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useForgetPassword();
  const form = useForm({
    initialValues,
    validate: yupResolver(forgetPasswordSchema),
  });

  const handleSubmitForm = async (values: ForgetPasswordFormValues) => {
    const res = await mutateAsync(values);
    if (res.status === "success") {
      const params = new URLSearchParams({
        email: values.email,
        redirect: routes.auth.resetPassword,
      });
      router.push(`${routes.auth.otp}?${params.toString()}`);
    }
  };
  return (
    <AuthFormContainer>
      <Box>
        <Text className="font-inter text-[28px] leading-12 font-bold text-[#1E1E1E]">
          Forgot Password?
        </Text>
        <Text className="text-sm leading-[17px] font-normal text-[#6B7280]">
          Enter your email to reset your password
        </Text>
      </Box>
      <form onSubmit={form.onSubmit(handleSubmitForm)} className="mt-10">
        <Stack gap={24}>
          <Stack gap={16}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              {...form.getInputProps("email")}
            />
          </Stack>
          <Button type="submit" loading={isPending}>
            Submit
          </Button>
          <Group gap={8} justify="center" align="center">
            <Text className="font-poppins text-sm leading-[17px] text-[#1E1E1E]">
              Don’t have an account?
            </Text>
            <Link
              href={routes.auth.signup}
              className="text-primary font-inter text-sm leading-[17px] font-normal"
            >
              Sign Up
            </Link>
          </Group>
        </Stack>
      </form>
    </AuthFormContainer>
  );
};

export default ForgotPasswordClient;
