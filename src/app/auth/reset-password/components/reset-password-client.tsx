"use client";
import AuthFormContainer from "@/components/layout/auth-form-container";
import { useResetPassword } from "@/hooks/mutate/use-auth";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { routes } from "@/lib/routes";
import type { ResetPasswordFormValues } from "@/types/common";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { object, ref, string } from "yup";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const resetPasswordSchema = object({
  password: string()
    .trim()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase , one lowercase and one number",
    ),
  confirmPassword: string()
    .trim()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Password must match"),
});
const ResetPasswordClient = () => {
  const passwordVisibility = usePasswordVisibility();
  const confirmPasswordVisibility = usePasswordVisibility();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get("resetPasswordToken");
  if (!resetPasswordToken) {
    router.push(routes.auth.login);
  }
  const { mutate, isPending } = useResetPassword(resetPasswordToken!);
  const form = useForm({
    initialValues,
    validate: yupResolver(resetPasswordSchema),
  });

  const handleSubmitForm = (values: ResetPasswordFormValues) => {
    mutate(values);
  };
  return (
    <AuthFormContainer>
      <Box>
        <Text className="font-inter text-[28px] leading-12 font-bold text-[#1E1E1E]">
          Set New Password
        </Text>
        <Text className="text-sm leading-[17px] font-normal text-[#6B7280]">
          Enter your new password to complete the reset process
        </Text>
      </Box>
      <form onSubmit={form.onSubmit(handleSubmitForm)} className="mt-10">
        <Stack gap={24}>
          <Stack gap={16}>
            <TextInput
              label="New Password"
              placeholder="Enter your new password"
              type={passwordVisibility.type}
              {...form.getInputProps("password")}
              rightSection={
                <ActionIcon
                  variant="transparent"
                  onClick={passwordVisibility.toggle}
                >
                  <passwordVisibility.Icon color="#1E1E1E" size={16} />
                </ActionIcon>
              }
            />
            <TextInput
              label="Confirm New Password"
              placeholder="Confirm your new password"
              type={confirmPasswordVisibility.type}
              {...form.getInputProps("confirmPassword")}
              rightSection={
                <ActionIcon
                  variant="transparent"
                  onClick={confirmPasswordVisibility.toggle}
                >
                  <confirmPasswordVisibility.Icon color="#1E1E1E" size={16} />
                </ActionIcon>
              }
            />
          </Stack>
          <Button type="submit" loading={isPending}>
            Save New Password
          </Button>
          <Group gap={8} justify="center" align="center">
            <Text className="font-poppins text-sm leading-[17px] text-[#1E1E1E]">
              Remember old password?
            </Text>
            <Link
              href={routes.auth.login}
              className="text- primary font-inter text-sm leading-[17px] font-normal"
            >
              Sign In
            </Link>
          </Group>
        </Stack>
      </form>
    </AuthFormContainer>
  );
};

export default ResetPasswordClient;
