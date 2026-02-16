import { useGetVenerableDashboardOverview } from "@/hooks/query/use-venerable";
import { Box, Group, Stack, Tabs, Text } from "@mantine/core";
import { UserStatusTab, UserStatusTabConfig } from "./extras";
import Contributors from "./tabs/contributors";
import Pensioners from "./tabs/pensioners";
import TransitionTab from "./transition-tab";

const colorMap: Record<string, string> = {
  active: "#2E5AAC",
  retired: "#4A90E2",
  deceased: "#7BB3F0",
};

const UserStatusStats = () => {
  const { data, isLoading } = useGetVenerableDashboardOverview();

  return (
    <Box className="rounded-[12px] bg-[#fff] p-6">
      <Tabs
        defaultValue={UserStatusTab.CONTRIBUTORS}
        variant="pills"
        radius="xs"
        color="#fff"
        classNames={{
          root: "px-2 py-[6px]",
          tabLabel: "text-base text-normal text-[#6B7280]",
          tab: "p-1 rounded-[8px]",
          list: "bg-[#f9fafc] p-1",
        }}
      >
        <Group align="center" justify="space-between">
          <Stack gap={0}>
            <Text className="text-2xl font-semibold text-[#0A0A0A]">
              User Status
            </Text>
            <Text className="text-sm font-normal text-[#737373]">
              Breakdown of active, retired, and deceased members
            </Text>
          </Stack>
          <Tabs.List grow>
            {UserStatusTabConfig?.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab?.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Group>
        <TransitionTab
          isMounted={UserStatusTab.CONTRIBUTORS === UserStatusTab.CONTRIBUTORS}
          value={UserStatusTab.CONTRIBUTORS}
        >
          <Contributors
            isLoading={isLoading}
            data={(data?.doc.contributorUserStats ?? []).map((item) => ({
              ...item,
              color: colorMap[item.name] ?? "gray.6",
            }))}
          />
        </TransitionTab>
        <TransitionTab
          isMounted={UserStatusTab.PENSIONERS === UserStatusTab.PENSIONERS}
          value={UserStatusTab.PENSIONERS}
        >
          <Pensioners
            isLoading={isLoading}
            data={(data?.doc.pensionerUserStats ?? []).map((item) => ({
              ...item,
              color: colorMap[item.name] ?? "gray.6",
            }))}
          />
        </TransitionTab>
      </Tabs>
    </Box>
  );
};

export default UserStatusStats;
