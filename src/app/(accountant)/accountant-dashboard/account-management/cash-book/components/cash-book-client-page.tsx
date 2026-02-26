"use client";

import { Box, Button, Group, Stack, Tabs, Text } from "@mantine/core";
import { Download } from "lucide-react";
import CashBookTable from "./cash-book-table";

const CashBookClientPage = () => {
  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Cash Book
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              {" "}
              Track daily and monthly cash/bank balances.
            </Text>
          </Box>
          <Button leftSection={<Download size={16} />} variant="outline">
            Export PDF
          </Button>
        </Group>
      </Stack>

      <Tabs
        defaultValue="cash"
        classNames={{
          root: "bg-white p-6 rounded-[16px] shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)]",
        }}
      >
        <Tabs.List mb="md">
          <Tabs.Tab value="cash" className="text-base font-medium">
            Cash Book
          </Tabs.Tab>
          <Tabs.Tab value="bank" className="text-base font-medium">
            Bank Book
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cash">
          <CashBookTable type="Cash" />
        </Tabs.Panel>

        <Tabs.Panel value="bank">
          <CashBookTable type="Bank" />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default CashBookClientPage;
