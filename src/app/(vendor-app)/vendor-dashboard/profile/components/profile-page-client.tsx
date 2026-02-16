"use client";
import AnimateComponent from "@/components/ui/animate-component";
import DocumentListItem from "@/components/ui/document-list-item";
import {
  ContactInformationSkeleton,
  PersonalInformationSkeleton,
  UploadedDocumentSkeleton,
  UserProfileCardSkeleton,
} from "@/components/ui/profile-loaders";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useUpdateProfile } from "@/hooks/mutate/use-profile";
import useProfileOverview from "@/hooks/query/use-profile-overview";
import { serviceCategory } from "@/lib/service-category";
import {
  cn,
  getProfileStatusColor,
  handleDropzoneReject,
  handleUploadFile,
  MAX_SIZE_BYTES,
  type ProfileStatus,
} from "@/lib/utils";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone, type FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useDisclosure, useMounted } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import ChangePasswordModal from "./change-password-modal";

const ProfilePageClient = () => {
  const { data: sessionData, update } = useSession();
  const mounted = useMounted();
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending } = useUpdateProfile(update);

  const { data, isLoading } = useProfileOverview();
  const user = data?.doc?.user;

  const initialValues = {
    phone: user?.phoneNumber ?? "",
    email: user?.email ?? "",
    businessAddress: user?.businessAddress ?? "",
    businessType: user?.businessType ?? "",
    companyName: user?.companyName ?? "",
    serviceCategory: user?.serviceCategory ?? "",
    contactPerson: user?.contactPerson ?? "",
    reoccuring: user?.reoccuring ?? "",
  };

  const form = useForm({
    initialValues,
  });

  useEffect(() => {
    form.setValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmitForm = (values: typeof initialValues) => {
    mutate({
      businessType: values.businessType,
      businessAddress: values.businessAddress,
      contactPerson: values.contactPerson,
      serviceCategory: values.serviceCategory,
    });
  };

  const uploadFile = (file: FileWithPath) => {
    const formData = new FormData();
    formData.append("profilePhoto", file);
    mutate(formData);
  };

  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <form
        onSubmit={form.onSubmit(handleSubmitForm)}
        className="min-h-screen bg-gray-50 py-10 md:px-4"
      >
        <Box className="max-w-[900px]">
          <Title
            order={2}
            className="mb-2 font-[inter] text-[16px] sm:text-[28px]"
          >
            My Profile
          </Title>
          <SkeletonWrapper
            isLoading={isLoading}
            Loader={UserProfileCardSkeleton}
          >
            <Card
              shadow="sm"
              padding="lg"
              radius="lg"
              withBorder
              className="mb-6 bg-white"
            >
              <Group
                align="center"
                gap="md"
                className="flex-row flex-nowrap rounded-md p-2"
              >
                <Box className="relative h-24 w-24">
                  <Dropzone
                    maxSize={MAX_SIZE_BYTES}
                    accept={["image/jpeg", "image/png", "image/gif"]}
                    onReject={handleDropzoneReject}
                    onDrop={(files) =>
                      handleUploadFile(files[0] ?? null, uploadFile)
                    }
                    className="!h-full !w-full !border-none !bg-transparent"
                    loading={isPending}
                  >
                    <Avatar
                      color="initials"
                      src={sessionData?.user?.profilePhoto?.url}
                      key={sessionData?.user?.profilePhoto?.url ?? "no-avatar"}
                      name={`${sessionData?.user.firstName ?? ""} ${sessionData?.user.lastName ?? ""}`}
                      className="absolute top-0 left-0 h-full w-full object-cover"
                      classNames={{
                        placeholder: "text-2xl md:text-4xl",
                      }}
                    />
                  </Dropzone>
                </Box>

                <Stack gap={2} className="flex-grow">
                  <Text className="text-[14px] leading-[20px] font-semibold text-[#1F2937] lg:text-[20px] lg:leading-[28px] lg:font-bold">
                    {sessionData?.user.firstName ?? ""}{" "}
                    {sessionData?.user.lastName ?? ""}
                  </Text>

                  <Text className="font-poppins text-[12px] text-gray-500 lg:text-[14px]">
                    Vendor ID: {sessionData?.user?._id}
                  </Text>

                  <Text className="font-poppins text-[14px] text-[#1F2937] lg:text-[16px]">
                    Vendor Category
                  </Text>

                  <Text className="font-poppins text-[12px] text-gray-500 lg:text-[14px]">
                    {user?.reoccuring === true
                      ? "Re-Occurring Vendor"
                      : "Non-Reoccurring Vendor"}
                  </Text>
                  <Badge
                    variant="light"
                    className={cn(
                      "font-poppins w-fit rounded-[20px] text-xs leading-[17px] font-normal capitalize",
                      getProfileStatusColor(user?.status as ProfileStatus),
                    )}
                  >
                    {user?.status}
                  </Badge>
                </Stack>
              </Group>
            </Card>
          </SkeletonWrapper>
          <Card
            shadow="sm"
            padding="lg"
            radius="lg"
            withBorder
            className="mb-6 bg-white"
          >
            <Title
              order={3}
              className="mb-6 text-lg font-semibold text-gray-900"
            >
              Personal Information
            </Title>
            <SkeletonWrapper
              isLoading={isLoading}
              Loader={PersonalInformationSkeleton}
            >
              <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Business Type"
                    placeholder="Select business type"
                    data={["Business/Enterprise", "Individual"]}
                    {...form.getInputProps("businessType")}
                  />
                </Grid.Col>
                {user?.reoccuring === false && (
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Company Name"
                      placeholder="Enter company name"
                      {...form.getInputProps("companyName")}
                    />
                  </Grid.Col>
                )}
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Service Category"
                    placeholder="IT Services"
                    data={serviceCategory}
                    {...form.getInputProps("serviceCategory")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Contact Person"
                    placeholder="Enter full name of contact person"
                    {...form.getInputProps("contactPerson")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Business Address"
                    placeholder="Enter business address"
                    {...form.getInputProps("businessAddress")}
                  />
                </Grid.Col>
              </Grid>
            </SkeletonWrapper>
          </Card>
          <Card shadow="sm" radius="md" className="mt-6 bg-white p-6">
            <Stack>
              <Title order={3} className="text-gray-900">
                Contact Information
              </Title>
              <SkeletonWrapper
                isLoading={isLoading}
                Loader={ContactInformationSkeleton}
              >
                <Grid gutter="md">
                  <Grid.Col span={{ sm: 6 }}>
                    <TextInput
                      label="Phone Number"
                      placeholder="e.g. 08012345678"
                      {...form.getInputProps("phone")}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ sm: 6 }}>
                    <TextInput
                      label="Email Address"
                      placeholder="e.g. you@example.com"
                      {...form.getInputProps("email")}
                      disabled
                    />
                  </Grid.Col>
                </Grid>
              </SkeletonWrapper>
            </Stack>
          </Card>
          <Card shadow="sm" radius="md" className="mt-6 bg-white p-6">
            <Title order={3} className="mb-4 text-gray-900">
              Uploaded Documents
            </Title>
            <SkeletonWrapper
              isLoading={isLoading}
              Loader={UploadedDocumentSkeleton}
            >
              <Stack>
                {user?.reoccuring === true ? (
                  <>
                    {user?.validGovernmentId?.url && (
                      <DocumentListItem
                        docType="Valid Government Issued ID"
                        status={user?.validGovernmentId?.status}
                        url={user?.validGovernmentId?.url}
                      />
                    )}
                    {user?.utilityBills?.url && (
                      <DocumentListItem
                        docType="Proof of Address (Utility Bills)"
                        status={user?.utilityBills?.status}
                        url={user?.utilityBills?.url}
                      />
                    )}
                    {user?.passportPhotograph?.url && (
                      <DocumentListItem
                        docType="Passport Photograph"
                        status={user?.passportPhotograph?.status}
                        url={user?.passportPhotograph?.url}
                      />
                    )}
                    {!user?.validGovernmentId?.url &&
                      !user?.utilityBills?.url &&
                      !user?.passportPhotograph?.url && (
                        <Text c="dimmed" ta="center" py="md">
                          No documents uploaded for recurring vendor
                        </Text>
                      )}
                  </>
                ) : (
                  <>
                    {user?.cacRegistration?.url && (
                      <DocumentListItem
                        docType="CAC Registration"
                        status={user?.cacRegistration?.status}
                        url={user?.cacRegistration?.url}
                      />
                    )}
                    {user?.taxIdentificationNumber?.url && (
                      <DocumentListItem
                        docType="Tax Identification Number (TIN)"
                        status={user?.taxIdentificationNumber?.status}
                        url={user?.taxIdentificationNumber?.url}
                      />
                    )}
                    {user?.industryCertifications?.url && (
                      <DocumentListItem
                        docType="Industry Certifications"
                        status={user?.industryCertifications?.status}
                        url={user?.industryCertifications?.url}
                      />
                    )}
                    {user?.workPortfolio?.url && (
                      <DocumentListItem
                        docType="Work Portfolio"
                        status={user?.workPortfolio?.status}
                        url={user?.workPortfolio?.url}
                      />
                    )}
                    {user?.referenceLetters?.url && (
                      <DocumentListItem
                        docType="Reference Letters"
                        status={user?.referenceLetters?.status}
                        url={user?.referenceLetters?.url}
                      />
                    )}
                    {!user?.cacRegistration?.url &&
                      !user?.taxIdentificationNumber?.url &&
                      !user?.industryCertifications?.url &&
                      !user?.workPortfolio?.url &&
                      !user?.referenceLetters?.url && (
                        <Text c="dimmed" ta="center" py="md">
                          No documents uploaded for non-recurring vendor
                        </Text>
                      )}
                  </>
                )}
              </Stack>
            </SkeletonWrapper>
          </Card>
        </Box>
        <Stack
          mt={55}
          className="shadow-[rgba(0, 0, 0, 0.05)] max-w-[900px] gap-[18px] rounded-[12px] bg-white p-5 md:gap-6 md:px-5 md:pt-[12px] md:pb-5"
        >
          <Stack className="gap-4 md:gap-3">
            <Group align="center" justify="space-between">
              <Text className="text-xl font-bold text-[#1F2937]">
                Security Settings
              </Text>
              {/* <Switch /> */}
            </Group>
            <Checkbox
              label="Enable Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              classNames={{
                label: "font-semibold text-sm text-[#374151]",
                description: "text-xs font-normal text-[#6B7280]",
              }}
            />
          </Stack>
          <Button
            variant="transparent"
            classNames={{
              root: "w-[200px]",
              label: "text-[#2E5AAC] text-medium text-sm",
            }}
            onClick={open}
          >
            Change Password
          </Button>
        </Stack>
        <Button
          type="submit"
          mt={44}
          className="flex items-end justify-self-end"
          loading={isPending}
        >
          Save Changes
        </Button>
      </form>
      <ChangePasswordModal close={close} opened={opened} />
    </AnimateComponent>
  );
};

export default ProfilePageClient;
