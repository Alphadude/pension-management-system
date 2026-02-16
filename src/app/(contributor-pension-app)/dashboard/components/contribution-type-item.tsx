import { cn } from "@/lib/utils";
import type { ContributionType } from "@/types/common";
import { Group, Text } from "@mantine/core";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getContributionTypeStyle } from "./extras";

type Props = {
  type: ContributionType;
};

const ContributionTypeItem = ({ type }: Props) => {
  return (
    <Group
      gap={11}
      className={cn(
        "text-sm font-normal capitalize",
        getContributionTypeStyle(type),
      )}
    >
      {type === "debit" ? (
        <ArrowDownRight size={16} />
      ) : (
        <ArrowUpRight size={16} color="#4CAF50" />
      )}
      <Text inherit>{type}</Text>
    </Group>
  );
};

export default ContributionTypeItem;
