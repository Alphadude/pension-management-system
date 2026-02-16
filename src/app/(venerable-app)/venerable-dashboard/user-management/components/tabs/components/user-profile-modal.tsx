"use client";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Group,
  Modal,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";

interface Props {
  opened: boolean;
  onClose: () => void;
}

// const documents = [
//     {
//         name: "Birth Certificate",
//         type: "PDF",
//         size: "1.2 MB",
//         date: "2025-04-15",
//         status: "Verified",
//     },
//     {
//         name: "National Identity Card",
//         type: "PDF",
//         size: "1.2 MB",
//         date: "2025-04-15",
//         status: "Verified",
//     },
//     {
//         name: "First School Leaving Certificate",
//         type: "PDF",
//         size: "1.2 MB",
//         date: "2025-04-15",
//         status: "Verified",
//     },
//     {
//         name: "Baptism Certificate",
//         type: "PDF",
//         size: "1.2 MB",
//         date: "2025-04-15",
//         status: "Verified",
//     },
// ];

export default function UserProfileModal({ opened, onClose }: Props) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={"80%"}
      radius={16}
      centered
      classNames={{
        content: "rounded-[16px] p-0",
        header: "px-6 pt-6 pb-0",
        body: "px-6 pb-6 pt-0",
      }}
    >
      <Stack gap={16}>
        <Group justify="space-between" align="center" className="mb-2">
          <Group gap={12}>
            <Avatar size={56} radius={48} />
            <Box>
              <Text className="text-3xl font-bold text-[#1E1E1E]">
                User Profile
              </Text>
              <Text className="text-sm font-normal text-[#6B7280]">
                Complete profile information for John Michael Smith
              </Text>
            </Box>
          </Group>
        </Group>
        <Tabs
          variant="pills"
          defaultValue="contributors"
          radius="xs"
          color="#fff"
          classNames={{
            root: "px-2 py-[6px]",
            tabLabel: "text-base text-normal text-[#6B7280] text-center",
            tab: "px-[147px] rounded-[8px] flex justify-center",
            list: "bg-[#f2f3f6] border border-[#6B72800D] rounded-[8px]",
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="contributors">Profile</Tabs.Tab>
            <Tabs.Tab value="messages">Pensioners</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="contributors" mt={20}>
            {/* Personal Info */}
            <Text fw={600} size="lg" mb="sm">
              Personal Information
            </Text>

            <Group grow mb="md" align="flex-start">
              <Stack gap={4}>
                <Text size="sm" c="dimmed">
                  Full Name
                </Text>
                <Text>John Michael Smith</Text>

                <Text size="sm" c="dimmed">
                  Email
                </Text>
                <Text>john.smith@email.com</Text>

                <Text size="sm" c="dimmed">
                  Gender
                </Text>
                <Text>Female</Text>
              </Stack>

              <Stack gap={4}>
                <Text size="sm" c="dimmed">
                  User ID
                </Text>
                <Text>USR-001</Text>

                <Text size="sm" c="dimmed">
                  Phone
                </Text>
                <Text>+1 (555) 123-4567</Text>

                <Text size="sm" c="dimmed">
                  Age
                </Text>
                <Text>54</Text>
              </Stack>
            </Group>

            <Divider />

            {/* Parish & Status */}
            <Text fw={600} size="lg" mt="md" mb="sm">
              Parish & Status
            </Text>

            <Group grow align="flex-start">
              <Stack gap={4}>
                <Text size="sm" c="dimmed">
                  Parish
                </Text>
                <Text>St. Mary’s Cathedral</Text>

                <Text size="sm" c="dimmed">
                  Join Date
                </Text>
                <Text>Apr 15, 2025</Text>
              </Stack>

              <Stack gap={4}>
                <Text size="sm" c="dimmed">
                  Status
                </Text>
                <Badge color="green" variant="light">
                  Retired
                </Badge>

                <Text size="sm" c="dimmed">
                  Years in Service
                </Text>
                <Text>33 Years</Text>
              </Stack>
            </Group>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Modal>
  );
}
