import type { Metadata } from "next";
import ResetPasswordClient from "./components/reset-password-client";

export const metadata: Metadata = {
  title: "Reset Password",
};

const LoginPage = () => {
  return <ResetPasswordClient />;
};

export default LoginPage;
