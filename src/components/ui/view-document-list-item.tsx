"use client";
import { useUpdateUserKycStatus } from "@/hooks/mutate/use-profile";
import { cn } from "@/lib/utils";
import { Badge, Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FileText, Info } from "lucide-react";
import { EyeIcon } from "../icons/eye-icon";
import VerifyDocumentModal from "./verify-document-modal";
import ViewDocumentModal from "./view-document-modal";

type Props = {
  status: string;
  url: string;
  docType: string;
  field?: string;
  userId?: string;
};

const STATUS: Record<
  string,
  {
    name: string;
    style: string;
  }
> = {
  verified: {
    name: "Approved",
    style: "bg-[#DCFCE7] text-[#166534]",
  },
  approved: {
    name: "Approved",
    style: "bg-[#DCFCE7] text-[#166534]",
  },
  pending: {
    name: "Pending Verification",
    style: "bg-[#FEF9C3] text-[#854D0E]",
  },
  rejected: {
    name: "Rejected",
    style: "bg-[#fdd9d7] text-[#F44336]",
  },
};

const getStatus = (status: string) => STATUS[status];

const ViewDocumentListItem = ({
  status,
  url,
  docType,
  field,
  userId,
}: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending } = useUpdateUserKycStatus(userId ?? "");

  const handleVerify = (payload: {
    field: string;
    status: "approved" | "rejected";
  }) => {
    if (userId) {
      mutate(payload, {
        onSuccess: () => close(),
      });
    }
  };

  return (
    <div className="mb-3 flex flex-col gap-4 rounded-lg border border-[#F3F4F6] p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#DBEAFE]">
          <FileText size={24} className="text-blue" />
        </div>

        <div className="flex flex-col">
          <Text fw={600}>{docType}</Text>
          {/* <Text c="dimmed" size="sm" className="mt-1">
            PDF • 1.3MB • Uploaded April 2, 2025
          </Text> */}
          <div className="flex items-end gap-[5px]">
            <Badge
              variant="light"
              className={cn(
                "font-inter mt-2 w-fit text-xs leading-4 font-medium capitalize",
                getStatus(status)?.style,
              )}
            >
              {getStatus(status)?.name}
            </Badge>
            {status === "rejected" && (
              <div className="flex items-center gap-[5px]">
                <Info size={12} color="#F44336" />{" "}
                <Text className="text-[10px] leading-4 font-normal text-[#F44336]">
                  Please upload a valid certificate
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 pl-10 md:mt-0">
        {status === "approved" ||
          (status === "pending" && (
            <Button
              className="bg-transparent text-[#2E5AAC] capitalize"
              classNames={{
                label: "font-normal text-sm",
              }}
              leftSection={<EyeIcon />}
              aria-label="Download Birth Certificate"
              onClick={open}
            >
              View
            </Button>
          ))}
      </div>
      {status === "pending" && field && userId && (
        <VerifyDocumentModal
          docType={docType}
          field={field}
          url={url}
          opened={opened}
          onClose={close}
          onVerify={handleVerify}
          isLoading={isPending}
        />
      )}
      {(status === "approved" || status === "rejected") && (
        <ViewDocumentModal
          docType={docType}
          url={url}
          opened={opened}
          onClose={close}
        />
      )}
    </div>
  );
};

export default ViewDocumentListItem;
