"use client";
import { EyeIcon } from "@/components/icons/eye-icon";
import type { GetAllUserResponse } from "@/types/common";
import { Button, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { documentLabels, KYCTableHeadings } from "./extras";
import SubmittedDocumentsModal from "./view-submitted-document-modal";

interface Props {
  data: GetAllUserResponse["doc"];
}

const KycTable = ({ data }: Props) => {
  const documentFields = Object.keys(
    documentLabels,
  ) as (keyof typeof documentLabels)[];
  const [contributorId, setContribuorId] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const rows = data?.map((user, index) => (
    <Table.Tr key={index}>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user.firstName ?? ""} {user.lastName ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user.email ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user.phoneNumber ?? ""}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {(() => {
          const submitted = documentFields
            .filter((field) => user?.[field]?.url)
            .map((field) => documentLabels[field]);

          return submitted.length > 0 ? submitted.join(", ") : "Not Submitted";
        })()}
      </Table.Td>
      <Button
        className="bg-transparent text-[#2E5AAC] capitalize"
        classNames={{
          label: "font-normal text-sm",
        }}
        leftSection={<EyeIcon />}
        onClick={() => {
          setContribuorId(user?.id);
          open();
        }}
      >
        View
      </Button>
    </Table.Tr>
  ));
  return (
    <>
      <Table
        highlightOnHover
        visibleFrom="sm"
        classNames={{
          thead:
            "bg-[#f9fafb] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[41px]",
          td: "h-[87px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {KYCTableHeadings.map((heading: string, index: number) => (
              <Table.Th key={`parish-management-table-heading-${index}`}>
                {heading}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <SubmittedDocumentsModal
        opened={opened}
        close={close}
        userId={contributorId}
      />
    </>
  );
};

export default KycTable;
