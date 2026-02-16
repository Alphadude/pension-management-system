import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { PaginationCard } from "@/components/ui/pagination";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetAllParishes } from "@/hooks/query/use-parish";
import type { Parish } from "@/types/common";
import { Box, Button, Group, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DeleteParishModal from "../delete-parish-modal";
import EditParishModal from "../edit-parish-modal";
import { getParishStatusStyle, parishTableHeadings } from "./components/extras";

type Props = {
  data: Parish[];
};

const ParishDesktopTable = ({ data }: Props) => {
  const [isEditModalOpen, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    isDeleteModalOpen,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const rows = data.map((parish, idx) => {
    return (
      <Table.Tr key={idx}>
        <Table.Td>
          <Box>
            <Text className="text-sm font-bold text-[#1E1E1E]">
              {parish.name}
            </Text>
            {/* <Text className="text-sm font-normal text-[#1E1E1E]">
              {parish.address}
            </Text> */}
          </Box>
        </Table.Td>
        <Table.Td className="text-sm font-bold text-[#1e1e1e]">
          {/* {parish.pastor} */}
          {"Pastor"}
        </Table.Td>
        <Table.Td className="text-sm font-bold text-[#1e1e1e]">
          {parish.contributorCount}
        </Table.Td>
        <Table.Td>
          <Box
            className={
              getParishStatusStyle(parish.status) +
              " rounded-full px-5 py-1 text-center text-xs font-medium"
            }
          >
            {parish.status}
          </Box>
        </Table.Td>
        <Table.Td>
          <Group>
            <Button
              classNames={{
                root: "!w-[46px] !h-[28px] !px-[10px] !py-[2px] !rounded-[4px]",
                label: "font-normal text-sm",
              }}
              variant="outline"
              onClick={openEditModal}
            >
              Edit
            </Button>
            <Button
              classNames={{
                root: "border border-[#F44336] !w-[66px] !h-[28px] !px-[10px] !py-[2px] !rounded-[4px]",
                label: "font-normal text-sm text-[#F44336]",
              }}
              variant="outline"
              onClick={openDeleteModal}
            >
              Delete
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Table
        highlightOnHover
        visibleFrom="sm"
        classNames={{
          table: "bg-[#fff]",
          thead:
            "bg-[#f9fafb] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[67px] border border-[#e5e7eb]",
          td: "h-[87px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {parishTableHeadings.map((heading, index) => (
              <Table.Th key={`parish-table-heading-${index}`}>
                {heading}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <EditParishModal opened={isEditModalOpen} close={closeEditModal} />
      <DeleteParishModal opened={isDeleteModalOpen} close={closeDeleteModal} />
    </>
  );
};

const ParishesTable = () => {
  const { data, isLoading, updateQuery, query } = useGetAllParishes();

  const handlePageChange = (newPage: number) => {
    updateQuery("page", newPage);
  };

  return (
    <>
      <TableWrapper
        isLoading={isLoading}
        data={data?.doc}
        table={(data) => <ParishDesktopTable data={data} />}
        skeletonRow={5}
        skeletonCol={5}
        emptyComponent={
          <EmptyTable
            tableHeading={parishTableHeadings}
            message="No parishes found. Add a new parish to get started!"
          />
        }
      />
      <PaginationCard
        page={query.page ?? 1}
        pageSize={10}
        total={data?.total_pages ?? 0}
        onChange={handlePageChange}
        showPageItem
      />
    </>
  );
};

export default ParishesTable;
