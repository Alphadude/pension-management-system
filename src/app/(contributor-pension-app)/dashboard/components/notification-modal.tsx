import { Button, Divider, Group, Modal, Text, Title } from "@mantine/core";

import { CircleAlert, CircleCheckBig, TriangleAlert } from "lucide-react";

interface Props {
  opened: boolean;
  open: () => void;
  close: () => void;
}

const NotificationModal = ({ opened, open, close }: Props) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="All notifications"
        className="font-[inter]"
        classNames={{
          title: "text-[20px] font-semibold text-black-900",
        }}
      >
        <Divider className="mx-auto my-4 w-full border-gray-300" size="sm" />

        <Group align="center" gap="sm">
          <CircleCheckBig className="h-5 w-5 text-green-500" />

          <Title
            order={6}
            className="font-[Poppins] text-[14px] leading-[17px] font-medium tracking-[0px]"
          >
            Pension Fund Credited
          </Title>
        </Group>

        <Text className="font-poppins text-[12px] font-normal text-gray-500">
          Your monthly pension of ₦125,000 has
        </Text>
        <Text className="font-poppins text-[12px] font-normal text-gray-500">
          been
        </Text>

        <Text className="font-poppins text-[12px] font-normal text-gray-500">
          credited to your account.
        </Text>

        <Text className="font-poppins text-[12px] font-normal text-gray-500">
          2 hours ago
        </Text>
        <Divider className="mx-auto my-4 w-full border-gray-300" size="sm" />

        <Group align="center" gap="sm">
          <TriangleAlert className="h-5 w-5 text-yellow-500" />

          <Title order={6} className="font-poppins text-[14px] font-medium">
            Withdrawal Request Pending
          </Title>
        </Group>

        <Text className="font-poppins mb-6 text-[12px] font-normal text-gray-500">
          awaiting
        </Text>

        <Text className="font-poppins text-[12px] font-normal text-gray-500">
          3 days ago
        </Text>

        <Divider className="mx-auto my-4 w-full border-gray-300" size="sm" />
        <Group align="center" gap="sm">
          <CircleAlert className="h-5 w-5 text-blue-500" />

          <Title order={6} className="font-poppins text-[14px] font-medium">
            New Statement Available
          </Title>
        </Group>
        <Text className="font-poppins text-[12px] font-normal text-gray-500">
          Your quarterly pension statement is now available
        </Text>
        <Text className="font-poppins mb-6 text-[12px] font-normal text-gray-500">
          for download
        </Text>

        <Text className="font-poppins text-[12px] font-normal text-gray-500">
          1 day ago
        </Text>
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
};

export default NotificationModal;
