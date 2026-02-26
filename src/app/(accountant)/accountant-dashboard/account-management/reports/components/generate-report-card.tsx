"use client";

import { useGenerateAccountingReport } from "@/hooks/query/use-accounting";
import type { GenerateReportPayload } from "@/types/accounting";
import {
  Box,
  Button,
  Divider,
  Group,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Download, FileText } from "lucide-react";
import { z } from "zod";

const reportSchema = z.object({
  type: z.enum(["TrialBalance", "IncomeExpenditure", "BalanceSheet", "Notes"], {
    required_error: "Report type is required",
  }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  format: z.enum(["PDF", "Excel"]),
});

const reportTypes = [
  { value: "TrialBalance", label: "Trial Balance" },
  { value: "IncomeExpenditure", label: "Income & Expenditure (P&L)" },
  { value: "BalanceSheet", label: "Balance Sheet" },
  { value: "Notes", label: "Notes to Accounts" },
];

const GenerateReportCard = () => {
  const { mutate, isPending } = useGenerateAccountingReport();

  const form = useForm({
    validate: zodResolver(reportSchema),
    initialValues: {
      type: "TrialBalance" as
        | "TrialBalance"
        | "IncomeExpenditure"
        | "BalanceSheet"
        | "Notes",
      startDate: new Date(new Date().getFullYear(), 0, 1), // Start of current year
      endDate: new Date(),
      format: "PDF" as "PDF" | "Excel",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const payload: GenerateReportPayload = {
      ...values,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    };

    mutate(payload, {
      onSuccess: (data) => {
        notifications.show({
          title: "Report Generated",
          message: "Your report is ready for download.",
          color: "green",
        });
        if (data?.fileUrl) {
          window.open(data.fileUrl, "_blank");
        }
      },
      onError: () => {
        notifications.show({
          title: "Generation Failed",
          message: "Could not generate the requested report.",
          color: "red",
        });
      },
    });
  };

  return (
    <Box className="max-w-3xl rounded-[16px] border border-[#F3F4F6] bg-white p-6 shadow-[0px_10px_20px_0px_rgba(206,206,206,0.15)] md:p-8">
      <Group gap="sm" mb="lg">
        <FileText size={24} className="text-blue-600" />
        <Text className="text-[18px] font-semibold text-[#111827]">
          Generate Custom Report
        </Text>
      </Group>

      <Divider mb="xl" color="gray.2" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Select
            label="Report Type"
            description="Select the financial statement you wish to generate"
            placeholder="Select report"
            data={reportTypes}
            withAsterisk
            classNames={{ description: "mb-2" }}
            {...form.getInputProps("type")}
          />

          <Group grow align="flex-start">
            <DateInput
              label="Start Date"
              placeholder="Select start date"
              withAsterisk
              {...form.getInputProps("startDate")}
            />
            <DateInput
              label="End Date"
              placeholder="Select end date"
              withAsterisk
              {...form.getInputProps("endDate")}
            />
          </Group>

          <Select
            label="Export Format"
            data={[
              { value: "PDF", label: "PDF Document (.pdf)" },
              { value: "Excel", label: "Excel Spreadsheet (.xlsx)" },
            ]}
            withAsterisk
            {...form.getInputProps("format")}
          />

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              loading={isPending}
              leftSection={<Download size={16} />}
              size="md"
            >
              Generate & Download
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};

export default GenerateReportCard;
