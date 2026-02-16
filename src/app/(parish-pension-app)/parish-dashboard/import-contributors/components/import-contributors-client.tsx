"use client";
import { BigFileIcon } from "@/components/icons/big-file-icon";
import AnimateComponent from "@/components/ui/animate-component";
import BackButton from "@/components/ui/back-button";
import { toast } from "@/components/ui/toast";
import { useImportContributor } from "@/hooks/mutate/use-parish";
import { routes } from "@/lib/routes";
import { handleDropzoneReject } from "@/lib/utils";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useDisclosure, useMounted } from "@mantine/hooks";
import { UploadIcon } from "lucide-react";
import Papa from "papaparse";
import { useState } from "react";
import ContributorDataPreviewTable from "./contributor-data-preview-table";
import { expectedHeaders } from "./extras";
import SuccessModal from "./success-modal";

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

const ImportContributorsClient = () => {
  const mounted = useMounted();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
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

  const handleImportContributors = () => {
    const formData = new FormData();
    const csvFile = new Blob(
      [
        Papa.unparse(contributors, {
          header: true,
        }),
      ],
      { type: "text/csv" },
    );
    formData.append("file", csvFile, "contributors.csv");
    mutation(formData, {
      onSuccess: () => {
        open();
        setContributors([]);
      },
    });
  };

  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Stack gap={16} className="md:gap-10">
        <Stack
          gap={8}
          className="rounded-2xl bg-[#fff] px-2 pt-2 pb-[18px] md:gap-4 md:p-6"
        >
          <BackButton />
          <Stack gap={4} className="md:gap-2">
            <Text className="text-base font-semibold text-[#1F2937] md:text-xl md:font-bold">
              Import Contributor
            </Text>
            <Text className="text-[10px] leading-2.5 font-normal text-[#6B7280] md:text-xs">
              Search by Name,ID, or Email
            </Text>
          </Stack>
        </Stack>
        {!contributors.length && (
          <Box className="rounded-2xl bg-[#fff] p-6 md:p-10">
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
                    File should contain contributor information with proper
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
            <Group justify="flex-end" align="center" mb={100}>
              <Button
                variant="outline"
                component="a"
                href={routes.parishDashboard.importContributors}
                className="text-xs font-medium text-[#1E40AF]"
              >
                Back to Upload
              </Button>
              <Button loading={isPending} onClick={handleImportContributors}>
                Import {contributors.length} Contributors
              </Button>
            </Group>
          </>
        )}
        <SuccessModal
          opened={opened}
          onClose={close}
          totalRecords={contributors.length ?? 0}
          successfulImports={contributors.length ?? 0}
          skippedRecords={0}
          importDate={new Date().toDateString()}
        />
      </Stack>
    </AnimateComponent>
  );
};

export default ImportContributorsClient;
