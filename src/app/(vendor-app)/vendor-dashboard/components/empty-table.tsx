import { WrappedTransactionIcon } from "@/components/icons/wrapped-transaction-icon";
import { Box, Stack, Table, Text } from "@mantine/core";

type Props = {
  tableHeading: string[];
  message: string;
};

const EmptyTable = ({ tableHeading, message }: Props) => {
  return (
    <>
      <Table
        highlightOnHover
        visibleFrom="sm"
        classNames={{
          thead:
            "bg-[#EFF5FF] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[67px]",
          td: "h-[57px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {tableHeading.map((heading, index) => (
              <Table.Th key={`invoice-table-heading-${index}`}>
                {heading}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
      </Table>
      <Box className="flex h-[453px] flex-col pt-20">
        <Stack gap={22} className="flex flex-col items-center">
          <WrappedTransactionIcon />
          <Text className="max-w-[466px] text-center text-sm font-normal text-[#6B7280]">
            {message}
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default EmptyTable;
