import { Avatar, Group, Text } from "@mantine/core";
import { useSession } from "next-auth/react";

const UserInfoDisplay = () => {
  const { data: sessionData } = useSession();
  return (
    <Group gap={8}>
      <Avatar
        key={sessionData?.user?.profilePhoto?.url ?? "no-avatar"}
        color="initials"
        src={sessionData?.user?.profilePhoto?.url}
        radius="xl"
        name={`${sessionData?.user.firstName ?? ""} ${sessionData?.user.lastName ?? ""}`}
      />
      <Text className="text-sm font-medium text-[#374151]">
        {`${sessionData?.user.firstName ?? ""} ${sessionData?.user.lastName ?? ""}`}
      </Text>
    </Group>
  );
};

export default UserInfoDisplay;
