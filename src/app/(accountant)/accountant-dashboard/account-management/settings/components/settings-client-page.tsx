"use client";

import { Box, Button, Group, Select, Stack, Tabs, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import ChartOfAccountsTable from "./chart-of-accounts-table";
import CreateAccountModal from "./create-account-modal";

const SettingsClientPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Accounting Settings
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              {" "}
              Configure Chart of Accounts and define organizational financial
              years.
            </Text>
          </Box>
        </Group>
      </Stack>

      <Tabs
        defaultValue="coa"
        classNames={{
          root: "bg-white p-6 rounded-[16px] shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]",
        }}
      >
        <Tabs.List mb="md">
          <Tabs.Tab value="coa" className="text-base font-medium">
            Chart of Accounts
          </Tabs.Tab>
          <Tabs.Tab value="financial-year" className="text-base font-medium">
            Financial Year
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="coa">
          <Group justify="flex-end" mb="md">
            <Button
              leftSection={<Plus size={16} />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Ledger Account
            </Button>
          </Group>
          <ChartOfAccountsTable />
        </Tabs.Panel>

        <Tabs.Panel value="financial-year">
          <Stack gap="md" maw={400} mt="md">
            <Select
              label="Active Financial Year"
              description="Transactions must fall within the open financial year."
              data={["2024", "2025", "2026", "2027"]}
              defaultValue="2026"
            />
            <Select
              label="Period Status"
              data={["Open", "Closed (Locked)"]}
              defaultValue="Open"
            />
            <Button color="blue" mt="sm">
              Save Configuration
            </Button>
          </Stack>
        </Tabs.Panel>
      </Tabs>

      <CreateAccountModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Stack>
  );
};

export default SettingsClientPage;
