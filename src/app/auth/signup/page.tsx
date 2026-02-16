import type { Metadata } from "next";
import SignupPage from "./components/signup-client-page";

export const metadata: Metadata = {
  title: "Sign up",
};

const page = () => {
  return <SignupPage />;
};

export default page;
