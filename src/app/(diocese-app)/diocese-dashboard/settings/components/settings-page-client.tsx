"use client";
import {
  Box,
  Button,
  Group,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PlusIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import AddKYCRequirementsModal from "./add-kyc-requirements-modal";
import AddParishModal from "./add-parish-modal";
import {
  DioceseSettingsTab,
  DioceseSettingsTabConfig,
  isDioceseSettingsTabValid,
  type DioceseSettingsTabType,
} from "./extras";
import KycRequirements from "./tabs/kyc-kequirements";
import ParishesTable from "./tabs/parishes-table";
import TransitionTab from "./transition-tab";

const SettingsPage = () => {
  const [
    isParishModalOpened,
    { open: openParishModal, close: closeParishModal },
  ] = useDisclosure(false);
  const [isKycModalOpened, { open: _openKycModal, close: closeKycModal }] =
    useDisclosure(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as DioceseSettingsTabType;

  const activeTab = isDioceseSettingsTabValid(tabParam)
    ? tabParam
    : DioceseSettingsTabConfig?.[0]?.value;

  const _active = DioceseSettingsTabConfig.find(
    (item) => item.value === activeTab,
  )?.label;

  const handleTabChange = (e: string | null) => {
    if (!e) return;
    const params = new URLSearchParams(searchParams);
    params.set("tab", e);
    router.push(`?${params.toString()}`);
  };
  return (
    <Stack gap={24} className="rounded-[12px]">
      <Group justify="space-between" align="center">
        <Box>
          <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
            Welcome, ABC Diocese
          </Text>
          <Text className="text-sm font-normal text-[#6B7280] md:text-base">
            Manage your Parish information
          </Text>
        </Box>
      </Group>
      <Box className="bg-[#fff]">
        <Box className="rounded-[12px]">
          <Stack className="px-[31px] pt-[21px] pb-[36px]" gap={0}>
            <Stack gap={8}>
              <Text className="text-xl font-semibold text-[#1F2937]">
                Diocese Settings
              </Text>
              <Text className="text-xs font-normal text-[#6B7280]">
                Manage parishes, sub-administrators, and system configurations
              </Text>
            </Stack>
            <Group
              align="center"
              justify="space-between"
              className="mt-2 grid w-full grid-cols-[4fr_1fr]"
            >
              <TextInput
                placeholder="Enter Diocese Name"
                className="w-full"
                classNames={{
                  input: "h-[51px]",
                }}
              />
              <Button leftSection={<PlusIcon />} onClick={openParishModal}>
                Add Parish
              </Button>
            </Group>
          </Stack>
        </Box>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="pills"
          // radius="xs"
          color="#fff"
          classNames={{
            root: "py-[6px] bg-[#ffff]",
            tabLabel: "text-base text-normal text-[#6B7280] text-center",
            tab: "p-2 rounded-[8px] flex justify-center",
            list: "bg-[#f2f3f6] p-2 border border-[#6B72800D] rounded-[8px]",
          }}
        >
          <Tabs.List grow justify="center">
            {DioceseSettingsTabConfig?.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab?.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <TransitionTab
            isMounted={activeTab === DioceseSettingsTab.PARISHES}
            value={DioceseSettingsTab.PARISHES}
          >
            <ParishesTable />
          </TransitionTab>
          <TransitionTab
            isMounted={activeTab === DioceseSettingsTab.KYC_REQUIREMENTS}
            value={DioceseSettingsTab.KYC_REQUIREMENTS}
          >
            <KycRequirements />
          </TransitionTab>
        </Tabs>
      </Box>
      <AddParishModal opened={isParishModalOpened} close={closeParishModal} />
      <AddKYCRequirementsModal
        opened={isKycModalOpened}
        close={closeKycModal}
      />
    </Stack>
  );
};

export default SettingsPage;
