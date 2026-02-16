"use client";

import AuthFormContainer from "@/components/layout/auth-form-container";

import { useAuth } from "@/hooks/mutate/use-auth";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { routes } from "@/lib/routes";
import type { LoginFormValues } from "@/types/common";
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

import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { object, string } from "yup";
import LoginErrorModal from "./login-error-modal";
import TwoFactorAuthenticationModal from "./two-factor-authentication-modal";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const loginSchema = object({
  email: string()
    .email("Email address is incorrect")
    .required("Email address is required"),
  password: string().trim().required("Password is required"),
});

const LoginClientPage = () => {
  const [opened, { close }] = useDisclosure(false);
  const { Icon, toggle, type } = usePasswordVisibility();
  const { isLoading, onLogin, isErrorModalOpened, closeErrorModal } = useAuth();
  const form = useForm({
    initialValues,
    validate: yupResolver(loginSchema),
  });

  const handleSubmitForm = (values: LoginFormValues) => {
    onLogin(values);
  };

  return (
    <>
      <LoginErrorModal opened={isErrorModalOpened} onClose={closeErrorModal} />
      <TwoFactorAuthenticationModal onClose={close} opened={opened} />
      <AuthFormContainer>
        <Box>
          <Text className="font-inter text-[28px] leading-12 font-bold text-[#1E1E1E]">
            Welcome Back
          </Text>
          <Text className="text-sm leading-[17px] font-normal text-[#6B7280]">
            Sign in to your account
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
              <TextInput
                type={type}
                label="Password"
                placeholder="Enter your password"
                {...form.getInputProps("password")}
                rightSection={
                  <ActionIcon variant="transparent" onClick={toggle}>
                    <Icon color="#1E1E1E" size={16} />
                  </ActionIcon>
                }
              />
              <Group className="justify-end">
                <Link
                  href={routes.auth.forgotPassword}
                  className="text-primary font-inter text-sm leading-[17px] font-normal"
                >
                  Forgot password?
                </Link>
              </Group>
            </Stack>
            <Button type="submit" loading={isLoading}>
              Login
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
    </>
  );
};

export default LoginClientPage;
