"use client";
import { BlueUser } from "@/components/icons/blue-user";
import AnimateComponent from "@/components/ui/animate-component";
import { useCreateContribution } from "@/hooks/mutate/use-contribution";
import { useGetUser } from "@/hooks/query/use-user";
import { routes } from "@/lib/routes";
import type { CreateContributionFormValues } from "@/types/common";
import {
  Avatar,
  Badge,
  Box,
  Button,
  FileInput,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";

import { useForm, yupResolver } from "@mantine/form";
import { useMounted } from "@mantine/hooks";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Phone, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { mixed, number, object, string } from "yup";

const initialValues = {
  user: "",
  year: null,
  month: null,
  contributorType: "",
  station: "",
  salary: 0,
};
const validateSchema = object({
  year: string().required("Year is required"),
  month: string().required("Month is required"),
  amount: number()
    .required("Salary is required")
    .min(1, "Salary must be greater than 0"),
  supportingDocuments: mixed().nullable(),
});

const EnterPensionClient = () => {
  const params = useParams();
  const userId = params?.["pensioner-id"] as string;
  const [_opened, _setOpened] = useState(false);
  const mounted = useMounted();
  const [_submitModalOpened, setSubmitModalOpened] = useState(false);
  const { mutate, isPending } = useCreateContribution();

  const { data: userData } = useGetUser(userId);

  const form = useForm<CreateContributionFormValues>({
    initialValues,
    validate: yupResolver(validateSchema),
  });

  const handleSubmit = (values: CreateContributionFormValues) => {
    const payload = {
      ...values,
      user: userId,
      salary: Number(values.salary),
    };

    mutate(payload, {
      onSuccess: () => {
        form.reset();
        setSubmitModalOpened(true);
      },
    });
  };

  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Stack gap={16}>
        <Stack className="flex flex-col items-start rounded-[12px] border-b border-[#F3F4F6] bg-white px-2 py-2.5 md:p-6">
          <Stack gap={4} className="w-full md:gap-4">
            <Link
              className="flex items-center gap-2 text-xs font-semibold text-[#2E5AAC]"
              href={routes.parishDashboard.monthlyContribution}
            >
              <ArrowLeft size={16} />
              Go Back
            </Link>
            <Stack gap={4} className="md:gap-2">
              <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
                Search Pensioners
              </Text>
              <Text className="text-[10px] font-normal text-[#6B7280] md:text-sm">
                Search by Name, ID, or Email
              </Text>
            </Stack>
            <TextInput
              leftSection={<Search color="#9CA3AF" size={20} />}
              placeholder="Rev. John Smith"
              classNames={{
                input: "h-[32px] md:h-[42px] w-full",
              }}
              // value={search ?? ""}
              // onChange={async (e) => {
              //   await setSearch(e.target.value);
              // }}
            />
          </Stack>
        </Stack>
        {/* Main Grid */}
        <Box className="grid items-start gap-6 md:grid-cols-2">
          <Stack gap={24} className="rounded-[24px] bg-white md:p-6">
            <Group justify="space-between" mb="md">
              <Group gap="xs">
                <BlueUser />
                <Text className="text-sm font-bold text-[#1E1E1E] md:text-xl">
                  Pensioner Profile
                </Text>
              </Group>
              <Text
                size="sm"
                className="font-medium text-[#2E5AAC]"
                component="button"
                // onClick={() => setOpened(true)}
              >
                Add Start Date
              </Text>
            </Group>
            <Group align="center" gap={4}>
              <Avatar
                src={
                  typeof userData?.doc?.user?.profilePhoto === "string"
                    ? userData?.doc?.user?.profilePhoto
                    : userData?.doc?.user?.profilePhoto?.url
                }
                alt="John Michael Smith"
                radius="xl"
                className="h-[28px] w-[28px] md:h-[38px] md:w-[38px]"
              />
              <Box>
                <Text fw={700}>
                  {userData?.doc?.user?.firstName ?? ""}{" "}
                  {userData?.doc?.user?.lastName ?? ""}
                </Text>
                <Text fw={400} size="sm" c="dimmed">
                  {userData?.doc?.user?.email ?? ""}
                </Text>
              </Box>
              <Badge
                color="green"
                variant="light"
                ml="auto"
                className="normal-case"
              >
                {userData?.doc?.user?.status}
              </Badge>
            </Group>
            <Group justify="space-between" align="center" className="w-full">
              <Group gap="xs" className="flex items-center">
                <Phone size={18} className="text-gray-500" />
                <Text size="sm" className="text-[#6B7280]">
                  {userData?.doc?.user?.phoneNumber}
                </Text>
              </Group>
              <Group gap="xs" className="flex items-center">
                <Calendar size={18} className="text-gray-500" />
                <Text size="sm" className="text-[#6B7280]">
                  Joined:{" "}
                  {userData?.doc?.user?.createdAt
                    ? format(userData?.doc?.user?.createdAt, "MMM d, yyyy")
                    : ""}
                </Text>
              </Group>
            </Group>
            <Box className="space-y-2 rounded-lg bg-gray-50 p-3">
              <Box className="flex justify-between">
                <Box component="span">Last Known Salary:</Box>
                <Box component="span" className="font-semibold text-[#2E5AAC]">
                  {"₦0.00"}
                </Box>
              </Box>
            </Box>
          </Stack>
          {/* Contribution Form */}
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="min-h-[500px] rounded-3xl bg-white p-6"
          >
            <Text fw={700} size="20px" mb="md">
              Add Payment
            </Text>
            <Box className="space-y-4">
              <TextInput
                label="Amount"
                placeholder="Enter Station"
                {...form.getInputProps("station")}
              />

              <YearPickerInput
                label="Year"
                placeholder="Select Year"
                clearable
                {...form.getInputProps("year")}
              />
              <MonthPickerInput
                label="Month"
                placeholder="Select Month"
                clearable
                {...form.getInputProps("month")}
              />

              <FileInput label="Supporting Documents" />
              <Button
                fullWidth
                color="blue"
                size="md"
                radius="lg"
                type="submit"
                loading={isPending}
              >
                Confirm & Submit
              </Button>
            </Box>
          </form>

          {/* <Modal
            opened={submitModalOpened}
            onClose={() => setSubmitModalOpened(false)}
            size="sm"
            centered
          >
            <Text className="text-center text-[32px] font-bold">
              Success!
            </Text>

            <Text style={{ fontSize: 16 }}>
              Contribution has been added for{" "}
              <Text component="span" fw={700}>
                John Michael Smith
              </Text>
            </Text>

            <Button
              fullWidth
              color="blue"
              size="md"
              radius="lg"
              onClick={() => {
                setSubmitModalOpened(false);
              }}
            >
              Close
            </Button>
          </Modal> */}
        </Box>
      </Stack>
    </AnimateComponent>
  );
};

export default EnterPensionClient;
