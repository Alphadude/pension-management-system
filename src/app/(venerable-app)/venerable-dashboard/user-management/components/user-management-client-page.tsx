"use client";
import {
  Box,
  Button,
  Group,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Search, UserPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminOnboardingModal from "./admin-onboarding-modal";
import {
  isUserManagementStatusTabValid,
  UserManagementStatusTab,
  UserManagementStatusTabConfig,
  type UserManagementStatusTabType,
} from "./extras";
import ContributorsTable from "./tabs/contributors";
import PensionersTable from "./tabs/pensioners";
import TransitionTab from "./transition-tab";

const UserManagementClientPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as UserManagementStatusTabType;

  const activeTab = isUserManagementStatusTabValid(tabParam)
    ? tabParam
    : UserManagementStatusTabConfig?.[0]?.value;

  const handleTabChange = (e: string | null) => {
    if (!e) return;
    const params = new URLSearchParams(searchParams);
    params.set("tab", e);
    router.push(`?${params.toString()}`);
  };

  const [adminModalOpened, { open: openAdminModal, close: closeAdminModal }] =
    useDisclosure(false);

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Venerable Dashboard
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              System operational • Last updated: 20:21:23
            </Text>
          </Box>
          <Button
            leftSection={<UserPlus size={18} />}
            onClick={openAdminModal}
            radius="md"
            className="bg-[#2E5AAC]"
          >
            Onboard Admin
          </Button>
        </Group>
      </Stack>
      <Stack
        bg={"#fff"}
        className="rounded-[12px] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
      >
        <Tabs
          variant="pills"
          value={activeTab}
          onChange={handleTabChange}
          radius="xs"
          color="#fff"
          classNames={{
            root: "py-[6px]",
            tabLabel: "text-base text-normal text-[#6B7280] text-center",
            tab: "p-2 rounded-[8px] flex justify-center",
            list: "bg-[#f2f3f6] border border-[#6B72800D] rounded-[8px]",
          }}
        >
          <Group px={24} justify="space-between" align="center">
            <Box>
              <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[20px] md:leading-12 md:font-bold">
                User Management
              </Text>
              <Text className="text-sm font-normal text-[#6B7280] md:text-base">
                Find and filter contributors by name, ID, parish, diocese or
                status
              </Text>
            </Box>
            <Tabs.List grow>
              {UserManagementStatusTabConfig?.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  {tab?.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Group>
          <Group
            gap={16}
            px={24}
            className="mt-2 mb-5 grid w-full grid-cols-[3fr_1fr_1fr_1fr_1fr]"
          >
            <TextInput
              leftSection={<Search color="#9CA3AF" size={20} />}
              placeholder="Search by user names, emails..."
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
              }}
            />
            <Select
              placeholder="Status"
              classNames={{
                input: "h-[42px] rounded-[8px]",
              }}
            />
            <Select
              placeholder="Role"
              classNames={{
                input: "h-[42px] rounded-[8px]",
              }}
            />
            <Select
              placeholder="Parish"
              classNames={{
                input: "h-[42px] rounded-[8px]",
              }}
            />
            <Select
              placeholder="Diocese"
              classNames={{
                input: "h-[42px] rounded-[8px]",
              }}
            />
          </Group>
          <TransitionTab
            isMounted={activeTab === UserManagementStatusTab.CONTRIBUTOR}
            value={UserManagementStatusTab.CONTRIBUTOR}
          >
            <ContributorsTable />
          </TransitionTab>
          <TransitionTab
            isMounted={activeTab === UserManagementStatusTab.PENSIONERS}
            value={UserManagementStatusTab.PENSIONERS}
          >
            <PensionersTable />
          </TransitionTab>
        </Tabs>
      </Stack>
      <AdminOnboardingModal
        opened={adminModalOpened}
        onClose={closeAdminModal}
      />
    </Stack>
  );
};

export default UserManagementClientPage;
