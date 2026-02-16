"use client";
import { PurpleChurchIcon } from "@/components/icons/purple-church-icon";
import { useGetAllParishes } from "@/hooks/query/use-parish";
import { Box, Flex, Stack, Text, TextInput } from "@mantine/core";
import { ArrowLeft, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ParishDirectoryClient = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const params = useParams();
  const dioceseId = params.id as string;
  const { data: parishData, updateQuery } = useGetAllParishes();

  useEffect(() => {
    updateQuery("diocese", dioceseId);
  }, [dioceseId, updateQuery]);

  return (
    <Box className="space-y-6 p-4">
      {/* Header */}
      <Box className="rounded-[10px] bg-white p-4 shadow-sm">
        <Box
          component="button"
          onClick={() => router.push("/finance-dashboard/pension-management")}
          className="mb-4 flex items-center text-sm font-medium text-blue-600"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Go Back
        </Box>

        <Box className="mb-4">
          <Text className="text-lg font-semibold">Diocese of Lagos</Text>
          <Text className="text-sm text-gray-500">
            Comprehensive overview of diocese structure, finances, and
            activities
          </Text>
        </Box>

        <TextInput
          placeholder="Search parish name..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<Search className="h-5 w-5 text-gray-400" />}
          className="w-full"
          radius="md"
        />
      </Box>

      {/* Parish Directory */}
      <Stack bg={"#fff"} className="rounded-[12px]" gap={16} p={20} mt={16}>
        <Stack gap={4}>
          <Text className="text-2xl font-bold text-[#1E1E1E]">
            Parish Directory
          </Text>
          <Text className="text-base font-normal text-[#6B7280]">
            Complete list of parishes in this diocese
          </Text>
        </Stack>
        <Stack gap={12}>
          {parishData?.doc?.map((parish) => (
            <Box
              key={parish.id}
              component="a"
              href={`/finance-dashboard/pension-management/${dioceseId}/${parish.id}`}
              className="w-full rounded-[8px] border border-[#D1D5DB66] p-[17px]"
            >
              <Flex gap={16} align="center" direction={"row"}>
                <PurpleChurchIcon />
                <Text>{parish.name}</Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ParishDirectoryClient;
