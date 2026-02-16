import { Drawer, em, Flex, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import DashboardNavigation from "./dashboard-navigation";
import LogoutButton from "./logout-button";

type Props = {
  opened: boolean;
  close: () => void;
};

const DashboardDrawer = ({ opened, close }: Props) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  useEffect(() => {
    if (!isMobile) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  return (
    <Drawer opened={opened} onClose={close}>
      <Flex className="h-[calc(100vh-80px)] flex-col">
        <Text className="text-primary font-inter text-xl font-bold">
          NPX-LBS Pension
        </Text>
        <DashboardNavigation />
        <LogoutButton />
      </Flex>
    </Drawer>
  );
};

export default DashboardDrawer;
