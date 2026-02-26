"use client";

import {
  useCreateTransaction,
  useGetChartOfAccounts,
} from "@/hooks/query/use-accounting";
import type { CreateTransactionPayload } from "@/types/accounting";
import {
  Button,
  FileInput,
  Modal,
  NumberInput,
  Select,
  Stack,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { z } from "zod";

const transactionSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  type: z.enum(["Receipt", "Payment", "Transfer"], {
    required_error: "Type is required",
  }),
  amount: z.number().min(1, "Amount must be greater than 0"),
  debitAccountId: z.string().min(1, "Debit account is required"),
  creditAccountId: z.string().min(1, "Credit account is required"),
  description: z.string().min(3, "Description is too short"),
});

interface CreateTransactionModalProps {
  opened: boolean;
  onClose: () => void;
}

const CreateTransactionModal = ({
  opened,
  onClose,
}: CreateTransactionModalProps) => {
  const { mutate, isPending } = useCreateTransaction();
  const { data: accountsData } = useGetChartOfAccounts();
  const accounts = accountsData?.docs ?? [];

  const accountOptions = accounts.map((acc) => ({
    value: acc.id,
    label: `${acc.name} (${acc.type})`,
  }));

  const form = useForm({
    validate: zodResolver(transactionSchema),
    initialValues: {
      date: new Date(),
      type: "Payment" as "Payment" | "Receipt" | "Transfer",
      amount: 0,
      debitAccountId: "",
      creditAccountId: "",
      description: "",
      attachment: null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // In a real scenario, attachment would be uploaded to S3/Firebase first
    // to get `attachmentUrl`.
    const payload: CreateTransactionPayload = {
      ...values,
      date: values.date.toISOString(),
    };

    mutate(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Success",
          message: "Transaction added successfully",
          color: "green",
        });
        form.reset();
        onClose();
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: "Failed to add transaction. Try again.",
          color: "red",
        });
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Record New Transaction"
      centered
      size="lg"
      radius="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md" mt="md">
          <DateInput
            label="Transaction Date"
            placeholder="Select date"
            withAsterisk
            {...form.getInputProps("date")}
          />

          <Select
            label="Transaction Type"
            placeholder="Select type"
            data={["Receipt", "Payment", "Transfer"]}
            withAsterisk
            {...form.getInputProps("type")}
          />

          <NumberInput
            label="Amount (₦)"
            placeholder="0.00"
            decimalScale={2}
            thousandSeparator=","
            withAsterisk
            {...form.getInputProps("amount")}
          />

          <Select
            label="Debit Account (Dr)"
            placeholder="Select receiving account"
            data={accountOptions}
            searchable
            withAsterisk
            {...form.getInputProps("debitAccountId")}
          />

          <Select
            label="Credit Account (Cr)"
            placeholder="Select source account"
            data={accountOptions}
            searchable
            withAsterisk
            {...form.getInputProps("creditAccountId")}
          />

          <Textarea
            label="Description"
            placeholder="Enter reason for transaction"
            autosize
            minRows={2}
            withAsterisk
            {...form.getInputProps("description")}
          />

          <FileInput
            label="Attachment (Optional)"
            placeholder="Upload receipt/invoice"
            {...form.getInputProps("attachment")}
          />

          <Button type="submit" loading={isPending} mt="md" fullWidth>
            Record Transaction
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateTransactionModal;
