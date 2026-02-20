"use client";
import UserFilters from "@/components/ui/user-filters";
import { Box, Group, Select, Stack, Tabs, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DioceseUserManagementStatusTab,
  DioceseUserManagementStatusTabConfig,
  isDioceseUserManagementStatusTabValid,
  type DioceseUserManagementStatusTabType,
} from "./extras";
import ContributorsTable from "./tabs/contributors";
import PensionersTable from "./tabs/pensioners";
import TransitionTab from "./transition-tab";

const DioceseManagementClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get(
    "tab",
  ) as DioceseUserManagementStatusTabType;

  const activeTab = isDioceseUserManagementStatusTabValid(tabParam)
    ? tabParam
    : DioceseUserManagementStatusTabConfig?.[0]?.value;

  const active = DioceseUserManagementStatusTabConfig.find(
    (item) => item.value === activeTab,
  )?.label;

  const handleTabChange = (e: string | null) => {
    if (!e) return;
    const params = new URLSearchParams(searchParams);
    params.set("tab", e);
    router.push(`?${params.toString()}`);
  };

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Welcome, ABC Diocese
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              Manage your diocese information
            </Text>
          </Box>
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
                Manage Diocese Users
              </Text>
              <Text className="text-sm font-normal text-[#6B7280] md:text-base">
                Find and filter contributors by name, ID, parish, diocese or
                status
              </Text>
            </Box>
            <Tabs.List grow>
              {DioceseUserManagementStatusTabConfig?.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  {tab?.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Group>
          <UserFilters>
            <Select
              placeholder="Status"
              label="Status"
              classNames={{
                input: "h-[42px] rounded-[8px]",
              }}
            />
            <Select
              placeholder="Parish"
              label="Parish"
              classNames={{
                input: "h-[42px] rounded-[8px]",
              }}
            />
          </UserFilters>
          <TransitionTab
            isMounted={activeTab === DioceseUserManagementStatusTab.CONTRIBUTOR}
            value={DioceseUserManagementStatusTab.CONTRIBUTOR}
          >
            <ContributorsTable />
          </TransitionTab>
          <TransitionTab
            isMounted={activeTab === DioceseUserManagementStatusTab.PENSIONERS}
            value={DioceseUserManagementStatusTab.PENSIONERS}
          >
            <PensionersTable />
          </TransitionTab>
        </Tabs>
      </Stack>
    </Stack>
  );
};

export default DioceseManagementClient;
