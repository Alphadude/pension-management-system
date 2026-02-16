import { DollarCircleIcon } from "@/components/icons/dollar-circle-icon";
import { SimpleGrid, Stack } from "@mantine/core";
import DiocesanAdministrationCard from "./components/diocesan-administration-card";
import { OverviewMetricCard } from "./components/overview-metric-cards";

const Overview = () => {
  return (
    <Stack>
      <SimpleGrid
        className="grid-cols-2 gap-2 gap-y-2 rounded-2xl sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4"
        mt={16}
      >
        <OverviewMetricCard
          label="Monthly Average"
          value={`₦${208_333_333}`}
          icon={<DollarCircleIcon className="size-[18px] md:size-[35px]" />}
        />
        <OverviewMetricCard
          label="Quarterly Total"
          value={`₦${208_333_333}`}
          icon={<DollarCircleIcon className="size-[18px] md:size-[35px]" />}
        />
        <OverviewMetricCard
          label="Yearly Total"
          value={`₦${208_333_333}`}
          icon={<DollarCircleIcon className="size-[18px] md:size-[35px]" />}
        />
        <OverviewMetricCard
          label="Total Pensions"
          value={`₦${208_333_333}`}
          icon={<DollarCircleIcon className="size-[18px] md:size-[35px]" />}
        />
      </SimpleGrid>
      <DiocesanAdministrationCard
        name="John Doe"
        email="john.doe@example.com"
        phone="+1234567890"
        profilePhoto="https://via.placeholder.com/150"
        region="West"
        totalParishes={25}
        totalContributors={1500}
        totalPensioners={300}
      />
    </Stack>
  );
};

export default Overview;
