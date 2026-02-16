"use client";
import ViewDocumentListItem from "@/components/ui/view-document-list-item";
import { useGetUser } from "@/hooks/query/use-user";
import { Modal, Stack, Text } from "@mantine/core";

interface Props {
  opened: boolean;
  close: VoidFunction;
  userId: string;
}

const SubmittedDocumentsModal = ({ opened, close, userId }: Props) => {
  const { data } = useGetUser(userId);

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={close}
        title="View Contributor Profile"
        classNames={{
          title: "text-xl font-bold text-[#1E1E1E]",
        }}
      >
        <Stack gap={16}>
          <Stack>
            <Text className="text-xl font-bold text-[#1E1E1E]">
              View Documents ({data?.doc?.user?.firstName ?? ""}{" "}
              {data?.doc?.user?.lastName ?? ""})
            </Text>
            <Stack>
              {data?.doc?.user?.cacRegistration?.url && (
                <ViewDocumentListItem
                  docType="CAC Registration"
                  field="cacRegistration"
                  userId={userId}
                  status={data?.doc?.user?.cacRegistration?.status ?? ""}
                  url={data?.doc?.user?.cacRegistration?.url ?? ""}
                />
              )}

              {data?.doc?.user?.taxIdentificationNumber?.url && (
                <ViewDocumentListItem
                  docType="Tax Identification Number"
                  field="taxIdentificationNumber"
                  userId={userId}
                  status={
                    data?.doc?.user?.taxIdentificationNumber?.status ?? ""
                  }
                  url={data?.doc?.user?.taxIdentificationNumber?.url ?? ""}
                />
              )}

              {data?.doc?.user?.industryCertifications?.url && (
                <ViewDocumentListItem
                  docType="Industry Certifications"
                  field="industryCertifications"
                  userId={userId}
                  status={data?.doc?.user?.industryCertifications?.status ?? ""}
                  url={data?.doc?.user?.industryCertifications?.url ?? ""}
                />
              )}

              {data?.doc?.user?.workPortfolio?.url && (
                <ViewDocumentListItem
                  docType="Work Portfolio"
                  field="workPortfolio"
                  userId={userId}
                  status={data?.doc?.user?.workPortfolio?.status ?? ""}
                  url={data?.doc?.user?.workPortfolio?.url ?? ""}
                />
              )}

              {data?.doc?.user?.referenceLetters?.url && (
                <ViewDocumentListItem
                  docType="Reference Letters"
                  field="referenceLetters"
                  userId={userId}
                  status={data?.doc?.user?.referenceLetters?.status ?? ""}
                  url={data?.doc?.user?.referenceLetters?.url ?? ""}
                />
              )}

              {data?.doc?.user?.validGovernmentId?.url && (
                <ViewDocumentListItem
                  docType="Valid Government ID"
                  field="validGovernmentId"
                  userId={userId}
                  status={data?.doc?.user?.validGovernmentId?.status ?? ""}
                  url={data?.doc?.user?.validGovernmentId?.url ?? ""}
                />
              )}

              {data?.doc?.user?.utilityBills?.url && (
                <ViewDocumentListItem
                  docType="Utility Bills"
                  field="utilityBills"
                  userId={userId}
                  status={data?.doc?.user?.utilityBills?.status ?? ""}
                  url={data?.doc?.user?.utilityBills?.url ?? ""}
                />
              )}

              {data?.doc?.user?.passportPhotograph?.url && (
                <ViewDocumentListItem
                  docType="Passport Photograph"
                  field="passportPhotograph"
                  userId={userId}
                  status={data?.doc?.user?.passportPhotograph?.status ?? ""}
                  url={data?.doc?.user?.passportPhotograph?.url ?? ""}
                />
              )}

              {data?.doc?.user?.birtCertificate?.url && (
                <ViewDocumentListItem
                  docType="Birth Certificate"
                  field="birtCertificate"
                  userId={userId}
                  status={data?.doc?.user?.birtCertificate?.status ?? ""}
                  url={data?.doc?.user?.birtCertificate?.url ?? ""}
                />
              )}

              {data?.doc?.user?.nationalIdentityCard?.url && (
                <ViewDocumentListItem
                  docType="National Identity Card"
                  field="nationalIdentityCard"
                  userId={userId}
                  status={data?.doc?.user?.nationalIdentityCard?.status ?? ""}
                  url={data?.doc?.user?.nationalIdentityCard?.url ?? ""}
                />
              )}

              {data?.doc?.user?.firstSchoolLeavingCertificate?.url && (
                <ViewDocumentListItem
                  docType="First School Leaving Certificate"
                  field="firstSchoolLeavingCertificate"
                  userId={userId}
                  status={
                    data?.doc?.user?.firstSchoolLeavingCertificate?.status ?? ""
                  }
                  url={
                    data?.doc?.user?.firstSchoolLeavingCertificate?.url ?? ""
                  }
                />
              )}
              {data?.doc?.user?.baptismCertificate?.url && (
                <ViewDocumentListItem
                  docType="Baptism Certificate"
                  field="baptismCertificate"
                  userId={userId}
                  status={data?.doc?.user?.baptismCertificate?.status ?? ""}
                  url={data?.doc?.user?.baptismCertificate?.url ?? ""}
                />
              )}
            </Stack>
          </Stack>
          {/* <Group justify="flex-end" align="center">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={openChangeStatusModal}>Change Status</Button>
                    </Group> */}
        </Stack>
      </Modal>
    </>
  );
};

export default SubmittedDocumentsModal;
