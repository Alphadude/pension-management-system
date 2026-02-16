import type { Metadata } from "next";
import VerifyLoginOTPClient from "./components/verify-login-otp-client";

export const metadata: Metadata = {
  title: "OTP Verification",
};

const VerifyLoginOTP = () => {
  return <VerifyLoginOTPClient />;
};

export default VerifyLoginOTP;
