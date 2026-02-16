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
import { useGetAllDiocese } from "@/hooks/query/use-diocese";
import { useGetAllParishes } from "@/hooks/query/use-parish";
import useProfileOverview from "@/hooks/query/use-profile-overview";
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
  Grid,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Dropzone, type FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useMounted } from "@mantine/hooks";
import { CalendarDays } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import SecuritySettingsCard from "./security-settings-card";

const ProfileClient = () => {
  const { update, data: sessionData } = useSession();
  const mounted = useMounted();
  const { mutate, isPending } = useUpdateProfile(update);
  const { data, isLoading } = useProfileOverview();
  const { data: diocesesData } = useGetAllDiocese();
  const { data: parishesData } = useGetAllParishes();

  const user = data?.doc?.user;

  const initialValues = {
    fullName: `${user?.firstName} ${user?.lastName}`,
    dateOfBirth: user?.dateOfBirth ?? null,
    gender: user?.gender ?? "",
    diocese: user?.diocese ?? "",
    parish: user?.parish ?? "",
    phone: user?.phoneNumber ?? "",
    email: user?.email ?? "",
    nextOfKinFirstName: user?.nextOfKinFirstName ?? "",
    nextOfKinLastName: user?.nextOfKinLastName ?? "",
    nextOfKinPhoneNumber: user?.nextOfKinPhoneNumber ?? "",
    nextOfKinEmail: user?.nextOfKinEmail ?? "",
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
      gender: values.gender,
      diocese: values.diocese,
      parish: values.parish,
      phoneNumber: values.phone,
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
          <Title order={2} className="mb-4">
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
                className="flex-wrap sm:flex-nowrap"
              >
                <Box className="relative h-20 w-20 md:h-24 md:w-24">
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
                      key={sessionData?.user?.profilePhoto?.url ?? "no-avatar"}
                      color="initials"
                      src={sessionData?.user?.profilePhoto?.url}
                      className="absolute top-0 left-0 h-full w-full object-cover"
                      size={80}
                      name={`${sessionData?.user.firstName ?? ""} ${sessionData?.user.lastName ?? ""}`}
                      classNames={{
                        placeholder: "text-2xl md:text-4xl",
                      }}
                    />
                  </Dropzone>
                </Box>

                <Stack gap={4} className="flex-grow">
                  <Text size="lg" fw={700} className="text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Pension ID: NPX–2024–001
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

          <Card shadow="sm" radius="md" className="bg-white p-6">
            <Stack>
              <Title order={3} className="text-gray-900">
                Personal Information
              </Title>
              <SkeletonWrapper
                isLoading={isLoading}
                Loader={PersonalInformationSkeleton}
              >
                <Grid gutter="md">
                  <Grid.Col span={{ sm: 6 }}>
                    <TextInput
                      label="Full Name"
                      disabled
                      {...form.getInputProps("fullName")}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ sm: 6 }}>
                    <DateInput
                      label="Date of Birth"
                      placeholder="15 / 05 / 1980"
                      {...form.getInputProps("dateOfBirth")}
                      disabled
                      clearable
                      rightSection={<CalendarDays size={16} color="gray" />}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ sm: 6 }}>
                    <Select
                      label="Gender"
                      placeholder="Select gender"
                      data={["Male", "Female"]}
                      disabled
                      {...form.getInputProps("gender")}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ sm: 6 }}>
                    <Select
                      label="Diocese"
                      data={diocesesData?.doc?.map((diocese) => ({
                        value: diocese._id,
                        label: `${diocese.name}`,
                      }))}
                      placeholder="Select Diocese"
                      {...form.getInputProps("diocese")}
                      disabled
                    />
                  </Grid.Col>

                  <Grid.Col span={{ sm: 6 }}>
                    <Select
                      label="Parish"
                      data={parishesData?.doc?.map((parish) => ({
                        value: parish._id,
                        label: `${parish.name}`,
                      }))}
                      placeholder="Select Parish"
                      {...form.getInputProps("parish")}
                      disabled
                    />
                  </Grid.Col>
                </Grid>
              </SkeletonWrapper>
            </Stack>
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
                      disabled
                      {...form.getInputProps("phone")}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ sm: 6 }}>
                    <TextInput
                      label="Email Address"
                      disabled
                      {...form.getInputProps("email")}
                    />
                  </Grid.Col>
                </Grid>
              </SkeletonWrapper>
            </Stack>
          </Card>

          <Card shadow="sm" radius="md" className="mt-6 bg-white p-6">
            <Stack>
              <Title order={3} className="text-gray-900">
                Next of Kin Information
              </Title>
              <SkeletonWrapper
                isLoading={isLoading}
                Loader={ContactInformationSkeleton}
              >
                <Grid gutter="md">
                  <Grid.Col span={{ sm: 6 }}>
                    <TextInput
                      label="Next of Kin First Name"
                      placeholder="e.g. John"
                      disabled
                      {...form.getInputProps("nextOfKinFirstName")}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ sm: 6 }}>
                    <TextInput
                      label="Next of Kin Last Name"
                      placeholder="e.g. Doe"
                      disabled
                      {...form.getInputProps("nextOfKinLastName")}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ sm: 6 }}>
                    <TextInput
                      label="Next of Kin Phone Number"
                      placeholder="e.g. 08012345678"
                      disabled
                      {...form.getInputProps("nextOfKinPhoneNumber")}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ sm: 6 }}>
                    <TextInput
                      label="Next of Kin Email Address"
                      placeholder="e.g. john.doe@example.com"
                      disabled
                      {...form.getInputProps("nextOfKinEmail")}
                    />
                  </Grid.Col>
                </Grid>
              </SkeletonWrapper>
            </Stack>
          </Card>

          <Card
            shadow="sm"
            padding="lg"
            radius="lg"
            withBorder
            className="mt-6 mb-6 bg-white"
          >
            <Stack>
              <Title order={3} className="text-gray-900">
                Uploaded Document
              </Title>

              <SkeletonWrapper
                isLoading={isLoading}
                Loader={UploadedDocumentSkeleton}
              >
                <Stack>
                  {user?.birtCertificate?.url && (
                    <DocumentListItem
                      docType="Birth Certificate"
                      status={user?.birtCertificate?.status}
                      url={user?.birtCertificate?.url}
                    />
                  )}
                  {user?.firstSchoolLeavingCertificate?.url && (
                    <DocumentListItem
                      docType="First school Leaving Certificate"
                      status={user?.firstSchoolLeavingCertificate?.status}
                      url={user?.firstSchoolLeavingCertificate?.url}
                    />
                  )}
                  {user?.baptismCertificate?.url && (
                    <DocumentListItem
                      docType="Baptism Certificate"
                      status={user?.baptismCertificate?.status}
                      url={user?.baptismCertificate?.url}
                    />
                  )}
                </Stack>
              </SkeletonWrapper>
            </Stack>
          </Card>

          <SecuritySettingsCard />

          <Box className="mt-6 flex justify-end">
            <Button
              type="submit"
              loading={isPending}
              className="bg-[#2E5AAC] font-semibold text-white uppercase hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </form>
    </AnimateComponent>
  );
};

export default ProfileClient;
