import type { Metadata } from "next";
import OtpVerificationClient from "./components/otp-verification-client";

export const metadata: Metadata = {
  title: "OTP Verification",
};

const OTPVerificationPage = () => {
  return <OtpVerificationClient />;
};

export default OTPVerificationPage;
