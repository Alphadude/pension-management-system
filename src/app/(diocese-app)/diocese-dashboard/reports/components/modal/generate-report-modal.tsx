import { CalenderDatePickerIcon } from "@/components/icons/calendar-icon";
import { useGenerateReport } from "@/hooks/mutate/use-report";
import type { GenerateReportFormValues } from "@/types/common";
import { Button, Modal, Select, Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { object, string } from "yup";

type Props = {
  opened: boolean;
  close: () => void;
};

const initialValues: GenerateReportFormValues = {
  startDate: null,
  endDate: null,
  reportType: "Monthly",
};

const validateSchema = object({
  startDate: string().required("Start date is required"),
  endDate: string().required("End date is required"),
  reportType: string().optional(),
});

const GenerateReportModal = ({ opened, close }: Props) => {
  const { mutate: generateReport, isPending } = useGenerateReport();
  const form = useForm<GenerateReportFormValues>({
    initialValues,
    validate: yupResolver(validateSchema),
  });

  const handleSubmitForm = (values: GenerateReportFormValues) => {
    generateReport(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      radius={12}
      centered
      title={
        <Text className="font-poppins text-dark text-base leading-[17px] font-semibold">
          Generate Report
        </Text>
      }
      className="sm:px-[25px] sm:py-10"
    >
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Stack gap={16}>
          <DatePickerInput
            label="Start Date"
            placeholder="Enter start date"
            rightSectionPointerEvents="none"
            rightSection={<CalenderDatePickerIcon />}
            {...form.getInputProps("startDate")}
          />
          <DatePickerInput
            label="End Date"
            placeholder="Enter end date"
            rightSectionPointerEvents="none"
            rightSection={<CalenderDatePickerIcon />}
            {...form.getInputProps("endDate")}
          />
          <Select
            label="Report Type"
            placeholder="Select report type"
            data={["Quarterly", "Monthly"]}
            {...form.getInputProps("reportType")}
          />
          <Button type="submit" loading={isPending}>
            Generate
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default GenerateReportModal;
