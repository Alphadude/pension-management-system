"use client";

import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import AssetsTable from "./assets-table";
import CreateAssetModal from "./create-asset-modal";

const FixedAssetsClientPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Fixed Assets Register
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              {" "}
              Manage organizational assets, view cost, and current book value.
            </Text>
          </Box>
          <Button
            leftSection={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Asset
          </Button>
        </Group>
      </Stack>

      <AssetsTable />

      <CreateAssetModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Stack>
  );
};

export default FixedAssetsClientPage;
