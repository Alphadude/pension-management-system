import type { Metadata } from "next";
import ForgotPasswordClient from "./components/forgot-password-client";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const LoginPage = () => {
  return <ForgotPasswordClient />;
};

export default LoginPage;
