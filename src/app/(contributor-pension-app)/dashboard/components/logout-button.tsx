import { GiftIcon } from "@/components/icons/gift-icon";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import LogoutModal from "./logout-modal";

const LogoutButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <LogoutModal {...{ opened, close }} />
      <Button
        onClick={open}
        variant="transparent"
        leftSection={<GiftIcon />}
        className="font-poppins text-grey w-fit text-base leading-[17px] font-medium"
      >
        Logout
      </Button>
    </>
  );
};

export default LogoutButton;
