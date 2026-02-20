import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { FaintEyeIcon } from "@/components/icons/faint-eye-icon";
import { IbmCloudIcon } from "@/components/icons/ibm-cloud-icon";
import { ThreeDots } from "@/components/icons/three-dots";
import { UserXIcon } from "@/components/icons/user-x-icon";
import { Parish } from "@/components/parish";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetAllUsers } from "@/hooks/query/use-user";
import { cn } from "@/lib/utils";
import type {
  ContributionTypeOptions,
  GetAllUserResponse,
} from "@/types/common";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  Table,
  Text,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import ChangeParishModal from "./components/change-parish-modal";
import ChangeStatusModal from "./components/change-status-modal";
import { getContributorTypeStyle } from "./components/extras";
import UserProfileModal from "./components/user-profile-modal";
const contributorsTableHeadings = [
  "NAME",
  "USER ID",
  "PARISH",
  "STATUS",
  "LAST CONTRIBUTION",
  "TOTAL CONTRIBUTIONS",
  "ACTIONS",
];

type Props = {
  data: GetAllUserResponse["doc"];
};

const ContributorsDesktopTable = ({ data }: Props) => {
  const [
    isUserModalOpen,
    { open: openUserProfileModal, close: closeUserProfileModal },
  ] = useDisclosure(false);
  const [
    isStatusModalOpen,
    { open: openChangeStatusModal, close: closeChangeStatusModal },
  ] = useDisclosure(false);
  const [
    isParishModalOpen,
    { open: openChangeParishModal, close: closeChangeParishModal },
  ] = useDisclosure(false);
  const [selectedContributorId, setSelectedContributorId] =
    useState<string>("");
  const rows = data.map((contributor, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>
        <Group gap={4} align="center">
          <Avatar
            color="cyan"
            w={38}
            h={38}
            src={
              typeof contributor?.profilePhoto === "object"
                ? contributor.profilePhoto.url
                : (contributor?.profilePhoto ?? undefined)
            }
          />
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {contributor.firstName} {contributor.lastName}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {contributor.email}
            </Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {contributor.id.slice(0, 4)}
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        <Parish parishId={contributor.parish} />
      </Table.Td>
      <Table.Td className="">
        <Box
          className={cn(
            "rounded-full px-5 py-1 text-center text-xs font-normal",
            getContributorTypeStyle(
              contributor.status as ContributionTypeOptions,
            ),
          )}
        >
          {contributor.status}
        </Box>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        NGN 39,000
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        NGN 39,000
      </Table.Td>
      <Table.Td>
        <Menu trigger="hover" shadow="md" width={200} position="bottom-start">
          <Menu.Target>
            <ActionIcon
              variant="transparent"
              className="flex h-[16px] w-[30px] items-center justify-center rounded-[8px] px-[7px] py-[6px]"
            >
              <ThreeDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label className="text-sm text-[#1E1E1E]">Actions</Menu.Label>
            <Menu.Item
              onClick={() => {
                setSelectedContributorId(contributor.id);
                openUserProfileModal();
              }}
            >
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <FaintEyeIcon />
                <Box>View Profile</Box>
              </Group>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setSelectedContributorId(contributor.id);
                openChangeStatusModal();
              }}
            >
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <UserXIcon />
                <Box>Change Status</Box>
              </Group>
            </Menu.Item>
            <Menu.Item onClick={openChangeParishModal}>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <IbmCloudIcon />
                <Box>Change Parish</Box>
              </Group>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
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
            {contributorsTableHeadings.map((heading: string, index: number) => (
              <Table.Th key={`contributor-table-heading-${index}`}>
                {heading}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <UserProfileModal
        opened={isUserModalOpen}
        onClose={closeUserProfileModal}
        contributorId={selectedContributorId}
      />
      <ChangeStatusModal
        opened={isStatusModalOpen}
        onClose={closeChangeStatusModal}
        contributorId={selectedContributorId}
      />
      <ChangeParishModal
        opened={isParishModalOpen}
        onClose={closeChangeParishModal}
        contributorId={selectedContributorId}
      />
    </>
  );
};

const ContributorsTable = () => {
  const { data: sessionData } = useSession();

  const { data, isLoading, updateQuery } = useGetAllUsers();
  const [search, setSearch] = useQueryState("search");
  const [debouncedSearchValue] = useDebouncedValue(search?.trim(), 200);

  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [year, setYear] = useQueryState("year");
  const [month, setMonth] = useQueryState("month");

  const [contributorId] = useQueryState("contributorId");
  const [debouncedContributorId] = useDebouncedValue(
    contributorId?.trim(),
    200,
  );
  const [gender] = useQueryState("gender");
  const [yearOfBirth] = useQueryState("yearOfBirth", parseAsInteger);
  const [yearStarted] = useQueryState("yearStarted", parseAsInteger);
  const [basicSalary] = useQueryState("basicSalary", parseAsInteger);
  const [totalContribution] = useQueryState(
    "totalContribution",
    parseAsInteger,
  );

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    updateQuery("search", debouncedSearchValue ?? undefined);
    updateQuery("contributorId", debouncedContributorId ?? undefined);
    updateQuery("gender", gender ?? undefined);
    updateQuery("yearOfBirth", yearOfBirth?.toString() ?? undefined);
    updateQuery("yearStarted", yearStarted?.toString() ?? undefined);
    updateQuery("basicSalary", basicSalary?.toString() ?? undefined);
    updateQuery(
      "totalContribution",
      totalContribution?.toString() ?? undefined,
    );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("diocese", sessionData?.user.diocese);
    updateQuery("role", "contributor");
    updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearchValue,
    debouncedContributorId,
    gender,
    yearOfBirth,
    yearStarted,
    basicSalary,
    totalContribution,
    sessionData?.user.diocese,
  ]);
  return (
    <>
      <TableWrapper
        isLoading={isLoading}
        data={data?.doc}
        table={(data) => <ContributorsDesktopTable data={data ?? []} />}
        skeletonRow={9}
        skeletonCol={8}
        emptyComponent={
          <EmptyTable
            tableHeading={contributorsTableHeadings}
            message=" You have no recent activity, all recent activity will appear here!!"
          />
        }
      />
      <PaginationCard
        page={page ?? 1}
        pageSize={10}
        total={data?.total_pages ?? 0}
        onChange={handlePageChange}
        showPageItem
      />
    </>
  );
};

export default ContributorsTable;
