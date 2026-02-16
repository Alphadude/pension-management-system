"use client";
import AuthFormContainer from "@/components/layout/auth-form-container";
import { useSignup } from "@/hooks/mutate/use-auth";
import { useGetAllDiocese } from "@/hooks/query/use-diocese";
import { useGetAllParishes } from "@/hooks/query/use-parish";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { cn } from "@/lib/utils";
import type { SignupFormValues } from "@/types/common";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  FileInput,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { boolean, mixed, object, ref, string } from "yup";

const initialValues: SignupFormValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  nextOfKinFirstName: "",
  nextOfKinLastName: "",
  nextOfKinPhoneNumber: "",
  nextOfKinEmail: "",
  password: "",
  confirmPassword: "",
  terms: false,
  dateOfBirth: null,
  gender: "",
  diocese: "",
  parish: "",
  nationalIdentityNumber: "",
  birtCertificate: null,
  baptismCertificate: null,
  firstSchoolLeavingCertificate: null,
  nationalIdentityCard: null,
};

// Step 1 Validation Schema
const step1Schema = object({
  firstName: string().trim().required("First name is required"),
  middleName: string().trim().optional(),
  lastName: string().trim().required("Last name is required"),
  email: string()
    .trim()
    .email("Email address is incorrect")
    .required("Email address is required"),
  phoneNumber: string().trim().required("Phone number is required"),
  nextOfKinFirstName: string()
    .trim()
    .required("Next of kin first name is required"),
  nextOfKinLastName: string()
    .trim()
    .required("Next of kin last name is required"),
  nextOfKinPhoneNumber: string()
    .trim()
    .required("Next of kin phone number is required"),
  nextOfKinEmail: string().trim().required("Next of kin email is required"),
  password: string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: string()
    .trim()
    .oneOf([ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  terms: boolean().oneOf([true], "You must agree to terms"),
});

// Step 2 Validation Schema
const step2Schema = object({
  dateOfBirth: string().required("Date of birth is required"),
  gender: string()
    .oneOf(["Male", "Female", "other"], "Gender is required")
    .required("Gender is required"),
  diocese: string()
    .notOneOf(["Select Diocese"], "Please select a valid diocese")
    .required("Diocese is required"),
  parish: string()
    .notOneOf(["Select Parish"], "Please select a valid parish")
    .required("Parish is required"),
  nationalIdentityNumber: string()
    .required("National Identity Number is required")
    .max(11, "NIN cannot be more than 11 characters"),
});

// Step 3 Validation Schema
const step3Schema = object({
  birtCertificate: mixed()
    .nullable()
    .optional()
    .test(
      "fileSize",
      "File size must be less than 3MB",
      (value) =>
        !value || (value instanceof File && value.size <= 3 * 1024 * 1024),
    ),
  baptismCertificate: mixed()
    .required("Baptism certificate is required")
    .test(
      "fileSize",
      "File size must be less than 3MB",
      (value) =>
        !value || (value instanceof File && value.size <= 3 * 1024 * 1024),
    ),
  firstSchoolLeavingCertificate: mixed()
    .nullable()
    .optional()
    .test(
      "fileSize",
      "File size must be less than 3MB",
      (value) =>
        !value || (value instanceof File && value.size <= 3 * 1024 * 1024),
    ),
  nationalIdentityCard: mixed()
    .nullable()
    .optional()
    .test(
      "fileSize",
      "File size must be less than 3MB",
      (value) =>
        !value || (value instanceof File && value.size <= 3 * 1024 * 1024),
    ),
});

const SignupPage = () => {
  const { mutate, isPending } = useSignup();
  const [active, setActive] = useState(0);
  const passwordVisibility = usePasswordVisibility();
  const confirmPasswordVisibility = usePasswordVisibility();
  const { data: diocesesData } = useGetAllDiocese();
  const { data: parishesData, updateQuery } = useGetAllParishes();

  const form = useForm({
    initialValues,
    validate: yupResolver(
      active === 0 ? step1Schema : active === 1 ? step2Schema : step3Schema,
    ),
  });

  const nextStep = () => {
    if (form.validate().hasErrors) {
      return; // Prevent moving to the next step if there are validation errors
    }
    setActive((current) => (current < 2 ? current + 1 : current)); // Adjust based on the number of steps
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmitForm = async (values: SignupFormValues) => {
    console.warn(form.values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "terms") return;
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    mutate(formData);
  };

  useEffect(() => {
    const selectedDioceseId = form.values.diocese;
    // reset parish value when diocese changes
    form.setFieldValue("parish", "");
    if (selectedDioceseId) {
      updateQuery("diocese", selectedDioceseId);
    } else {
      updateQuery("diocese", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.diocese]);

  return (
    <AuthFormContainer>
      <Box className="w-full px-[20px] py-[40px] lg:w-[500px]">
        <Box>
          <Text className="text-[28px] font-bold text-[#1E1E1E] lg:text-[32px]">
            Get Started Now
          </Text>
          <Text className="text-[14px] font-normal text-[#6B7280] lg:text-base">
            Let’s create your account
          </Text>
        </Box>
        <form onSubmit={form.onSubmit(handleSubmitForm)}>
          <Stepper
            color="#2E5AAC"
            active={active}
            size="sm"
            className="mt-6"
            classNames={{
              step: "!p-0  relative",
              stepBody: "absolute -left-[24px] top-10",
              separator: "-ml-[2px] -mr-[2px] h-1.5",
              content: "pt-[70px]",
            }}
          >
            <Stepper.Step
              completedIcon={
                <Text className="text-[13px] leading-[14px] font-normal md:text-base md:leading-[17px]">
                  1
                </Text>
              }
              label={
                <Text
                  className={cn(
                    "text-center text-[10px] font-normal lg:text-sm lg:leading-[17px]",
                    {
                      "text-primary": active >= 0,
                    },
                  )}
                >
                  Getting Started
                </Text>
              }
            >
              <Stack gap={24}>
                <Stack gap={16}>
                  {/* <SimpleGrid className="items-start md:grid-cols-2">
                    <TextInput
                      label="First Name"
                      placeholder="Enter your First Name"
                      {...form.getInputProps("firstName")}
                    />
                    <TextInput
                      label="Middle Name"
                      placeholder="Enter your Middle Name"
                      {...form.getInputProps("middleName")}
                    />
                  </SimpleGrid> */}
                  <TextInput
                    label="First Name"
                    placeholder="Enter your First Name"
                    {...form.getInputProps("firstName")}
                  />
                  <TextInput
                    label="Middle Name"
                    placeholder="Enter your Middle Name"
                    {...form.getInputProps("middleName")}
                  />
                  {/* <SimpleGrid className="items-start md:grid-cols-2">
                    <TextInput
                      label="Last Name"
                      placeholder="Enter your Last Name"
                      {...form.getInputProps("lastName")}
                    />
                    <TextInput
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      {...form.getInputProps("email")}
                    />
                  </SimpleGrid> */}
                  <TextInput
                    label="Last Name"
                    placeholder="Enter your Last Name"
                    {...form.getInputProps("lastName")}
                  />
                  <TextInput
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    {...form.getInputProps("email")}
                  />
                  <TextInput
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    {...form.getInputProps("phoneNumber")}
                  />
                  <TextInput
                    label="Next of Kin First Name"
                    placeholder="Enter your Next of Kin First Name"
                    {...form.getInputProps("nextOfKinFirstName")}
                  />
                  <TextInput
                    label="Next of Kin Last Name"
                    placeholder="Enter your Next of Kin Last Name"
                    {...form.getInputProps("nextOfKinLastName")}
                  />
                  <TextInput
                    label="Next of Kin Email"
                    placeholder="Enter your Next of Kin Email"
                    {...form.getInputProps("nextOfKinEmail")}
                    type="email"
                  />
                  <TextInput
                    label="Next of Kin Phone Number"
                    placeholder="Enter your Next of Kin Phone Number"
                    {...form.getInputProps("nextOfKinPhoneNumber")}
                  />
                  <SimpleGrid className="items-start md:grid-cols-2">
                    <TextInput
                      label="Password"
                      placeholder="Enter your password"
                      type={passwordVisibility.type}
                      {...form.getInputProps("password")}
                      rightSection={
                        <ActionIcon
                          variant="transparent"
                          onClick={passwordVisibility.toggle}
                        >
                          <passwordVisibility.Icon color="#1E1E1E" size={16} />
                        </ActionIcon>
                      }
                    />
                    <TextInput
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      type={confirmPasswordVisibility.type}
                      {...form.getInputProps("confirmPassword")}
                      rightSection={
                        <ActionIcon
                          variant="transparent"
                          onClick={confirmPasswordVisibility.toggle}
                        >
                          <confirmPasswordVisibility.Icon
                            color="#1E1E1E"
                            size={16}
                          />
                        </ActionIcon>
                      }
                    />
                  </SimpleGrid>
                  <Checkbox
                    label={
                      <Text className="text-sm font-normal text-[#6B7280]">
                        By selecting Continue, you agree to our
                        <Link className="text-[#2E5AAC]" href={""}>
                          {" "}
                          Terms of Service
                        </Link>{" "}
                        and acknowledge our{" "}
                        <Link className="text-[#2E5AAC]" href={""}>
                          Privacy Policy
                        </Link>
                        .
                      </Text>
                    }
                    {...form.getInputProps("terms", { type: "checkbox" })}
                  />
                </Stack>
                <Button onClick={nextStep}>Next</Button>
                <Group gap={8} justify="center" align="center">
                  <Text className="font-poppins text-sm leading-[17px] text-[#1E1E1E]">
                    Already have an account?
                  </Text>
                  <Link
                    href="/"
                    className="text-primary font-inter text-sm leading-[17px] font-normal"
                  >
                    Sign in
                  </Link>
                </Group>
              </Stack>
            </Stepper.Step>
            <Stepper.Step
              completedIcon={
                <Text className="text-[13px] leading-[14px] font-normal md:text-base md:leading-[17px]">
                  2
                </Text>
              }
              label={
                <Text
                  className={cn(
                    "text-center text-[10px] font-normal lg:text-sm lg:leading-[17px]",
                    {
                      "text-primary": active >= 1,
                    },
                  )}
                >
                  Personal Information
                </Text>
              }
            >
              <Stack gap={24}>
                <Stack gap={16}>
                  <DatePickerInput
                    label="Enter Date of Birth"
                    placeholder="Pick date"
                    rightSection={<Calendar size={16} />}
                    {...form.getInputProps("dateOfBirth")}
                  />
                  <Select
                    label="Gender"
                    placeholder="Select Gender"
                    data={["Male", "Female", "other"]}
                    {...form.getInputProps("gender")}
                  />
                  <Select
                    label="Diocese"
                    data={diocesesData?.doc?.map((diocese) => ({
                      value: diocese._id,
                      label: `${diocese.name}`,
                    }))}
                    placeholder="Select Diocese"
                    {...form.getInputProps("diocese")}
                  />
                  <Select
                    label="Parish"
                    data={parishesData?.doc?.map((parish) => ({
                      value: parish._id,
                      label: `${parish.name}`,
                    }))}
                    placeholder="Select Parish"
                    {...form.getInputProps("parish")}
                  />
                  <TextInput
                    label="National Identity Number"
                    placeholder="Enter your NIN"
                    {...form.getInputProps("nationalIdentityNumber")}
                  />
                </Stack>
                <Stack gap={3}>
                  <Button onClick={nextStep}>Next</Button>
                  <Button
                    onClick={prevStep}
                    className="bg-transparent text-[#2E5AAC]"
                  >
                    Back
                  </Button>
                </Stack>
              </Stack>
            </Stepper.Step>
            <Stepper.Step
              label={
                <Text
                  className={cn(
                    "text-center text-[10px] font-normal lg:text-sm lg:leading-[17px]",
                    {
                      "text-[#2E5AAC]": active === 2,
                    },
                  )}
                >
                  Document Uploads
                </Text>
              }
            >
              <Stack gap={24}>
                <Stack gap={16}>
                  <FileInput
                    label="Birth Certificate"
                    placeholder={
                      <Group gap={10}>
                        <Box className="h-[29px] rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                          Choose File
                        </Box>{" "}
                        <Text className="text-[14px] font-normal text-[#1E1E1E]">
                          No file chosen
                        </Text>
                      </Group>
                    }
                    accept="image/png,image/jpeg,image/jpg,application/pdf"
                    clearable
                    {...form.getInputProps("birtCertificate")}
                  />
                  <FileInput
                    label="Baptism Certificate"
                    placeholder={
                      <Group gap={10}>
                        <Box className="h-[29px] rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                          Choose File
                        </Box>{" "}
                        <Text className="text-[14px] font-normal text-[#1E1E1E]">
                          No file chosen
                        </Text>
                      </Group>
                    }
                    accept="image/png,image/jpeg,image/jpg,application/pdf"
                    clearable
                    {...form.getInputProps("baptismCertificate")}
                  />
                  <FileInput
                    label="First School Leaving Certificate"
                    placeholder={
                      <Group gap={10}>
                        <Button className="h-[29px] rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                          Choose File
                        </Button>{" "}
                        <Text className="text-[14px] font-normal text-[#1E1E1E]">
                          No file chosen
                        </Text>
                      </Group>
                    }
                    accept="image/png,image/jpeg,image/jpg,application/pdf"
                    clearable
                    {...form.getInputProps("firstSchoolLeavingCertificate")}
                  />
                  <FileInput
                    label="National Identity Card"
                    placeholder={
                      <Group gap={10}>
                        <Button className="h-[29px] rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                          Choose File
                        </Button>{" "}
                        <Text className="text-[14px] font-normal text-[#1E1E1E]">
                          No file chosen
                        </Text>
                      </Group>
                    }
                    accept="image/png,image/jpeg,image/jpg,application/pdf"
                    clearable
                    {...form.getInputProps("nationalIdentityCard")}
                  />
                </Stack>
                <Stack gap={3}>
                  <Button
                    onClick={async () => {
                      if (!form.validate().hasErrors) {
                        await handleSubmitForm(form.values); // Only submit if there are no validation errors
                      }
                    }}
                    loading={isPending}
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={prevStep}
                    className="bg-transparent text-[#2E5AAC]"
                  >
                    Back
                  </Button>
                </Stack>
              </Stack>
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </form>
      </Box>
    </AuthFormContainer>
  );
};

export default SignupPage;
