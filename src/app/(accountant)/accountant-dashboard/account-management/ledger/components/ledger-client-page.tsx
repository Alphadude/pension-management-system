"use client";

import { useGetChartOfAccounts } from "@/hooks/query/use-accounting";
import { Box, Group, Select, Stack, Text } from "@mantine/core";
import { useState } from "react";
import LedgerTable from "./ledger-table";

const LedgerClientPage = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  const { data: accountsData, isLoading: accountsLoading } =
    useGetChartOfAccounts();
  const accounts = accountsData?.docs ?? [];

  const accountOptions = accounts.map((acc) => ({
    value: acc.id,
    label: `${acc.name} (${acc.type})`,
  }));

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              General Ledger
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              {" "}
              View Dr/Cr history and running balances for specific accounts.
            </Text>
          </Box>
          <Select
            placeholder={
              accountsLoading ? "Loading accounts..." : "Select an account"
            }
            data={accountOptions}
            searchable
            clearable
            value={selectedAccountId}
            onChange={setSelectedAccountId}
            className="w-64"
          />
        </Group>
      </Stack>

      {selectedAccountId ? (
        <LedgerTable accountId={selectedAccountId} />
      ) : (
        <Box className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
          <Text className="text-gray-500">
            Please select an account to view its ledger.
          </Text>
        </Box>
      )}
    </Stack>
  );
};

export default LedgerClientPage;
