import { Box, Card, Flex, Group, Pagination, Text } from "@mantine/core";

interface Props {
  page?: number;
  pageSize?: number;
  total: number;
  onChange?: (value: number) => void;
  showPageItem?: boolean;
}
export const PaginationCard: React.FC<Props> = ({
  onChange,
  total,
  page,
  showPageItem,
}) => {
  if (total === 0) return null;
  return (
    <Box>
      <Flex className="items-center justify-end bg-white pr-5 sm:py-[14px]">
        <Pagination.Root
          value={page}
          onChange={(val) => onChange?.(val)}
          total={total}
          size={"sm"}
          classNames={{
            control: "h-[32px] rounded-[4px] !min-w-[32px]",
          }}
        >
          <Group gap={4} justify="center">
            <Pagination.Previous className="" />
            {showPageItem ? (
              <>
                <Box className="hidden gap-2 sm:flex">
                  <Pagination.Items />
                </Box>
                <Card className="flex sm:hidden">
                  <Text className="text-[14px] font-normal">{page}</Text>
                </Card>
              </>
            ) : (
              <Card>
                <Text className="text-[14px] font-normal">{page}</Text>
              </Card>
            )}

            <Pagination.Next />
          </Group>
        </Pagination.Root>
      </Flex>
    </Box>
  );
};
