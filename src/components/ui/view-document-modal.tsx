import { Modal, Text } from "@mantine/core";

interface Props {
  docType: string;
  url: string;
  opened: boolean;
  onClose: VoidFunction;
}

const ViewDocumentModal = ({ docType, url, opened, onClose }: Props) => {
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
    </Modal>
  );
};

export default ViewDocumentModal;
