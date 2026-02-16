"use client";

import { Box, Button, Modal, Text } from "@mantine/core";

interface DocumentViewerProps {
  opened: boolean;
  onClose: () => void;
  documentName: string;
  documentUrl?: string;
}

const DocumentViewer = ({
  opened,
  onClose,
  documentName,
  documentUrl,
}: DocumentViewerProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      centered
      withCloseButton={false}
      padding={0}
      radius="md"
    >
      {/* Header */}
      <Box className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
        <Text className="text-lg font-semibold text-[#1E1E1E]">
          {documentName}
        </Text>
        <Box className="flex items-center gap-2"></Box>
      </Box>

      {/* Document Display Area */}
      <Box className="flex min-h-[500px] items-center justify-center bg-[#F9FAFB] p-6">
        {documentUrl ? (
          // iframe is perfectly fine in Next.js for PDFs
          <iframe
            src={documentUrl}
            className="h-[600px] w-full rounded-lg border-0 bg-white"
            title={documentName}
          />
        ) : (
          // Placeholder
          <Box className="text-center">
            <Box className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-lg bg-[#E5E7EB]">
              <Text className="text-4xl text-[#9CA3AF]">📄</Text>
            </Box>
            <Text className="mb-2 text-lg font-medium text-[#1E1E1E]">
              Document Preview
            </Text>
            <Text className="text-sm text-[#6B7280]">{documentName}</Text>
          </Box>
        )}
      </Box>

      <Box className="border-t border-[#E5E7EB] bg-white px-8 py-4">
        <Box className="flex justify-end gap-3">
          <Button
            variant="filled"
            className="bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DocumentViewer;
