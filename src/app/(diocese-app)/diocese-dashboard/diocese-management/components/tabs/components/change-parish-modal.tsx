import { Parish } from "@/components/parish";
import { useGetAllParishes } from "@/hooks/query/use-parish";
import { useGetUser } from "@/hooks/query/use-user";
import type { UpdateParishFormValues } from "@/types/common";
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
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { object, string } from "yup";

interface Props {
  opened: boolean;
  contributorId: string;
  onClose: VoidFunction;
}

const initialValues = {
  parish: "",
  parishTransferNote: "",
};

const validateSchema = object({
  parish: string().required("Parish is required"),
  parishTransferNote: string().optional(),
});

const ChangeParishModal = ({ opened, onClose, contributorId }: Props) => {
  const { data } = useGetUser(contributorId);
  const { data: sessionData } = useSession();
  const { data: parishesData, updateQuery } = useGetAllParishes();

  const form = useForm<UpdateParishFormValues>({
    initialValues,
    validate: yupResolver(validateSchema),
  });

  useEffect(() => {
    const selectedDioceseId = sessionData?.user?.diocese ?? "";
    // reset parish value when diocese changes
    form.setFieldValue("parish", "");
    if (selectedDioceseId) {
      updateQuery("diocese", selectedDioceseId);
    } else {
      updateQuery("diocese", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData?.user?.diocese]);

  const handleSubmit = (values: UpdateParishFormValues) => {
    console.log(values);
  };

  return (
    <Modal
      size={"md"}
      opened={opened}
      onClose={onClose}
      title={
        <Box>
          <Text className="text-xl font-bold text-[#1E1E1E]">
            Change Parish Assignment
          </Text>
          <Text className="text-sm font-normal text-[#737373]">
            Update the parish assignment for {data?.doc?.user?.firstName ?? ""}{" "}
            {data?.doc?.user?.lastName ?? ""}
          </Text>
        </Box>
      }
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <Stack gap={4}>
            <Text className="text-sm font-medium text-[#1E1E1E]">
              Current Parish
            </Text>
            <Text className="text-xs font-normal text-[#1E1E1E]">
              <Parish parishId={data?.doc?.user?.parish ?? ""} />
            </Text>
          </Stack>
          <Select
            label="New Parish"
            data={parishesData?.doc?.map((parish) => ({
              value: parish._id,
              label: `${parish.name}`,
            }))}
            placeholder="Select new Parish"
            {...form.getInputProps("parish")}
          />
          <Textarea
            classNames={{
              input: "h-[100px]",
            }}
            label="Reason (Optional)"
            placeholder="Enter Reason for parish transfer"
            {...form.getInputProps("parishTransferNote")}
          />
          <Group justify="flex-end" align="center">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Transfer User</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default ChangeParishModal;
