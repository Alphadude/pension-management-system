import { CalenderDatePickerIcon } from "@/components/icons/calendar-icon";
import { toast } from "@/components/ui/toast";
import { useCreateInvoice } from "@/hooks/mutate/use-invoice";
import {
  useGetBankList,
  useVerifyBankAccount,
} from "@/hooks/query/use-paystack";
import {
  ActionIcon,
  Button,
  Group,
  Loader,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { array, date, number, object, string, type InferType } from "yup";
import LineItem from "../line-item";
import { useNumberInput } from "@/hooks/logic/use-number-input";
import numeral from "numeral";

type Props = {
  opened: boolean;
  close: () => void;
};

const lineItemSchema = object({
  description: string().required("Line item description is required"),
  quantity: number()
    .integer("Quantity must be an integer")
    .positive("Quantity must be greater than zero")
    .required("Quantity is required"),
  unitCost: number()
    .positive("Unit cost must be greater than zero")
    .required("Unit cost is required"),
  totalCost: number()
    .positive("Total cost must be greater than zero")
    .required("Total cost is required"),
});

const invoiceSchema = object({
  date: date()
    .nullable()
    .typeError("Date must be a valid ISO 8601 date string")
    .required("Date is required"),
  lineItems: array()
    .of(lineItemSchema)
    .min(1, "At least one line item is required")
    .required("Line items are required"),

  totalAmount: number()
    .positive("Total amount must be greater than zero")
    .required("Total amount is required"),

  bankName: string().required("Bank name is required"),
  accountName: string().required("Account name is required"),
  accountNumber: string().required("Account number is required"),
});

type InvoicesFormData = InferType<typeof invoiceSchema>;

const initialValues: InvoicesFormData = {
  // @ts-expect-error unknown error
  date: null,
  lineItems: [
    {
      description: "",
      quantity: 0,
      unitCost: 0,
      totalCost: 0,
    },
  ],
  totalAmount: 0,
  bankName: "",
  accountName: "",
  accountNumber: "",
};

const GenerateReportModal = ({ opened, close }: Props) => {
  const [bankCode, setBankCode] = useState<string>("");
  const [bankNameResetKey, setbankNameResetKey] = useState(0);

  const form = useForm({
    initialValues,
    validate: yupResolver(invoiceSchema),
  });

  const currentAccountNumber = form.getValues().accountNumber;
  const _totalAmount = useNumberInput(form, "totalAmount", 0);
  const {
    data: verifyBankAccount,
    isLoading: isVerifying,
    isError: isErrorVerifyBankAccount,
    error: errorVerifyBankAccount,
  } = useVerifyBankAccount({
    variables: {
      account_number: currentAccountNumber,
      bank_code: bankCode,
    },
    enabled: !!bankCode && currentAccountNumber?.length === 10,
  });

  const handleAccountNumberChange = (value: string) => {
    form.setFieldValue("accountNumber", value);

    // If account number is not 10 digits, clear bank selection
    if (value.length !== 10) {
      form.setFieldValue("bankName", "");
      setbankNameResetKey((prev) => prev + 1); // Force re-render of Select};
      setBankCode("");
    }
  };

  const handleBankChange = (value: string | null, option: unknown) => {
    if (option) {
      // @ts-expect-error unknown error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      form.setFieldValue("bankName", option.label);
      // @ts-expect-error unknown error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setBankCode(option.code);

      // Clear account name when bank changes
      form.setFieldValue("accountName", "");
      // setLastVerifiedAccountNumber("");
    } else {
      form.setFieldValue("bankName", "");
      setbankNameResetKey((prev) => prev + 1); // Force re-render of Select};
      setBankCode("");
      form.setFieldValue("accountName", "");
      // setLastVerifiedAccountNumber("");
    }
  };

  const { mutate, isPending } = useCreateInvoice(close);

  const handleSubmitForm = (values: InvoicesFormData) => {
    // @ts-expect-error unknown error
    mutate(values);
  };

  const { data: bankList } = useGetBankList();

  const bankListOptions = bankList?.map((bank) => ({
    ...bank,
    label: bank?.name,
    value: bank?.name,
  }));

  const fields = form.getValues().lineItems.map((item, index) => (
    <LineItem
      key={`line-item-${index}`}
      // @ts-expect-error unknown error
      form={form}
      index={index}
      canRemove={form.getValues().lineItems.length > 1}
    />
  ));

  const totalAmount = form
    .getValues()
    ?.lineItems?.reduce((acc, item) => acc + Number(item.totalCost), 0);

  useEffect(() => {
    if (totalAmount) {
      form.setFieldValue("totalAmount", totalAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount]);

  useEffect(() => {
    if (verifyBankAccount?.data?.account_name && currentAccountNumber) {
      form.setFieldValue("accountName", verifyBankAccount.data.account_name);
      // setLastVerifiedAccountNumber(currentAccountNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyBankAccount?.data?.account_name, currentAccountNumber]);

  // Handle bank account verification errors
  useEffect(() => {
    if (isErrorVerifyBankAccount) {
      form.setFieldValue("accountName", "");
      toast({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message:
          // @ts-expect-error unknown error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          errorVerifyBankAccount?.response?.data?.message ??
          "Failed to verify bank account",
        variant: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorVerifyBankAccount, errorVerifyBankAccount]);

  useEffect(() => {
    if (opened) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text className="font-inter text-lg leading-12 font-bold text-[#1E1E1E] sm:text-xl sm:leading-12">
          Submit New Invoice
        </Text>
      }
      classNames={{
        body: "sm:pb-10",
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Stack className="gap-y-[30px] sm:gap-y-10">
          <DatePickerInput
            label="Date of Invoice"
            placeholder="Enter invoice date"
            rightSectionPointerEvents="none"
            rightSection={<CalenderDatePickerIcon />}
            {...form.getInputProps("date")}
          />

          <Stack className="gap-y-3 sm:gap-y-4">
            <Group className="justify-between">
              <Text className="font-poppins text-xs leading-[13px] font-semibold text-[#1E1E1E] sm:text-base sm:leading-[17px]">
                Line Items
              </Text>
              <ActionIcon
                variant="transparent"
                className="text-primary w-fit text-[11px] leading-[13px] font-medium sm:text-sm sm:leading-[17px]"
                onClick={() =>
                  form.insertListItem("lineItems", {
                    description: "",
                    quantity: 0,
                    unitCost: 0,
                  })
                }
              >
                Add Item
              </ActionIcon>
            </Group>

            {fields}
          </Stack>

          <Stack className="gap-y-3 sm:gap-y-4">
            <Text className="font-poppins text-xs leading-[13px] font-semibold text-[#1E1E1E] sm:text-base sm:leading-[17px]">
              Payment Details
            </Text>
            <TextInput
              label="Total Amount (N)"
              placeholder="Enter Amount"
              {...form.getInputProps("totalAmount")}
              value={numeral(form.getValues().totalAmount).format("0,0.00")}
              disabled
            />
            <Select
              key={bankNameResetKey}
              label="Bank Name"
              placeholder="Select Bank"
              searchable
              data={bankListOptions}
              onChange={handleBankChange}
              error={form.errors.bankName}
              value={form.getValues().bankName}
            />
            <TextInput
              label="Account Number"
              placeholder="Enter Account Number"
              rightSection={isVerifying ? <Loader size={20} /> : null}
              rightSectionPointerEvents="none"
              onChange={(event) =>
                handleAccountNumberChange(event.currentTarget.value)
              }
              error={form.errors.accountNumber}
            />
            <TextInput
              label="Account Name"
              placeholder="Enter Account Name"
              disabled
              {...form.getInputProps("accountName")}
            />
          </Stack>
        </Stack>
        <Button
          loading={isPending}
          type="submit"
          fullWidth
          className="mt-[30px] sm:mt-10"
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default GenerateReportModal;
