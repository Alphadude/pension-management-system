"use client";

import PensionManagementTable from "@/app/(finance)/finance-dashboard/pension-management/components/pension-management-table";
import { PensionManagementMetricCard } from "@/components/ui/pension-management-metric-card";
import { useGetFinancePensionManagementOverview } from "@/hooks/query/use-finance";
import { Box, SimpleGrid, Stack } from "@mantine/core";
import { CircleCheckBig, FileText } from "lucide-react";

const PensionManagementDashboard = () => {
  const { data } = useGetFinancePensionManagementOverview();
  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        {/* Metrics */}
        <SimpleGrid className="grid-cols-2 gap-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
          <PensionManagementMetricCard
            label="Total Pensioners"
            value={data?.doc.totalPensioners ?? 0}
            desc="Active Contributors"
            icon={
              <Box className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                <FileText className="size-[14px] text-white md:size-[16px]" />
              </Box>
            }
          />
          <PensionManagementMetricCard
            label="Total Amount Paid"
            value={`₦${data?.doc.totalAmountPaid ?? 0}`}
            change="This Month"
            icon={
              <Box className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                <CircleCheckBig className="size-[14px] text-white md:size-[16px]" />
              </Box>
            }
          />

          <PensionManagementMetricCard
            label="Payments Made"
            value={data?.doc.paymentsMade ?? 0}
            // desc="8 pending, 6 not paid"
            icon={
              <Box className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                <CircleCheckBig className="size-[14px] text-white md:size-[16px]" />
              </Box>
            }
          />
          {/* 
          <PensionManagementMetricCard
            label="Signed Vouchers"
            value="70%"
            change=""
            desc="30 vouchers overdue"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                <Calendar className="size-[14px] text-white md:size-[16px]" />
              </div>
            }
          /> */}
        </SimpleGrid>
        <PensionManagementTable />
      </Stack>
    </Stack>
  );
};

export default PensionManagementDashboard;
