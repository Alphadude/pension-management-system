"use client";
import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserPlus } from "lucide-react";
import { useState } from "react";

interface AdminOnboardingModalProps {
  opened: boolean;
  onClose: () => void;
}

interface AdminFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  diocese: string;
  parish: string;
}

const AdminOnboardingModal = ({
  opened,
  onClose,
}: AdminOnboardingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AdminFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
      diocese: "",
      parish: "",
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "First name is required" : null,
      lastName: (value) => (value.length < 2 ? "Last name is required" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phoneNumber: (value) =>
        value.length < 10 ? "Phone number is required" : null,
      role: (value) => (!value ? "Please select a role" : null),
      diocese: (value) => (!value ? "Please select a diocese" : null),
    },
  });

  const handleSubmit = async (_values: AdminFormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: Wire to actual API endpoint for admin creation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error onboarding admin:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showParishField = form.values.role === "parish-admin";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap={8}>
          <UserPlus size={20} color="#2E5AAC" />
          <Text className="text-lg font-semibold text-[#1F2937]">
            Onboard New Admin
          </Text>
        </Group>
      }
      size="lg"
      centered
      radius="md"
      classNames={{
        header: "border-b border-[#E5E7EB] pb-3",
        body: "pt-4",
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <Text className="text-sm text-[#6B7280]">
            Fill in the details below to onboard a new parish or diocese
            administrator. They will receive an email invitation to set up their
            account.
          </Text>

          <Group grow gap={12}>
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              withAsterisk
              {...form.getInputProps("firstName")}
              classNames={{
                input: "h-[42px]",
                label: "text-sm font-medium text-[#374151] mb-1",
              }}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              withAsterisk
              {...form.getInputProps("lastName")}
              classNames={{
                input: "h-[42px]",
                label: "text-sm font-medium text-[#374151] mb-1",
              }}
            />
          </Group>

          <TextInput
            label="Email Address"
            placeholder="Enter email address"
            withAsterisk
            {...form.getInputProps("email")}
            classNames={{
              input: "h-[42px]",
              label: "text-sm font-medium text-[#374151] mb-1",
            }}
          />

          <TextInput
            label="Phone Number"
            placeholder="e.g. 08012345678"
            withAsterisk
            {...form.getInputProps("phoneNumber")}
            classNames={{
              input: "h-[42px]",
              label: "text-sm font-medium text-[#374151] mb-1",
            }}
          />

          <Select
            label="Admin Role"
            placeholder="Select admin role"
            withAsterisk
            data={[
              { value: "diocese-admin", label: "Diocese Admin" },
              { value: "parish-admin", label: "Parish Admin" },
            ]}
            {...form.getInputProps("role")}
            classNames={{
              input: "h-[42px]",
              label: "text-sm font-medium text-[#374151] mb-1",
            }}
          />

          <Select
            label="Assign Diocese"
            placeholder="Select diocese"
            withAsterisk
            data={[
              { value: "lagos", label: "Lagos Diocese" },
              { value: "abuja", label: "Abuja Diocese" },
              { value: "enugu", label: "Enugu Diocese" },
              { value: "ibadan", label: "Ibadan Diocese" },
              { value: "owerri", label: "Owerri Diocese" },
              { value: "benin", label: "Benin Diocese" },
            ]}
            {...form.getInputProps("diocese")}
            classNames={{
              input: "h-[42px]",
              label: "text-sm font-medium text-[#374151] mb-1",
            }}
          />

          {showParishField && (
            <Select
              label="Assign Parish"
              placeholder="Select parish"
              data={[
                { value: "st-mary", label: "St. Mary Parish" },
                { value: "holy-trinity", label: "Holy Trinity Church" },
                { value: "st-andrews", label: "St. Andrew's Cathedral" },
                { value: "grace-fellowship", label: "Grace Fellowship Hall" },
                { value: "unity-community", label: "Unity Community Center" },
              ]}
              {...form.getInputProps("parish")}
              classNames={{
                input: "h-[42px]",
                label: "text-sm font-medium text-[#374151] mb-1",
              }}
            />
          )}

          <Group justify="flex-end" gap={12} mt={8}>
            <Button
              variant="outline"
              onClick={onClose}
              radius="md"
              className="border-[#D1D5DB] text-[#374151]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              radius="md"
              className="bg-[#2E5AAC]"
            >
              Send Invitation
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default AdminOnboardingModal;
