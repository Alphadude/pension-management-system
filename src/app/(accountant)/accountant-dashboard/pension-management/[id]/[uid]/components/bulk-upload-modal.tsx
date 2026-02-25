"use client";
import ContributorDataPreviewTable from "@/app/(parish-pension-app)/parish-dashboard/import-contributors/components/contributor-data-preview-table";
import { expectedHeaders } from "@/app/(parish-pension-app)/parish-dashboard/import-contributors/components/extras";
import SuccessModal from "@/app/(parish-pension-app)/parish-dashboard/import-contributors/components/success-modal";
import { BigFileIcon } from "@/components/icons/big-file-icon";
import { toast } from "@/components/ui/toast";
import { useImportContributor } from "@/hooks/mutate/use-parish";
import { handleDropzoneReject } from "@/lib/utils";
import { Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { UploadIcon } from "lucide-react";
import Papa from "papaparse";
import { useState } from "react";

interface Props {
  opened: boolean;
  close: () => void;
  parishId: string;
}

export interface Contributor {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  yearOfBirth: string;
  yearStarted: string;
  basicSalary: string;
  totalContribution: string;
}

const BulkUploadModal = ({ opened, close, parishId: _parishId }: Props) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [successOpened, { open: openSuccess, close: closeSuccess }] =
    useDisclosure(false);
  const { mutate: mutation, isPending } = useImportContributor();

  const handleDrop = (files: File[]) => {
    const file = files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedHeaders = (results.meta.fields ?? []).map((h) =>
            h.toLowerCase(),
          );

          // validate headers
          const missing = expectedHeaders.filter(
            (h) => !parsedHeaders.includes(h.toLowerCase()),
          );

          if (missing.length > 0) {
            toast({
              variant: "error",
              message: `Invalid CSV. Missing headers: ${missing.join(", ")}`,
            });
            return;
          }

          setContributors(results.data as Contributor[]);
        },
        error: (err) => {
          console.error("Parsing error:", err);
        },
      });
    }
  };

  const handleImport = () => {
    const formData = new FormData();
    const csvFile = new Blob(
      [
        Papa.unparse(contributors, {
          header: true,
        }),
      ],
      { type: "text/csv" },
    );
    formData.append("file", csvFile, "pensioners.csv");
    // If the API needs parishId separately, we'd append it, but the import-contributors might expect it inside the CSV or from headers/auth.
    // Based on useImportContributor, it just sends formData.
    mutation(formData, {
      onSuccess: () => {
        openSuccess();
        setContributors([]);
        // We don't close the main modal here, wait for SuccessModal interaction or just close it.
      },
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Bulk Upload Pensioners"
        size="xl"
        radius="md"
      >
        <Stack gap={16}>
          {!contributors.length && (
            <Box className="rounded-2xl bg-[#f9fafb] p-6 md:p-10">
              <Dropzone
                onDrop={handleDrop}
                onReject={handleDropzoneReject}
                maxSize={5 * 1024 ** 2}
                accept={["text/csv", "application/vnd.ms-excel"]}
              >
                <Stack
                  align="center"
                  justify="center"
                  mih={220}
                  style={{ pointerEvents: "none" }}
                  className="text-center"
                >
                  <Dropzone.Idle>
                    <BigFileIcon />
                  </Dropzone.Idle>
                  <Stack className="gap-2.5">
                    <Text className="text-base font-bold text-[#1E1E1E] md:text-xl">
                      Choose a CSV file to upload
                    </Text>
                    <Text className="text-sm font-normal text-[#6B7280] md:text-base">
                      File should contain pensioner information with proper
                      headers
                    </Text>
                  </Stack>
                  <Text className="flex items-center gap-2.5 rounded-[4px] border border-[#D1D5DB] p-3 text-base font-normal">
                    <Box component="span">
                      <UploadIcon size={16} />
                    </Box>
                    Select CSV File
                  </Text>
                </Stack>
              </Dropzone>
            </Box>
          )}

          {contributors.length > 0 && (
            <>
              <ContributorDataPreviewTable data={contributors} />
              <Group justify="flex-end" align="center">
                <Button
                  variant="outline"
                  onClick={() => setContributors([])}
                  disabled={isPending}
                >
                  Back to Upload
                </Button>
                <Button loading={isPending} onClick={handleImport}>
                  Import {contributors.length} Pensioners
                </Button>
              </Group>
            </>
          )}
        </Stack>
      </Modal>

      <SuccessModal
        opened={successOpened}
        onClose={() => {
          closeSuccess();
          close();
        }}
        totalRecords={contributors.length ?? 0}
        successfulImports={contributors.length ?? 0}
        skippedRecords={0}
        importDate={new Date().toDateString()}
      />
    </>
  );
};

export default BulkUploadModal;
