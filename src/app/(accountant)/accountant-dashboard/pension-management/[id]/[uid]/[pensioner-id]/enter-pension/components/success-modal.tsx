import { CircleCheckMarkIcon } from "@/components/icons/checkmark";
import { Button, Modal, Text } from "@mantine/core";

interface SuccessModalProps {
  opened: boolean;
  onClose: () => void;
  contributor: string; // name of contributor
}

const Successmodal = ({ opened, onClose, contributor }: SuccessModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} size="sm" centered>
      <div className="flex flex-col items-center gap-4">
        <CircleCheckMarkIcon />

        <Text className="text-center text-[32px] font-bold">Success!</Text>

        <Text style={{ fontSize: 16 }} className="text-center">
          Contribution has been added for{" "}
          <Text component="span" fw={700}>
            {contributor}
          </Text>
        </Text>

        <Button fullWidth color="blue" size="md" radius="lg" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default Successmodal;
