import { useUpdateUserStatus } from "@/hooks/mutate/use-profile";
import { useGetUser } from "@/hooks/query/use-user";
import type { UpdateStatusFormValues } from "@/types/common";
import {
  Box,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { object, string } from "yup";

interface Props {
  opened: boolean;
  onClose: VoidFunction;
  contributorId: string;
}

const initialValues = {
  status: "",
  parishtransfernote: "",
};

const validateSchema = object({
  status: string().required("status is required"),
  parishtransfernote: string().optional(),
});

const ChangeStatusModal = ({ opened, onClose, contributorId }: Props) => {
  const { mutate: mutation, isPending } = useUpdateUserStatus(contributorId);
  const form = useForm<UpdateStatusFormValues>({
    initialValues,
    validate: yupResolver(validateSchema),
  });

  const { data } = useGetUser(contributorId);

  const handleSubmit = (values: UpdateStatusFormValues) => {
    mutation(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Box>
          <Text className="text-xl font-bold text-[#1E1E1E]">
            Change User Status
          </Text>
          <Text className="text-sm font-normal text-[#737373]">
            Update the status for {data?.doc?.user?.firstName ?? ""}{" "}
            {data?.doc?.user?.lastName ?? ""}
          </Text>
        </Box>
      }
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <Stack gap={4}>
            <Text className="text-sm font-medium text-[#1E1E1E]">Status</Text>
            <Text className="w-[80px] rounded-full border border-[#BBF7D0] bg-[#DCFCE7] px-[18px] py-0.5 text-base font-medium text-[#4CAF50]">
              {data?.doc?.user?.status ?? ""}
            </Text>
          </Stack>
          <Select
            label={"New Status"}
            placeholder="Select new status"
            data={["active", "retired", "deceased"]}
            {...form.getInputProps("status")}
          />
          <Textarea
            classNames={{
              input: "h-[100px]",
            }}
            label="Reason (Optional)"
            placeholder="Enter Reason for status change"
            {...form.getInputProps("parishtransfernote")}
          />
          <Group justify="flex-end" align="center">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Update Status
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default ChangeStatusModal;
