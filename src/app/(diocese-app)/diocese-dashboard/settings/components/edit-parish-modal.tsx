import {
  Box,
  Button,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";

interface Props {
  opened: boolean;
  close: VoidFunction;
}

const EditParishModal = ({ opened, close }: Props) => {
  return (
    <Modal
      size={"xl"}
      opened={opened}
      onClose={close}
      title={
        <Box>
          <Text className="text-xl font-bold text-[#1E1E1E]">
            Edit Parish Details
          </Text>
          <Text className="text-sm font-normal text-[#737373]">
            Modify parish details
          </Text>
        </Box>
      }
    >
      <Stack gap={16}>
        <SimpleGrid className="w-full items-start" cols={2}>
          <TextInput label={"Parish Name"} placeholder="St. John’s Parish" />
          <TextInput label={"Pastor"} placeholder="Fr. John’s Ukpaka" />
        </SimpleGrid>
        <Textarea
          classNames={{
            input: "h-[100px]",
          }}
          label="Address"
          placeholder="123 Main Street, City, State,"
        />
        <SimpleGrid className="w-full items-start" cols={2}>
          <TextInput label={"Phone"} placeholder="+234 9039553797" />
          <TextInput label={"Email"} placeholder="contact@parish.com" />
        </SimpleGrid>
        <TextInput label={"Year Established"} placeholder="1995" />
        <Group justify="flex-end" align="center">
          <Button variant="outline">Cancel</Button>
          <Button
            classNames={{
              root: "w-[121px]",
            }}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default EditParishModal;
