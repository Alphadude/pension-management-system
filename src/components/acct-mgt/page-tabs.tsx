"use client";

import { Box, ScrollArea, Tabs } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const tabNodes = [
  {
    value: "overview",
    label: "Overview",
    link: "/accountant-dashboard/account-management",
  },
  {
    value: "transactions",
    label: "Transactions",
    link: "/accountant-dashboard/account-management/transactions",
  },
  {
    value: "ledger",
    label: "General Ledger",
    link: "/accountant-dashboard/account-management/ledger",
  },
  {
    value: "cash-book",
    label: "Cash Book",
    link: "/accountant-dashboard/account-management/cash-book",
  },
  {
    value: "fixed-assets",
    label: "Fixed Assets",
    link: "/accountant-dashboard/account-management/fixed-assets",
  },
  {
    value: "depreciation",
    label: "Depreciation",
    link: "/accountant-dashboard/account-management/depreciation",
  },
  {
    value: "reports",
    label: "Reports",
    link: "/accountant-dashboard/account-management/reports",
  },
  {
    value: "budgeting",
    label: "Budgeting",
    link: "/accountant-dashboard/account-management/budgeting",
  },
  {
    value: "settings",
    label: "Settings",
    link: "/accountant-dashboard/account-management/settings",
  },
];

export function AccountManagementPageTabs() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    // Find the current tab from the URL
    const tabItem = tabNodes.find(
      (item) => item.value !== "overview" && pathname.includes(item.link),
    );

    if (tabItem) {
      setActiveTab(tabItem.value);
    } else if (pathname.endsWith("/account-management")) {
      setActiveTab("overview");
    }
  }, [pathname]);

  return (
    <Box className="w-full border-b border-gray-200 bg-white">
      <ScrollArea type="never" viewportProps={{ style: { overflowX: "auto" } }}>
        <Tabs
          value={activeTab}
          onChange={(val) => setActiveTab(val ?? "overview")}
          classNames={{
            root: "h-14 flex items-end",
            list: "border-0 gap-6",
            tab: "data-[active]:border-blue-600 data-[active]:text-blue-600 text-gray-500 font-medium pb-4 border-b-2 hover:-translate-y-0.5 transition-transform",
          }}
        >
          <Tabs.List>
            {tabNodes.map((tab) => (
              <Link key={tab.value} href={tab.link}>
                <Tabs.Tab value={tab.value}>{tab.label}</Tabs.Tab>
              </Link>
            ))}
          </Tabs.List>
        </Tabs>
      </ScrollArea>
    </Box>
  );
}
