import { Avatar, Group, Text } from "@mantine/core";
import { useSession } from "next-auth/react";

const VendorUserInfoDisplay = () => {
  const { data: sessionData } = useSession();
  return (
    <Group gap={8}>
      <Avatar
        src={sessionData?.user?.profilePhoto?.url}
        color="initials"
        radius="xl"
        name={`${sessionData?.user.firstName ?? ""} ${sessionData?.user.lastName ?? ""}`}
        key={sessionData?.user?.profilePhoto?.url ?? "no-avatar"}
      />
      <Text className="text-sm font-medium text-[#374151]">
        {`${sessionData?.user.firstName ?? ""} ${sessionData?.user.lastName ?? ""}`}
      </Text>
    </Group>
  );
};

export default VendorUserInfoDisplay;
