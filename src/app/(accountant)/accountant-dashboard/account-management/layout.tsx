import { AccountManagementPageTabs } from "@/components/acct-mgt/page-tabs";
import { Box } from "@mantine/core";

export default function AccountManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex h-full flex-col">
      <AccountManagementPageTabs />
      <Box className="mt-6 flex-1">{children}</Box>
    </Box>
  );
}
