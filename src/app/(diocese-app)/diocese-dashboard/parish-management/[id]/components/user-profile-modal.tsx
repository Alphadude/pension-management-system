import { useGetUser } from "@/hooks/query/use-user";
import { Avatar, Badge, Box, Group, Modal, Stack, Text } from "@mantine/core";
import { format } from "date-fns";
import { Calendar, Phone } from "lucide-react";
import MonthlyContributionsModalTable from "./monthly-contribution-modal-table";

interface Props {
  opened: boolean;
  close: VoidFunction;
  contributorId: string;
  userId: string;
}

const UserProfileModal = ({ opened, close, contributorId, userId }: Props) => {
  const { data: userData } = useGetUser(userId);
  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={close}
        title="View Contributor Profile"
        classNames={{
          title: "text-xl font-bold text-[#1E1E1E]",
        }}
      >
        <Stack gap={24}>
          <Stack gap={24}>
            <Group align="center" gap={4}>
              <Avatar
                src={
                  typeof userData?.doc?.user?.profilePhoto === "string"
                    ? userData?.doc?.user?.profilePhoto
                    : userData?.doc?.user?.profilePhoto?.url
                }
                alt="John Michael Smith"
                radius="xl"
                className="h-[28px] w-[28px] md:h-[38px] md:w-[38px]"
              />
              <Box>
                <Text fw={700}>
                  {userData?.doc?.user?.firstName ?? ""}{" "}
                  {userData?.doc?.user?.lastName ?? ""}
                </Text>
                <Text fw={400} size="sm" c="dimmed">
                  {userData?.doc?.user?.email ?? ""}
                </Text>
              </Box>
              <Badge
                color="green"
                variant="light"
                ml="auto"
                className="normal-case"
              >
                {userData?.doc?.user?.status}
              </Badge>
            </Group>
            <Group justify="space-between" align="center" className="w-full">
              <Group gap="xs" className="flex items-center">
                <Phone size={18} className="text-gray-500" />
                <Text size="sm" className="text-[#6B7280]">
                  {userData?.doc?.user?.phoneNumber}
                </Text>
              </Group>
              <Group gap="xs" className="flex items-center">
                <Calendar size={18} className="text-gray-500" />
                <Text size="sm" className="text-[#6B7280]">
                  Joined:{" "}
                  {userData?.doc?.user?.createdAt
                    ? format(userData?.doc?.user?.createdAt, "MMM d, yyyy")
                    : ""}
                </Text>
              </Group>
            </Group>
            <Box className="space-y-2 rounded-lg bg-[#f5f7fb] p-3">
              <Box className="flex justify-between">
                <Box component="span">Last Known Salary:</Box>
                <Box component="span" className="font-semibold text-[#2E5AAC]">
                  {"₦0.00"}
                </Box>
              </Box>
              <Box className="flex justify-between">
                <Box component="span">Expected 5% Deduction:</Box>
                <Box component="span" className="font-semibold text-[#13A382]">
                  ₦5,000.00
                </Box>
              </Box>
            </Box>
          </Stack>
          <MonthlyContributionsModalTable contributorId={contributorId} />
        </Stack>
      </Modal>
    </>
  );
};

export default UserProfileModal;
