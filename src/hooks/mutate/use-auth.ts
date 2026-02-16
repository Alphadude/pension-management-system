"use client";

import { toast } from "@/components/ui/toast";
import { env } from "@/env";
import { routes } from "@/lib/routes";
import apis from "@/services/api-services";
import type {
  ForgetPasswordFormValues,
  ForgetPasswordResponse,
  LoginFormValues,
  LoginOtpVerificationResponse,
  LoginResponseValue,
  OtpVerificationResponse,
  ResetPasswordFormValues,
  ResetPasswordResponse,
  signupResponse,
  UpdatePasswordFormValues,
  UpdatePasswordResponse,
  vendorSignupFormValues,
  VerifyOtpFormValues,
} from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ErrorResponse {
  message: string;
}

export const useAuth = (searchParams?: URLSearchParams) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalOpened, setIsErrorModalOpened] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const apiUrl = `${env.NEXT_PUBLIC_API_URL}/users/login`;
      const res = await axios.post(apiUrl, values);
      return res.data as LoginResponseValue;
    },
    onSuccess: async (data, variables) => {
      const callbackUrl =
        searchParams?.get("callbackUrl") ?? routes.vendorDashboard.root;
      if (data?.status === "2fa_required") {
        const params = new URLSearchParams({
          email: variables.email,
          redirect: routes.auth.verifyLoginOtp,
        });
        toast({
          message: "OTP sent to your email. Please verify.",
          variant: "info",
        });
        router.push(`${routes.auth.verifyLoginOtp}?${params.toString()}`);
      } else if (data.status === "success") {
        await signIn("credentials", {
          email: variables.email,
          password: variables.password,
          redirect: false,
          callbackUrl,
        });
        toast({
          message: "Sign In Successful",
          variant: "success",
        });
        router.push(callbackUrl);
      } else {
        setIsErrorModalOpened(true);
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error("Login Error:", error);
      setIsErrorModalOpened(true);
    },
  });

  const onLogin = (values: LoginFormValues) => {
    setIsLoading(true);
    loginMutation.mutate(values, {
      onSettled: () => setIsLoading(false),
    });
  };

  return {
    isLoading,
    onLogin,
    isErrorModalOpened,
    closeErrorModal: () => setIsErrorModalOpened(false),
  };
};

export const useVerifyLoginOtp = () => {
  const router = useRouter();
  return useMutation<
    LoginOtpVerificationResponse,
    AxiosError<ErrorResponse>,
    VerifyOtpFormValues
  >({
    mutationFn: async (
      data: VerifyOtpFormValues,
    ): Promise<LoginOtpVerificationResponse> => {
      const res = await apis.auth.verifyLoginOtp(data);
      return res.data as LoginOtpVerificationResponse;
    },
    onSuccess: async (data) => {
      await signIn("credentials", {
        email: data.user.email,
        password: "2fa_complete",
        user: data.user,
        redirect: false,
      });
      if (data.user.role === "vendor") {
        router.push(routes.vendorDashboard.root);
      } else {
        router.push(routes.dashboard.dashboard);
      }
      toast({
        message: "Sign In Successful",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        message: `${error.response?.data?.message}`,
        variant: "error",
      });
    },
  });
};

export const useSignup = () => {
  const router = useRouter();
  return useMutation<signupResponse, AxiosError<ErrorResponse>, FormData>({
    mutationFn: async (data: FormData): Promise<signupResponse> => {
      const res = await apis.auth.signup(data);
      return res.data as signupResponse;
    },
    onSuccess: () => {
      router.push(routes.auth.login);
      toast({
        message: "Sign Up Successful",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        message: `${error?.response?.data?.message}`,
        variant: "error",
      });
    },
  });
};

export const useVendorSignup = () => {
  const router = useRouter();
  return useMutation<
    vendorSignupFormValues,
    AxiosError<ErrorResponse>,
    FormData
  >({
    mutationFn: async (data: FormData): Promise<vendorSignupFormValues> => {
      const res = await apis.auth.vendorSignup(data);
      return res.data as vendorSignupFormValues;
    },
    onSuccess: () => {
      router.push(routes.auth.login);
      toast({
        message: "Sign Up Successful",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        message: `${error?.response?.data?.message}`,
        variant: "error",
      });
    },
  });
};

export const useResetPassword = (resetPasswordToken: string) => {
  const router = useRouter();
  return useMutation<
    ResetPasswordResponse,
    AxiosError<ErrorResponse>,
    ResetPasswordFormValues
  >({
    mutationFn: async (data: ResetPasswordFormValues) => {
      const res = await apis.auth.resetPassword({
        ...data,
        resetPasswordToken: resetPasswordToken,
      });

      return res?.data as ResetPasswordResponse;
    },
    onSuccess: () => {
      router.push(routes.auth.login);
      toast({
        message: "Password reset successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        message: `${error?.response?.data?.message}`,
        variant: "error",
      });
    },
  });
};

export const useVerifyOtp = (redirectUrl: string) => {
  const router = useRouter();
  return useMutation<
    OtpVerificationResponse,
    AxiosError<ErrorResponse>,
    VerifyOtpFormValues
  >({
    mutationFn: async (
      data: VerifyOtpFormValues,
    ): Promise<OtpVerificationResponse> => {
      const res = await apis.auth.verifyOtp(data);

      return res.data as OtpVerificationResponse;
    },
    onSuccess: (data) => {
      const params = new URLSearchParams({
        resetPasswordToken: data?.resetPasswordToken,
      });
      router.replace(`${redirectUrl}?${params.toString()}`);
      toast({
        message: data?.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        message: `${error.response?.data?.message}`,
        variant: "error",
      });
    },
  });
};

export const useUpdatePassword = (cb: VoidFunction) => {
  return useMutation<
    UpdatePasswordResponse,
    AxiosError<ErrorResponse>,
    UpdatePasswordFormValues
  >({
    mutationFn: async (
      data: UpdatePasswordFormValues,
    ): Promise<UpdatePasswordResponse> => {
      const res = await apis.auth.updatePassword(data);
      return res.data as UpdatePasswordResponse;
    },
    onSuccess: () => {
      cb?.();
      toast({
        message: "Password updated successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        message: `${error.response?.data?.message}`,
        variant: "error",
      });
    },
  });
};

export const useForgetPassword = () => {
  return useMutation<
    ForgetPasswordResponse,
    AxiosError<ErrorResponse>,
    ForgetPasswordFormValues
  >({
    mutationFn: async (data: {
      email: string;
    }): Promise<ForgetPasswordResponse> => {
      const res = await apis.auth.forgetPassword(data);
      return res.data as ForgetPasswordResponse;
    },
    onSuccess: () => {
      toast({
        message: "OTP code sent to email successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        message: `${error?.response?.data?.message}`,
        variant: "error",
      });
    },
  });
};
