import type { Metadata } from "next";
import LoginClientPage from "./components/login-client-page";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return <LoginClientPage />;
};

export default LoginPage;
