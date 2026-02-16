"use client";
import { useGetDioceseById } from "@/hooks/query/use-diocese";
import { routes } from "@/lib/routes";
import { Stack, Tabs, Text } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  DioceseStatusTab,
  DioceseStatusTabConfig,
  isDioceseStatusTabValid,
  type DioceseStatusTabType,
} from "./extras";
import Overview from "./tabs/overview";
import Parishes from "./tabs/parishes";
import TransitionTab from "./transition-tab";

const DioceseClientPage = () => {
  const params = useParams();
  const dioceseId = params?.id as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as DioceseStatusTabType;

  const { data: _data } = useGetDioceseById(dioceseId);

  const activeTab = isDioceseStatusTabValid(tabParam)
    ? tabParam
    : DioceseStatusTabConfig?.[0]?.value;

  const _active = DioceseStatusTabConfig.find(
    (item) => item.value === activeTab,
  )?.label;

  const handleTabChange = (e: string | null) => {
    if (!e) return;
    const params = new URLSearchParams(searchParams);
    params.set("tab", e);
    router.push(`?${params.toString()}`);
  };
  return (
    <Stack>
      <Stack gap={16} bg={"#fff"} p={16} className="rounded-[16px]">
        <Link
          className="flex items-center gap-2 text-[#2E5AAC]"
          href={routes.venerableDashboard.root}
        >
          <ArrowLeft size={16} />
          Go Back
        </Link>
        <Stack gap={8}>
          <Text className="text-lg font-semibold text-[#1F2937] md:text-xl md:font-bold">
            {/* {data?.doc?.name ?? ""} */}
          </Text>
          <Text className="font-normal text-[#6B7280]">
            Comprehensive overview of diocese structure, finances, and
            activities
          </Text>
        </Stack>
      </Stack>
      <Stack className="rounded-[16px]">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="pills"
          radius="xs"
          color="#fff"
          classNames={{
            root: "px-2 py-[6px]",
            tabLabel: "text-base text-normal text-[#6B7280] text-center",
            tab: "p-2 rounded-[8px] flex justify-center",
            list: "bg-[#f2f3f6] border border-[#6B72800D] rounded-[8px]",
          }}
        >
          <Tabs.List grow justify="center">
            {DioceseStatusTabConfig?.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab?.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <TransitionTab
            isMounted={activeTab === DioceseStatusTab.OVERVIEW}
            value={DioceseStatusTab.OVERVIEW}
          >
            <Overview />
          </TransitionTab>
          <TransitionTab
            isMounted={activeTab === DioceseStatusTab.PARISHES}
            value={DioceseStatusTab.PARISHES}
          >
            <Parishes />
          </TransitionTab>
        </Tabs>
      </Stack>
    </Stack>
  );
};

export default DioceseClientPage;
