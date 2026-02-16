import {
  ActionIcon,
  Button,
  FileButton,
  Group,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";

type Props = {
  opened: boolean;
  close: () => void;
  handleOpenGenerateInvoiceModal: () => void;
};

const SubmitInvoiceModal = ({
  opened,
  close,
  handleOpenGenerateInvoiceModal,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <Modal
      opened={opened}
      radius={16}
      centered
      onClose={close}
      title={
        <Text className="font-inter text-xl leading-12 font-bold text-[#1E1E1E]">
          Submit New Invoice
        </Text>
      }
      classNames={{
        body: "sm:pb-10",
      }}
    >
      <form>
        <Stack gap={24}>
          <Stack gap={4}>
            <Text className="text-sm leading-[17px] font-medium text-[#1E1E1E]">
              Attach Invoice File (PDF/Doc)
            </Text>
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Group
                  className="h-[45px] rounded-[8px] border border-[#D1D5DB] px-[7px] py-2"
                  {...props}
                >
                  <Group className="font-poppins h-full w-[101px] justify-center rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] text-sm leading-[17px] font-normal">
                    Choose File
                  </Group>
                  <Text className="font-poppins line-clamp-1 text-sm leading-[17px] font-normal text-[#1E1E1E]">
                    {file?.name ?? "No file chosen"}
                  </Text>
                </Group>
              )}
            </FileButton>
          </Stack>
          <Button type="submit">Submit</Button>
        </Stack>
        <Group
          gap={8}
          className="mt-4 justify-center text-sm leading-[17px] font-normal"
        >
          <Text className="font-poppins text-[#1E1E1E]" inherit>
            Don&apos;t have an Invoice?
          </Text>
          <ActionIcon
            variant="transparent"
            onClick={handleOpenGenerateInvoiceModal}
            className="font-inter teActionIcon w-fit"
          >
            Generate an Invoice
          </ActionIcon>
        </Group>
      </form>
    </Modal>
  );
};

export default SubmitInvoiceModal;
