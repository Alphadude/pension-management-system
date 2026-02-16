import { routes } from "@/lib/routes";
import { Button, Flex, Modal, Text } from "@mantine/core";
import { signOut } from "next-auth/react";

interface Props {
  opened: boolean;
  close: VoidFunction;
}

const LogoutModal = ({ opened, close }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      radius={16}
      padding={25}
      title={
        <Text className="text-dark font-poppins text-base leading-[17px] font-semibold md:text-xl md:leading-12">
          Confirm Logout
        </Text>
      }
    >
      <Text className="font-poppins text-grey text-xs leading-[17px] font-normal md:text-sm md:leading-[17px]">
        Are you sure you want to log out? You will need to log in again to
        access your account.
      </Text>
      <Flex className="mt-[30px] items-center gap-x-3 md:mt-10">
        <Button
          onClick={close}
          variant="outline"
          fullWidth
          className="font-poppins h-9 rounded-[8px] text-xs leading-[17px] font-normal md:h-12 md:text-base md:leading-[17px] md:font-medium"
        >
          Cancel
        </Button>
        <Button
          fullWidth
          onClick={() =>
            signOut({
              callbackUrl: routes.auth.login,
            })
          }
          className="bg-error font-poppins h-9 rounded-[8px] text-xs leading-[17px] font-normal md:h-12 md:text-base md:leading-[17px] md:font-medium"
        >
          Logout
        </Button>
      </Flex>
    </Modal>
  );
};

export default LogoutModal;
