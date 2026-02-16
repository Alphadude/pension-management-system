import { useCreateParish } from "@/hooks/mutate/use-parish";
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
import { useForm } from "@mantine/form";

interface Props {
  opened: boolean;
  close: VoidFunction;
}

const AddParishModal = ({ opened, close }: Props) => {
  const { mutate, isPending } = useCreateParish();

  const form = useForm({
    initialValues: {
      name: "",
      pastor: "",
      address: "",
      phone: "",
      email: "",
      yearEstablished: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    mutate(
      { name: values.name },
      {
        onSuccess: () => {
          form.reset();
          close();
        },
      },
    );
  };

  return (
    <Modal
      size={"xl"}
      opened={opened}
      onClose={close}
      title={
        <Box>
          <Text className="text-xl font-bold text-[#1E1E1E]">
            Add New Parish
          </Text>
          <Text className="text-sm font-normal text-[#737373]">
            Enter the details for the new parish
          </Text>
        </Box>
      }
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <SimpleGrid className="w-full items-start" cols={2}>
            <TextInput
              label={"Parish Name"}
              placeholder="St. John’s Parish"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              label={"Pastor"}
              placeholder="Fr. John’s Ukpaka"
              {...form.getInputProps("pastor")}
            />
          </SimpleGrid>
          <Textarea
            classNames={{
              input: "h-[100px]",
            }}
            label="Address"
            placeholder="123 Main Street, City, State,"
            {...form.getInputProps("address")}
          />
          <SimpleGrid className="w-full items-start" cols={2}>
            <TextInput
              label={"Phone"}
              placeholder="+234 9039553797"
              {...form.getInputProps("phone")}
            />
            <TextInput
              label={"Email"}
              placeholder="contact@parish.com"
              {...form.getInputProps("email")}
            />
          </SimpleGrid>
          <TextInput
            label={"Year Established"}
            placeholder="1995"
            {...form.getInputProps("yearEstablished")}
          />
          <Group justify="flex-end" align="center">
            <Button variant="outline" onClick={close} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Add Parish
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddParishModal;
