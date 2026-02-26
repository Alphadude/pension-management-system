"use client";

import { useCreateChartOfAccount } from "@/hooks/query/use-accounting";
import type { ChartOfAccount } from "@/types/accounting";
import { Button, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { z } from "zod";

const accountSchema = z.object({
  name: z.string().min(3, "Account name is too short"),
  type: z.enum(["Asset", "Liability", "Income", "Expense", "Equity"], {
    required_error: "Type is required",
  }),
});

interface CreateAccountModalProps {
  opened: boolean;
  onClose: () => void;
}

const CreateAccountModal = ({ opened, onClose }: CreateAccountModalProps) => {
  const { mutate, isPending } = useCreateChartOfAccount();

  const form = useForm({
    validate: zodResolver(accountSchema),
    initialValues: {
      name: "",
      type: "Asset" as "Asset" | "Liability" | "Income" | "Expense" | "Equity",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const payload: Partial<ChartOfAccount> = {
      ...values,
      balance: 0,
    };

    mutate(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Account Created",
          message: `${values.name} added to Chart of Accounts.`,
          color: "green",
        });
        form.reset();
        onClose();
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: "Could not create account.",
          color: "red",
        });
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create Ledger Account"
      centered
      radius="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md" mt="md">
          <TextInput
            label="Account Name"
            placeholder="e.g. Petty Cash"
            withAsterisk
            {...form.getInputProps("name")}
          />

          <Select
            label="Account Classification (Type)"
            placeholder="Select type"
            data={["Asset", "Liability", "Income", "Expense", "Equity"]}
            withAsterisk
            {...form.getInputProps("type")}
          />

          <Button type="submit" loading={isPending} mt="md" fullWidth>
            Create Account
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateAccountModal;
