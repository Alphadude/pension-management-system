import type { Metadata } from "next";
import ProfileClient from "./components/profile-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  return <ProfileClient />;
};

export default ProfilePage;
