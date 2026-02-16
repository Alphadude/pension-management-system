import { useUploadPaymentVoucher } from "@/hooks/mutate/use-payment-voucher";
import type { paymentVoucherForm } from "@/types/common";
import {
  Box,
  Button,
  Checkbox,
  FileInput,
  Modal,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { boolean, mixed, object, string } from "yup";

interface ModalProps {
  opened: boolean;
  close: VoidFunction;
}

const initialValues: paymentVoucherForm = {
  voucherFile: null,
  note: "",
  terms: false,
};

const validateSchema = object({
  voucherFile: mixed()
    .required("Payement voucher image is required")
    .test(
      "fileSize",
      "File size must be less than 10MB",
      (value) =>
        !value || (value instanceof File && value.size <= 10 * 1024 * 1024),
    ),
  note: string().optional(),
  terms: boolean().oneOf([true], "You must agree to terms"),
});

const UploadModal = ({ opened, close }: ModalProps) => {
  const { mutate: mutation, isPending } = useUploadPaymentVoucher();
  const form = useForm<paymentVoucherForm>({
    initialValues,
    validate: yupResolver(validateSchema),
  });

  const handleSubmitForm = (values: paymentVoucherForm) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "terms") return;
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    mutation(formData, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Upload Signed Payment Voucher"
      className="font-[poppins]"
      classNames={{
        content: "rounded-[12px]",
        header: "px-[18px] pb-[6px]",
        body: "px-[18px]",
        title: "text-lg md:text-xl font-semibold md:font-bold text-[#1E1E1E]",
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Stack gap={12}>
          <Text className="text-sm font-medium text-[#1E1E1E] md:font-normal">
            Upload your signed payment voucher for voucher ID: PV-2023-001
          </Text>
          <Stack gap={12}>
            <FileInput
              label="Upload File"
              placeholder={
                <Box className="flex flex-col items-center py-6">
                  <Text className="text-[10px] font-semibold text-[#2E5AAC] md:text-sm">
                    Upload a file
                  </Text>
                  <Text className="text-[9px] font-normal text-[#6B7280] md:text-xs">
                    or drag and drop PDF, JPG, or PNG up to 10MB
                  </Text>
                </Box>
              }
              {...form.getInputProps("voucherFile")}
            />
            <Textarea
              label="Notes (Optional)"
              placeholder="Add any additional notes and comments here...."
              {...form.getInputProps("note")}
            />
            <Checkbox
              size="sm"
              label="I acknowledge receipt and confirm signature"
              description="By checking this box, you confirm that the uploaded document is valid and properly signed."
              classNames={{
                label: "font-semibold text-sm text-[#1E1E1E]",
                description: "font-normal text-sm text-[#6b7280] mt-0",
              }}
              {...form.getInputProps("terms")}
            />
          </Stack>
        </Stack>
        <Button
          type="submit"
          className="mt-[30px] w-full text-[10px] font-semibold md:text-sm"
          loading={isPending}
        >
          Upload Voucher
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
