"use client";
import { Parish } from "@/components/parish";
import ViewDocumentListItem from "@/components/ui/view-document-list-item";
import { useGetUser } from "@/hooks/query/use-user";
import { getAgefromBirthdate } from "@/lib/utils";
import {
  Avatar,
  Box,
  Button,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ChangeStatusModal from "./change-status-modal";

interface Props {
  opened: boolean;
  onClose: VoidFunction;
  contributorId: string;
}

export default function UserProfileModal({
  opened,
  onClose,
  contributorId,
}: Props) {
  const { data } = useGetUser(contributorId);
  const [
    isStatusModalOpen,
    { open: openChangeStatusModal, close: closeChangeStatusModal },
  ] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        // size={"lg"}
        size="auto"
        radius={16}
        centered
        classNames={{
          content: "rounded-[16px] p-0",
          header: "px-6 pt-6 pb-0",
          body: "px-6 pb-6 pt-0",
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Stack gap={16}>
          <Group justify="space-between" align="center" className="mb-2">
            <Group gap={12}>
              <Avatar
                size={56}
                radius={48}
                src={
                  typeof data?.doc?.user?.profilePhoto === "object"
                    ? data?.doc?.user?.profilePhoto.url
                    : (data?.doc?.user?.profilePhoto ?? undefined)
                }
              />
              <Box>
                <Text className="text-3xl font-bold text-[#1E1E1E]">
                  User Profile
                </Text>
                <Text className="text-sm font-normal text-[#6B7280]">
                  Complete profile information for{" "}
                  {data?.doc?.user?.firstName ?? ""}{" "}
                  {data?.doc?.user?.lastName ?? ""}
                </Text>
              </Box>
            </Group>
          </Group>
          <Stack gap={16}>
            <Text className="text-xl font-bold text-[#1E1E1E]">
              Personal Information
            </Text>
            <Stack className="border-b border-[#e5e7eb] pb-4">
              <Group align="center" justify="space-between">
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Full Name
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    {data?.doc?.user?.firstName} {data?.doc?.user?.lastName}
                  </Text>
                </Box>
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    User ID
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    {data?.doc?.user?.id}
                  </Text>
                </Box>
              </Group>
              <Group align="center" justify="space-between">
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Email
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    {data?.doc?.user?.email}
                  </Text>
                </Box>
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Phone
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    {data?.doc?.user?.phoneNumber}
                  </Text>
                </Box>
              </Group>
              <Group align="center" justify="space-between">
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Gender
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    {data?.doc?.user?.gender}
                  </Text>
                </Box>
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Age
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    {getAgefromBirthdate(data?.doc?.user?.dob ?? "")}
                  </Text>
                </Box>
              </Group>
            </Stack>
          </Stack>
          <Stack gap={16}>
            <Text className="text-xl font-bold text-[#1E1E1E]">
              Parish & Status
            </Text>
            <Stack className="border-b border-[#e5e7eb] pb-4">
              <Group align="center" justify="space-between">
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Parish
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    <Parish parishId={data?.doc?.user?.parish ?? ""} />
                  </Text>
                </Box>
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Status
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    {data?.doc?.user?.status}
                  </Text>
                </Box>
              </Group>
              <Group align="center" justify="space-between">
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Join Date
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    {data?.doc?.user?.createdAt}
                  </Text>
                </Box>
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Pension Payement Start Date
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    USR-001
                  </Text>
                </Box>
              </Group>
            </Stack>
          </Stack>
          <Stack>
            <Text className="text-xl font-bold text-[#1E1E1E]">
              Uploaded Documents
            </Text>
            <Stack>
              {data?.doc?.user?.birtCertificate && (
                <ViewDocumentListItem
                  docType="Birth Certificate"
                  status={data?.doc?.user?.birtCertificate?.status ?? ""}
                  url={data?.doc?.user?.birtCertificate?.url ?? ""}
                />
              )}
              {data?.doc?.user?.baptismCertificate && (
                <ViewDocumentListItem
                  docType="Baptism Certificate"
                  status={data?.doc?.user?.baptismCertificate?.status ?? ""}
                  url={data?.doc?.user?.baptismCertificate?.url ?? ""}
                />
              )}
              {data?.doc?.user?.firstSchoolLeavingCertificate && (
                <ViewDocumentListItem
                  docType="First School Leaving Certificate"
                  status={
                    data?.doc?.user?.firstSchoolLeavingCertificate?.status ?? ""
                  }
                  url={
                    data?.doc?.user?.firstSchoolLeavingCertificate?.url ?? ""
                  }
                />
              )}
            </Stack>
          </Stack>
          <Stack>
            <Text className="text-xl font-bold text-[#1E1E1E]">
              Contribution Information
            </Text>
            <Stack className="border-b border-[#e5e7eb] pb-4">
              <Group align="center" justify="space-between">
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Last Pension Payment
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    John Michael Smith
                  </Text>
                </Box>
                <Box>
                  <Text className="text-sm font-medium text-[#1E1E1E]">
                    Total Pension Payed
                  </Text>
                  <Text className="text-sm font-normal text-[#6B7280]">
                    USR-001
                  </Text>
                </Box>
              </Group>
            </Stack>
          </Stack>
          <Group justify="flex-end" align="center">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={openChangeStatusModal}>Change Status</Button>
          </Group>
        </Stack>
      </Modal>
      <ChangeStatusModal
        opened={isStatusModalOpen}
        onClose={closeChangeStatusModal}
        contributorId=""
      />
    </>
  );
}
