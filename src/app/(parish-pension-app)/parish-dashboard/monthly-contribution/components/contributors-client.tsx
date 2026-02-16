"use client";

import { Parish } from "@/components/parish";
import AnimateComponent from "@/components/ui/animate-component";
import { Box, Stack, Text } from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import MonthlyContributionsTable from "./monthly-contributions-table";

const Contributorsclient = () => {
  const mounted = useMounted();
  const { data: sessionUser } = useSession();
  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Stack gap={16} className="mb-20 md:gap-6">
        <Box>
          <Text
            className="text-left text-[20px] font-bold text-[#1E1E1E] md:text-[28px]"
            mb={0}
          >
            Welcome, <Parish parishId={sessionUser?.user?.parish ?? ""} />
          </Text>
          <Text
            className="text-left text-sm text-[#6B7280] md:text-base"
            fw={400}
          >
            Manage your Parish information
          </Text>
        </Box>
        <MonthlyContributionsTable />
      </Stack>
    </AnimateComponent>
  );
};

export default Contributorsclient;
