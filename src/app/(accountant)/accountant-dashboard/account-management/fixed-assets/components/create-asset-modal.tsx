"use client";

import { useCreateFixedAsset } from "@/hooks/query/use-accounting";
import type { FixedAsset } from "@/types/accounting";
import {
  Button,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { z } from "zod";

const assetSchema = z.object({
  uniqueAssetId: z.string().min(2, "Asset ID is required"),
  name: z.string().min(3, "Asset name is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(2, "Location is required"),
  cost: z.number().min(1, "Cost must be > 0"),
  depreciationRate: z.number().min(1).max(100),
  acquisitionDate: z.date({ required_error: "Date is required" }),
});

interface CreateAssetModalProps {
  opened: boolean;
  onClose: () => void;
}

const CreateAssetModal = ({ opened, onClose }: CreateAssetModalProps) => {
  const { mutate, isPending } = useCreateFixedAsset();

  const form = useForm({
    validate: zodResolver(assetSchema),
    initialValues: {
      uniqueAssetId: "",
      name: "",
      category: "",
      location: "",
      cost: 0,
      depreciationRate: 20, // Default 20%
      acquisitionDate: new Date(),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const payload: Partial<FixedAsset> = {
      ...values,
      acquisitionDate: values.acquisitionDate.toISOString(),
      accumulatedDepreciation: 0,
      currentBookValue: values.cost,
      status: "Active",
    };

    mutate(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Success",
          message: "Asset registered successfully",
          color: "green",
        });
        form.reset();
        onClose();
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: "Failed to register asset.",
          color: "red",
        });
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Register New Fixed Asset"
      centered
      size="lg"
      radius="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md" mt="md">
          <TextInput
            label="Unique Asset ID"
            placeholder="e.g. AST-001"
            withAsterisk
            {...form.getInputProps("uniqueAssetId")}
          />

          <TextInput
            label="Asset Name"
            placeholder="e.g. Delivery Van"
            withAsterisk
            {...form.getInputProps("name")}
          />

          <Select
            label="Asset Category"
            placeholder="Select category"
            data={[
              "Vehicles",
              "Furniture",
              "Equipment",
              "Computers",
              "Land & Buildings",
            ]}
            withAsterisk
            {...form.getInputProps("category")}
          />

          <TextInput
            label="Location"
            placeholder="e.g. Main HQ"
            withAsterisk
            {...form.getInputProps("location")}
          />

          <NumberInput
            label="Original Cost (₦)"
            placeholder="0.00"
            decimalScale={2}
            thousandSeparator=","
            withAsterisk
            {...form.getInputProps("cost")}
          />

          <NumberInput
            label="Depreciation Rate (%)"
            placeholder="20"
            min={1}
            max={100}
            withAsterisk
            {...form.getInputProps("depreciationRate")}
          />

          <DateInput
            label="Acquisition Date"
            placeholder="Select date"
            withAsterisk
            {...form.getInputProps("acquisitionDate")}
          />

          <Button type="submit" loading={isPending} mt="md" fullWidth>
            Register Asset
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateAssetModal;
