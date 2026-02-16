"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useDeleteUser } from "@/hooks/mutate/use-user";
import { useGetAllUsers } from "@/hooks/query/use-user";
import { type GetAllUserResponse, type SessionUser } from "@/types/common";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { Search, Trash2 } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import DeleteUserModal from "./delete-user-modal";
import {
  getSystemUserRoleStyle,
  getSystemUserStatusStyle,
  systemUsersTableHeaders,
  type SystemUserRole,
} from "./extras";

type Props = {
  data: SessionUser[];
  onDelete: (user: SessionUser) => void;
};

const DesktopSystemUsersTable = ({ data, onDelete }: Props) => {
  const rows = data.map((user, idx) => {
    return (
      <Table.Tr key={idx}>
        <Table.Td>
          <Group gap={4} align="center">
            <Avatar color="cyan" w={38} h={38} />
            <Box>
              <Text className="text-sm font-bold text-[#1e1e1e]">
                {user.firstName} {user.lastName}
              </Text>
              <Text className="text-sm font-normal text-[#6B7280]">
                {user.email}
              </Text>
            </Box>
          </Group>
        </Table.Td>
        <Table.Td className="text-sm font-normal text-[#1E1E1E]">
          {user.id.slice(0, 4)}
        </Table.Td>
        <Table.Td>
          <Box
            className={
              getSystemUserRoleStyle(user.role as SystemUserRole) +
              "rounded-full px-5 py-1 text-center text-xs font-medium"
            }
          >
            {user.role}
          </Box>
        </Table.Td>
        <Table.Td>
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {user.diocese}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {user.parish}
            </Text>
          </Box>
        </Table.Td>
        <Table.Td className="text-sm font-normal text-[#1E1E1E]">
          {"some date"}
        </Table.Td>
        <Table.Td>
          <Box
            className={
              getSystemUserStatusStyle(user.status) +
              "rounded-full px-5 py-1 text-center text-xs font-medium"
            }
          >
            {user.status}
          </Box>
        </Table.Td>
        <Table.Td>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => onDelete(user)}
            title="Delete User"
          >
            <Trash2 size={18} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table
      highlightOnHover
      visibleFrom="sm"
      classNames={{
        thead:
          "bg-[#f9fafb] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[67px]",
        td: "h-[87px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          {systemUsersTableHeaders.map((heading, index) => (
            <Table.Th key={`system-users-table-heading-${index}`}>
              {heading}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const SystemUsersTable = ({
  data,
  isLoading,
}: {
  data: GetAllUserResponse | undefined;
  isLoading: boolean;
}) => {
  const { updateQuery } = useGetAllUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<SessionUser | null>(null);

  const [search, _setSearch] = useQueryState("search");
  const [debouncedSearchValue] = useDebouncedValue(search?.trim(), 200);

  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [year, _setYear] = useQueryState("year");
  const [month, _setMonth] = useQueryState("month");

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  const handleDeleteClick = (user: SessionUser) => {
    setSelectedUser(user);
    open();
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id, {
        onSuccess: () => {
          close();
          setSelectedUser(null);
        },
      });
    }
  };

  useEffect(() => {
    // updateQuery("year", year);
    // updateQuery("month", month);
    // updateQuery("search", debouncedSearchValue ?? "");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("role", "venerable,finance,parish,diocese");
    updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, debouncedSearchValue]);

  return (
    <>
      <Stack className="pt-6">
        <Stack gap={8} className="px-6">
          <Text className="text-xl font-semibold text-[#1F2937]">
            System Users
          </Text>
          <Text className="text-xs font-normal text-[#6B7280]">
            Monitor user activity and access across all organizational levels
          </Text>
        </Stack>
        <Group
          gap={16}
          className="mt-2 mb-5 grid w-full grid-cols-[3fr_1fr_1fr_1fr_1fr] px-6"
        >
          <TextInput
            leftSection={<Search color="#9CA3AF" size={20} />}
            placeholder="Search by user names, emails..."
            classNames={{
              input: "h-[32px] md:h-[42px] w-full",
            }}
          />
          <Select
            placeholder="Status"
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />
          <Select
            placeholder="Role"
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />
          <Select
            placeholder="Parish"
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />
          <Select
            placeholder="Diocese"
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />
        </Group>
        <TableWrapper
          isLoading={isLoading}
          data={data?.doc}
          table={(data) => (
            <DesktopSystemUsersTable data={data} onDelete={handleDeleteClick} />
          )}
          skeletonRow={9}
          skeletonCol={8}
          emptyComponent={
            <EmptyTable
              tableHeading={systemUsersTableHeaders}
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
      </Stack>

      <DeleteUserModal
        opened={opened}
        onClose={close}
        onConfirm={handleConfirmDelete}
        userName={
          selectedUser
            ? `${selectedUser.firstName} ${selectedUser.lastName}`
            : ""
        }
        isPending={isDeleting}
      />
    </>
  );
};

export default SystemUsersTable;
