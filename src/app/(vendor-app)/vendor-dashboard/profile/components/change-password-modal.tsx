import { useUpdatePassword } from "@/hooks/mutate/use-auth";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import type { UpdatePasswordFormValues } from "@/types/common";
import {
  ActionIcon,
  Button,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useEffect } from "react";
import { object, ref, string } from "yup";

type Props = {
  opened: boolean;
  close: VoidFunction;
};

const initialValues: UpdatePasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  newConfirmPassword: "",
};

const changePasswordSchema = object({
  currentPassword: string().trim().required("Current password is required"),
  newPassword: string()
    .trim()
    .required("New password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase , one lowercase and one number",
    ),
  newConfirmPassword: string()
    .trim()
    .required("Confirm new password is required")
    .oneOf([ref("newPassword")], "New password must match"),
});

const ChangePasswordModal = ({ opened, close }: Props) => {
  const currentPasswordVissible = usePasswordVisibility();
  const newPasswordVissible = usePasswordVisibility();
  const confirmNewPasswordVissible = usePasswordVisibility();

  const { mutate, isPending } = useUpdatePassword(close);
  const form = useForm({
    initialValues,
    validate: yupResolver(changePasswordSchema),
  });

  const handleSubmitForm = (values: UpdatePasswordFormValues) => {
    mutate(values);
  };

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Modal
      padding={0}
      opened={opened}
      onClose={close}
      centered
      radius={12}
      title={
        <Text className="text-dark font-poppins text-base leading-[17px] font-semibold md:text-xl md:leading-12">
          Change Password
        </Text>
      }
      classNames={{
        content: "px-4 pb-5 md:pb-6 md:px-[25px]",
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Stack>
          <TextInput
            type={currentPasswordVissible.type}
            label={
              <Text className="font-poppins text-dark text-sm leading-[17px] font-medium">
                Current Password
              </Text>
            }
            placeholder="Enter Password"
            {...form.getInputProps("currentPassword")}
            rightSection={
              <ActionIcon
                variant="transparent"
                onClick={currentPasswordVissible.toggle}
              >
                <currentPasswordVissible.Icon color="#1E1E1E" size={16} />
              </ActionIcon>
            }
          />
          <TextInput
            type={newPasswordVissible.type}
            label={
              <Text className="font-poppins text-dark text-sm leading-[17px] font-medium">
                New Password
              </Text>
            }
            placeholder="Set your password"
            {...form.getInputProps("newPassword")}
            rightSection={
              <ActionIcon
                variant="transparent"
                onClick={newPasswordVissible.toggle}
              >
                <newPasswordVissible.Icon color="#1E1E1E" size={16} />
              </ActionIcon>
            }
          />
          <TextInput
            type={confirmNewPasswordVissible.type}
            label={
              <Text className="font-poppins text-dark text-sm leading-[17px] font-medium">
                Confirm New Password
              </Text>
            }
            placeholder="Set your password"
            {...form.getInputProps("newConfirmPassword")}
            rightSection={
              <ActionIcon
                variant="transparent"
                onClick={confirmNewPasswordVissible.toggle}
              >
                <confirmNewPasswordVissible.Icon color="#1E1E1E" size={16} />
              </ActionIcon>
            }
          />
          <Button type="submit" loading={isPending}>
            Update Password
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
