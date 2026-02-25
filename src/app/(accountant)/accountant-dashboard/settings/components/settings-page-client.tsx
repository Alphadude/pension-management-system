"use client";
import AnimateComponent from "@/components/ui/animate-component";
import {
  PersonalInformationSkeleton,
  UserProfileCardSkeleton,
} from "@/components/ui/profile-loaders";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useUpdateProfile } from "@/hooks/mutate/use-profile";
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
  Checkbox,
  Grid,
  Group,
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

const SettingsPageClient = () => {
  const mounted = useMounted();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: sessionData, update } = useSession();
  const { mutate, isPending } = useUpdateProfile(update);

  const { data, isLoading } = useProfileOverview();
  const user = data?.doc?.user;

  const initialValues = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phone: user?.phoneNumber ?? "",
  };

  const form = useForm({
    initialValues,
  });

  useEffect(() => {
    form.setValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const uploadFile = (file: FileWithPath) => {
    const formData = new FormData();
    formData.append("profilePhoto", file);
    mutate(formData);
  };

  const handleSubmitForm = (values: typeof initialValues) => {
    mutate({
      firstName: values.firstName,
      lastName: values.lastName,
    });
  };

  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <form
        onSubmit={form.onSubmit(handleSubmitForm)}
        className="min-h-screen bg-gray-50 xl:px-4"
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
                    // loading={isPending}
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
                    Parish Admin: {sessionData?.user?.parish}
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
                  <TextInput
                    label="First Name"
                    placeholder="John"
                    {...form.getInputProps("firstName")}
                    disabled
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Doe"
                    {...form.getInputProps("lastName")}
                    disabled
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Email"
                    placeholder="user@gmail.com"
                    {...form.getInputProps("email")}
                    disabled
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Phone number"
                    placeholder="08012345678"
                    {...form.getInputProps("phone")}
                    disabled
                  />
                </Grid.Col>
              </Grid>
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

export default SettingsPageClient;
