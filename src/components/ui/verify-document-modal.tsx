import { Button, Group, Modal, Text } from "@mantine/core";

interface Props {
  docType: string;
  field: string;
  url: string;
  opened: boolean;
  onClose: VoidFunction;
  onVerify: (payload: {
    field: string;
    status: "approved" | "rejected";
  }) => void;
  isLoading?: boolean;
}

const ViewDocumentModal = ({
  docType,
  field,
  url,
  opened,
  onClose,
  onVerify,
  isLoading,
}: Props) => {
  const handleReject = () => {
    onVerify({ field, status: "rejected" });
  };

  const handleAccept = () => {
    onVerify({ field, status: "approved" });
  };

  return (
    <Modal
      opened={opened}
      size="xl"
      title={
        <Text className="text-xl font-bold text-[#1E1E1E]">{docType}</Text>
      }
      centered
      onClose={onClose}
    >
      <iframe
        src={`${url}#zoom=fit`}
        width="100%"
        height="100%"
        style={{ border: "none", minHeight: "500px" }}
        title={docType}
      />
      <Group align="center" justify="flex-end" mt="md">
        <Button color="red" loading={isLoading} onClick={handleReject}>
          Reject
        </Button>
        <Button color="green" loading={isLoading} onClick={handleAccept}>
          Accept
        </Button>
      </Group>
    </Modal>
  );
};

export default ViewDocumentModal;
