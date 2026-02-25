"use client";

import { VendorManagementMetricCard } from "@/components/ui/vendor-management-metric-card";
import { SimpleGrid, Stack } from "@mantine/core";
import { DollarSign, FileText, TrendingUp, Users } from "lucide-react";

const VendorManagementDashboard = () => {
  return (
    <Stack gap={20} className="sm:gap-10">
      <Stack gap={16} className="md:gap-6">
        {/* Metrics */}
        <SimpleGrid className="grid-cols-2 gap-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
          <VendorManagementMetricCard
            label="Pending Invoices"
            value="24"
            desc="Awaiting Review"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                <FileText className="size-[14px] text-white md:size-[16px]" />
              </div>
            }
          />

          <VendorManagementMetricCard
            label="Total Amount Paid"
            value="₦12,450,000"
            change="This Month"
            desc=""
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                <DollarSign className="size-[14px] text-white md:size-[16px]" />
              </div>
            }
          />

          <VendorManagementMetricCard
            label="Active Vendors"
            value="49"
            desc="Registered Vendors"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                <Users className="size-[14px] text-white md:size-[16px]" />
              </div>
            }
          />

          <VendorManagementMetricCard
            label="Signed Vouchers"
            value="70%"
            change="+5% from last month"
            desc=""
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5AAC]">
                <TrendingUp className="size-[14px] text-white md:size-[16px]" />
              </div>
            }
          />
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default VendorManagementDashboard;
