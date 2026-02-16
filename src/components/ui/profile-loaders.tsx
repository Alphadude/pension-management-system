import Repeater from "@/components/ui/repeater";
import { Box, Card, Flex, SimpleGrid, Skeleton, Stack } from "@mantine/core";

export const UserProfileCardSkeleton = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="lg"
      withBorder
      className="mb-6 bg-white"
    >
      <Flex className="items-center gap-x-4 md:w-[500px] md:gap-x-6">
        <Box className="flex-1">
          <Skeleton circle animate className="h-20 w-20 md:h-24 md:w-24" />
        </Box>
        <Box className="w-full space-y-2">
          <Skeleton animate h={17} width="40%" />
          <Skeleton animate h={17} width="60%" />
          <Skeleton animate h={17} width="20%" />
        </Box>
      </Flex>
    </Card>
  );
};

export const PersonalInformationSkeleton = () => {
  return (
    <SimpleGrid className="grid md:grid-cols-2">
      <Repeater count={5}>
        <Skeleton h={42} width="100%" animate />
      </Repeater>
    </SimpleGrid>
  );
};

export const ContactInformationSkeleton = () => {
  return (
    <SimpleGrid className="grid md:grid-cols-2">
      <Repeater count={2}>
        <Skeleton animate h={42} w="100%" />
      </Repeater>
    </SimpleGrid>
  );
};

export const UploadedDocumentSkeleton = () => {
  return (
    <Stack>
      <Repeater count={3}>
        <Skeleton h={100} width="100%" animate />
      </Repeater>
    </Stack>
  );
};
