"use client";

import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateTransactionModal from "./create-transaction-modal";
import TransactionsTable from "./transactions-table";

const TransactionsClientPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Transactions
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              {" "}
              Record and view daily financial transactions (Receipts, Payments,
              Transfers).
            </Text>
          </Box>
          <Button
            leftSection={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            New Transaction
          </Button>
        </Group>
      </Stack>

      <TransactionsTable />

      <CreateTransactionModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Stack>
  );
};

export default TransactionsClientPage;
