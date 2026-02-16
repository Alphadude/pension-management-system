"use client";
import { GreenCheckCircleIcon } from "@/components/icons/green-check-circle-icon";
import AuthFormContainer from "@/components/layout/auth-form-container";
import { useVendorSignup } from "@/hooks/mutate/use-auth";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { routes } from "@/lib/routes";
import { serviceCategory } from "@/lib/service-category";
import { cn } from "@/lib/utils";
import type { vendorSignupFormValues } from "@/types/common";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  FileInput,
  Group,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "./vendor-registration-schemas";

const initialValues: vendorSignupFormValues = {
  reoccuring: "",
  businessType: "",
  companyName: "",
  serviceCategory: "",
  contactPerson: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  businessAddress: "",
  cacRegistration: null,
  taxIdentificationNumer: null,
  industryCertifications: null,
  workPortfolio: null,
  referenceLetters: null,
  validGovernmentId: null,
  utilityBills: null,
  passportPhotograph: null,
  terms: false,
};

const SignupPage = () => {
  const [active, setActive] = useState(0);
  const passwordVisibility = usePasswordVisibility();
  const confirmPasswordVisibility = usePasswordVisibility();
  const { mutate, isPending } = useVendorSignup();

  const form = useForm<vendorSignupFormValues>({
    initialValues,
    validate: yupResolver(
      active === 0
        ? step1Schema
        : active === 1
          ? step2Schema
          : active === 2
            ? step3Schema
            : step4Schema,
    ),
  });

  const nextStep = () => {
    if (form.validate().hasErrors) {
      return; // Prevent moving to the next step if there are validation errors
    }
    setActive((current) => (current < 4 ? current + 1 : current)); // Adjust based on the number of steps
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmitForm = async (values: vendorSignupFormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "terms") return;
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    mutate(formData, {
      onSuccess: () => {
        nextStep();
      },
    });
  };

  return (
    <AuthFormContainer>
      <Box
        className={cn("w-full py-[40px] lg:w-[500px]", { "pt-0": active >= 3 })}
      >
        <Box>
          <Text className="text-[24px] font-bold text-[#1E1E1E] lg:text-[32px]">
            {active === 0
              ? "Vendor Category Selection"
              : active >= 1 && active <= 2
                ? "Basic Information"
                : null}
          </Text>
          <Text className="text-[14px] font-normal text-[#6B7280] lg:text-base">
            {active <= 2 ? "Let’s create your account" : null}
          </Text>
        </Box>
        <form
          onSubmit={form.onSubmit(handleSubmitForm)}
          className="font-poppins"
        >
          <Stepper
            color="#2E5AAC"
            active={active}
            size="sm"
            className={cn(`mt-6`, {
              "mt-0": active >= 3,
            })}
            classNames={{
              step: `!p-0 relative ${active >= 3 ? "hidden" : null}`,
              stepBody: "absolute -left-[24px] top-10",
              separator: `-ml-[2px] -mr-[2px] h-1.5 ${active >= 3 ? "hidden" : null}`,
              content: ` ${active >= 3 ? "pt-0" : "pt-[70px]"}`,
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
              <Stack className="gap-10 md:gap-6">
                <Stack gap={16}>
                  <Radio.Group
                    {...form.getInputProps("reoccuring")}
                    classNames={{
                      root: "flex flex-col gap-1",
                    }}
                  >
                    <Stack gap={16}>
                      <Radio
                        classNames={{
                          label:
                            "text-[#1E1E1E] font-sm md:font-base font-medium pl-1",
                          description:
                            "text-xs md:text-sm font-normal text-[#6B7280] pl-0",
                        }}
                        label="Recurring Vendor"
                        description="Choose this if you provide ongoing services or regular supplies to our organisation."
                        color="rgba(0, 0, 0, 1)"
                        variant="outline"
                        value={"true"}
                      />
                      <Radio
                        classNames={{
                          label:
                            "text-[#1E1E1E] font-sm md:font-base font-medium pl-1",
                          description:
                            "text-xs md:text-sm font-normal text-[#6B7280] pl-0",
                        }}
                        color="rgba(0, 0, 0, 1)"
                        variant="outline"
                        label="Non-Recurring Vendor"
                        description="Choose this if you provide one-time or project-based services to our organisation."
                        value={"false"}
                      />
                    </Stack>
                  </Radio.Group>
                </Stack>
                <Stack gap={8}>
                  <Button onClick={nextStep}>Next</Button>
                  <Group gap={8} justify="center" align="center">
                    <Text className="font-poppins text-sm leading-[17px] text-[#1E1E1E]">
                      Already have an account?
                    </Text>
                    <Link
                      href={routes.auth.login}
                      className="text-primary font-inter text-sm leading-[17px] font-normal"
                    >
                      Sign in
                    </Link>
                  </Group>
                </Stack>
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
                  <SimpleGrid
                    className="w-full items-start"
                    cols={form.values.reoccuring === "false" ? 2 : 1}
                  >
                    <Select
                      label="Business Type"
                      placeholder="Business/Enterprise"
                      data={["Business/Enterprise", "Individual"]}
                      classNames={{
                        input: "h-[42px] rounded-[8px]",
                      }}
                      {...form.getInputProps("businessType")}
                    />
                    {form.values.reoccuring === "false" && (
                      <TextInput
                        label="Company Name"
                        placeholder="Enter company name"
                        {...form.getInputProps("companyName")}
                      />
                    )}
                  </SimpleGrid>
                  <SimpleGrid className="items-start md:grid-cols-2">
                    <Select
                      label="Service Category"
                      placeholder="IT Services"
                      data={serviceCategory}
                      classNames={{
                        input: "h-[42px] rounded-[8px]",
                      }}
                      {...form.getInputProps("serviceCategory")}
                    />
                    <TextInput
                      label="Contact Person"
                      placeholder="Enter full name of contact person"
                      {...form.getInputProps("contactPerson")}
                    />
                  </SimpleGrid>
                  <SimpleGrid className="items-start md:grid-cols-2">
                    <TextInput
                      label="Email Address"
                      placeholder="Enter Email Address"
                      {...form.getInputProps("email")}
                    />
                    <TextInput
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      {...form.getInputProps("phoneNumber")}
                    />
                  </SimpleGrid>
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
                  <TextInput
                    label="Business Address"
                    placeholder="Enter Business Address"
                    {...form.getInputProps("businessAddress")}
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
                  {form.values.reoccuring === "true" ? (
                    <>
                      <FileInput
                        label="Valid Government Issued ID"
                        placeholder={
                          <Group gap={10}>
                            <Box className="flex h-[29px] items-center rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                              Choose File
                            </Box>
                            <Text className="text-[14px] font-normal text-[#1E1E1E]">
                              No file chosen
                            </Text>
                          </Group>
                        }
                        accept="image/png,image/jpeg,image/jpg,application/pdf"
                        clearable
                        {...form.getInputProps("validGovernmentId")}
                      />{" "}
                      <FileInput
                        label="Proof of Address (Utility Bills)"
                        placeholder={
                          <Group gap={10}>
                            <Box className="flex h-[29px] items-center rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                              Choose File
                            </Box>
                            <Text className="text-[14px] font-normal text-[#1E1E1E]">
                              No file chosen
                            </Text>
                          </Group>
                        }
                        accept="image/png,image/jpeg,image/jpg,application/pdf"
                        clearable
                        {...form.getInputProps("utilityBills")}
                      />{" "}
                      <FileInput
                        label="Passport Photograph"
                        placeholder={
                          <Group gap={10}>
                            <Box className="flex h-[29px] items-center rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                              Choose File
                            </Box>
                            <Text className="text-[14px] font-normal text-[#1E1E1E]">
                              No file chosen
                            </Text>
                          </Group>
                        }
                        accept="image/png,image/jpeg,image/jpg,application/pdf"
                        clearable
                        {...form.getInputProps("passportPhotograph")}
                      />
                    </>
                  ) : (
                    <>
                      <SimpleGrid className="items-start md:grid-cols-2">
                        <FileInput
                          label="CAC Registration"
                          placeholder={
                            <Group gap={10}>
                              <Box className="flex h-[29px] items-center rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                                Choose File
                              </Box>
                              <Text className="text-[14px] font-normal text-[#1E1E1E]">
                                No file chosen
                              </Text>
                            </Group>
                          }
                          accept="image/png,image/jpeg,image/jpg,application/pdf"
                          clearable
                          {...form.getInputProps("cacRegistration")}
                        />
                        <FileInput
                          label="Tax Identification Number (TIN)"
                          placeholder={
                            <Group gap={10}>
                              <Box className="flex h-[29px] items-center rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                                Choose File
                              </Box>{" "}
                              <Text className="text-[14px] font-normal text-[#1E1E1E]">
                                No file chosen
                              </Text>
                            </Group>
                          }
                          accept="image/png,image/jpeg,image/jpg,application/pdf"
                          clearable
                          {...form.getInputProps("taxIdentificationNumer")}
                        />
                      </SimpleGrid>
                      <SimpleGrid className="items-start md:grid-cols-2">
                        <FileInput
                          label="Industry Certification(s)"
                          placeholder={
                            <Group gap={10}>
                              <Box className="flex h-[29px] items-center rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                                Choose File
                              </Box>{" "}
                              <Text className="text-[14px] font-normal text-[#1E1E1E]">
                                No file chosen
                              </Text>
                            </Group>
                          }
                          accept="image/png,image/jpeg,image/jpg,application/pdf"
                          clearable
                          {...form.getInputProps("industryCertifications")}
                        />
                        <FileInput
                          label="Work Portfolio"
                          placeholder={
                            <Group gap={10}>
                              <Box className="flex h-[29px] items-center rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                                Choose File
                              </Box>{" "}
                              <Text className="text-[14px] font-normal text-[#1E1E1E]">
                                No file chosen
                              </Text>
                            </Group>
                          }
                          accept="image/png,image/jpeg,image/jpg,application/pdf"
                          clearable
                          {...form.getInputProps("workPortfolio")}
                        />
                      </SimpleGrid>
                      <FileInput
                        label="Reference Letter(s)"
                        placeholder={
                          <Group gap={10}>
                            <Box className="flex h-[29px] items-center rounded-[2px] border border-[#D1D5DB] bg-[#D1D5DB33] px-[10px] py-[6px] text-[14px] font-normal text-[#1E1E1E]">
                              Choose File
                            </Box>{" "}
                            <Text className="text-[14px] font-normal text-[#1E1E1E]">
                              No file chosen
                            </Text>
                          </Group>
                        }
                        accept="image/png,image/jpeg,image/jpg,application/pdf"
                        clearable
                        {...form.getInputProps("referenceLetters")}
                      />
                    </>
                  )}
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
                      "text-[#2E5AAC]": active === 3,
                    },
                  )}
                >
                  Review & Submit
                </Text>
              }
            >
              <Box className="flex flex-col items-start gap-2.5">
                <Button
                  onClick={prevStep}
                  className="bg-transparent p-0 text-base font-medium text-[#2E5AAC]"
                  leftSection={<ArrowLeft size={16} />}
                >
                  Back
                </Button>
                <Stack gap={16}>
                  <Text className="text-2xl font-bold text-[#1E1E1E] md:text-[32px]">
                    Review & Submit
                  </Text>
                  <Stack gap={16}>
                    <Text className="text-xl font-bold text-[#1E1E1E]">
                      Business Information
                    </Text>
                    <SimpleGrid className="items-start md:grid-cols-2 md:gap-12">
                      <Box className="flex flex-col gap-1">
                        <Text className="text-sm font-medium text-[#1E1E1E]">
                          Vendor Type
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {form.values.reoccuring === "true"
                            ? "Recurring Vendor"
                            : "Non-Recurring Vendor"}
                        </Text>
                      </Box>
                      <Box className="flex flex-col gap-1">
                        <Text className="text-sm font-medium text-[#1E1E1E]">
                          Business Type
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {form.values.businessType}
                        </Text>
                      </Box>
                    </SimpleGrid>
                    <SimpleGrid className="items-start md:grid-cols-2 md:gap-12">
                      {form.values.reoccuring === "false" && (
                        <Box className="flex flex-col gap-1">
                          <Text className="text-sm font-medium text-[#1E1E1E]">
                            Company Name
                          </Text>
                          <Text className="text-sm font-normal text-[#6B7280]">
                            {form.values.companyName}
                          </Text>
                        </Box>
                      )}
                      <Box className="flex flex-col gap-1">
                        <Text className="text-sm font-medium text-[#1E1E1E]">
                          Service Category
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {form.values.serviceCategory}
                        </Text>
                      </Box>
                    </SimpleGrid>
                    <Text className="text-xl font-bold text-[#1E1E1E]">
                      Contact Information
                    </Text>
                    <SimpleGrid className="items-start md:grid-cols-2 md:gap-12">
                      <Box className="flex flex-col gap-1">
                        <Text className="text-sm font-medium text-[#1E1E1E]">
                          Contact Person
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {form.values.contactPerson}
                        </Text>
                      </Box>
                      <Box className="flex flex-col gap-1">
                        <Text className="text-sm font-medium text-[#1E1E1E]">
                          Email
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {form.values.email}
                        </Text>
                      </Box>
                    </SimpleGrid>
                    <SimpleGrid className="items-start md:grid-cols-2 md:gap-12">
                      <Box className="flex flex-col gap-1">
                        <Text className="text-sm font-medium text-[#1E1E1E]">
                          Phone
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {form.values.phoneNumber}
                        </Text>
                      </Box>
                      <Box className="flex flex-col gap-1">
                        <Text className="text-sm font-medium text-[#1E1E1E]">
                          Address
                        </Text>
                        <Text className="text-sm font-normal text-[#6B7280]">
                          {form.values.businessAddress}
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Stack>
                </Stack>
                <Stack gap={30} mt={20}>
                  <Checkbox
                    label={
                      "I confirm that all information provided is accurate and complete"
                    }
                    classNames={{
                      label: "text-sm font-normal text-[#6B7280] pl-[6px]",
                      body: "items-center",
                    }}
                    size="xs"
                    {...form.getInputProps("terms", { type: "checkbox" })}
                  />
                  <Button
                    onClick={async () => {
                      if (!form.validate().hasErrors) {
                        await handleSubmitForm(form.values);
                        // nextStep();
                      }
                    }}
                    loading={isPending}
                  >
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Stepper.Step>
            <Stepper.Completed>
              <Box className="flex flex-col gap-[18px]">
                <GreenCheckCircleIcon />
                <Box className="flex flex-col gap-2">
                  <Text className="text-2xl font-bold text-[#2E3139] md:text-[32px]">
                    Registration Complete!
                  </Text>
                  <Box>
                    <Text className="text-sm font-normal text-[#6B7280]">
                      Thank you for registering as a vendor. Your application
                      has been submitted successfully and is now under review.
                      You will receive an email confirmation shortly.{" "}
                    </Text>
                    <br />
                    <Text className="text-xl font-bold text-[#2E3139]">
                      {"What's"} Next?{" "}
                    </Text>
                    <Text className="text-sm font-normal text-[#6B7280]">
                      Our team will review your application within 3-5 business
                      days. You will be notified via email once the review is
                      complete.
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Stepper.Completed>
          </Stepper>
        </form>
      </Box>
    </AuthFormContainer>
  );
};

export default SignupPage;
