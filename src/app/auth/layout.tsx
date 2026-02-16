import AuthLayout from "@/components/layout/auth-layout";
import type { PropsWithChildren } from "react";

const AuthLayouts = ({ children }: PropsWithChildren) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AuthLayouts;
