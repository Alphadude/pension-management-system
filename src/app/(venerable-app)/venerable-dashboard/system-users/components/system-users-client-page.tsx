"use client";
import { ExportIcon } from "@/components/icons/export-icon";
import { useGetAllUsers } from "@/hooks/query/use-user";
import { type SessionUser } from "@/types/common";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { PlusIcon } from "lucide-react";
import Papa from "papaparse";
import { useState } from "react";
import SystemUsersTable from "./system-users-table";

const SystemUsersClientPage = () => {
  const { data, isLoading } = useGetAllUsers();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = () => {
    if (!data?.doc || data.doc.length === 0) return;

    setIsExporting(true);
    try {
      const exportData = data.doc.map((user: SessionUser, index: number) => ({
        "S/N": index + 1,
        NAME: `${user.firstName} ${user.lastName}`,
        "USER ID": user.id.slice(0, 8),
        EMAIL: user.email,
        ROLE: user.role,
        ORGANIZATION: `${user.diocese ?? "-"} / ${user.parish ?? "-"}`,
        STATUS: user.status,
      }));

      const csv = Papa.unparse(exportData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `system_users_export_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Stack gap={24} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        <Group justify="space-between" align="center">
          <Box>
            <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
              Venerable Dashboard
            </Text>
            <Text className="text-sm font-normal text-[#6B7280] md:text-base">
              System operational • Last updated:{" "}
              {new Date().toLocaleTimeString()}
            </Text>
          </Box>
          <Button
            leftSection={<ExportIcon size={16} color="white" />}
            onClick={handleExportCSV}
            loading={isExporting}
            disabled={!data?.doc || data.doc.length === 0}
          >
            <Box component="span" visibleFrom="sm">
              Export CSV
            </Box>
            <Box component="span" hiddenFrom="sm">
              <PlusIcon size={14} />
            </Box>
          </Button>
        </Group>
      </Stack>
      <Stack
        bg={"#fff"}
        className="rounded-[12px] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
      >
        <SystemUsersTable data={data} isLoading={isLoading} />
      </Stack>
    </Stack>
  );
};

export default SystemUsersClientPage;
