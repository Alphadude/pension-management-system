"use client";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Badge, Button, Loader, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { Download, FileText, Info, Upload } from "lucide-react";
import { useState } from "react";

type Props = {
  status: string;
  url: string;
  docType: string;
};

const STATUS: Record<
  string,
  {
    name: string;
    style: string;
  }
> = {
  verified: {
    name: "Verified",
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

const DocumentListItem = ({ status, url, docType }: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        toast({
          variant: "error",
          message: "Failed to download document",
        });
        return;
      }
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      const ext = url.split(".").pop();
      link.download = `${docType}.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // free memory
      URL.revokeObjectURL(blobUrl);
      setIsDownloading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setIsDownloading(false);
      toast({
        variant: "error",
        message: "Failed to download document",
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
        {status === "rejected" && (
          <Dropzone
            // onReject={handleDropzoneReject}
            onDrop={() => console.warn("file dropped")}
            className="!h-full !w-full !border-none !bg-transparent !p-0"
            // loading={isPending}
          >
            <Button
              // onClick={handleDownload}
              className="bg-transparent text-[#2E5AAC] capitalize"
              leftSection={<Upload size={20} className="text-[#2E5AAC]" />}
              aria-label="Download Birth Certificate"
            >
              Upload
            </Button>
          </Dropzone>
        )}
        {status === "approved" ||
          (status === "pending" && (
            <Button
              onClick={handleDownload}
              className="bg-transparent text-[#2E5AAC] capitalize"
              leftSection={<Download size={20} className="text-[#2E5AAC]" />}
              aria-label="Download Birth Certificate"
            >
              {isDownloading ? <Loader size={20} /> : "Download"}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default DocumentListItem;
