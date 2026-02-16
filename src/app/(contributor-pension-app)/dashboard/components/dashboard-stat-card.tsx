import { cn } from "@/lib/utils";
import { ActionIcon, Box, Text } from "@mantine/core";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  amount: string;
  lastUpdated: string;
  type: "pensioner" | "contributor";
}

const typeStyles = {
  pensioner: {
    bg: "bg-[#2E5AAC]",
    titleColor: "text-[#DBEAFE]",
    amountColor: "text-white",
    lastUpdatedColor: "text-[#DBEAFE]",
    iconColor: "#F9FAFC",
  },
  contributor: {
    bg: "bg-[#cbe9e4]",
    titleColor: "text-[#13A382]",
    amountColor: "text-[#13A382]",
    lastUpdatedColor: "text-[#13A382]",
    iconColor: "#13A382",
  },
};

const DashboardStatCard = ({
  title,
  amount,
  lastUpdated,
  type = "pensioner",
}: Props) => {
  const [visible, setVisible] = useState(false);
  const styles = typeStyles[type];
  return (
    <>
      <Box
        className={`flex w-full flex-col gap-4 rounded-[12px] ${styles.bg} p-4 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),_0px_10px_15px_-3px_rgba(0,0,0,0.1)] md:p-6`}
      >
        <Box className="flex items-start justify-between">
          <Box className="flex flex-col gap-1">
            <Text
              className={cn(
                "text-[14px] leading-5 font-medium",
                styles.titleColor,
              )}
            >
              {title}
            </Text>
            <Text
              className={cn(
                "text-[28px] leading-12 font-bold md:text-[40px]",
                styles.amountColor,
              )}
            >
              {visible ? amount : "***********"}
            </Text>
          </Box>
          <ActionIcon
            variant="transparent"
            onClick={() => setVisible((prev) => !prev)}
          >
            {visible ? (
              <Eye size={40} color={styles.iconColor} />
            ) : (
              <EyeClosed size={40} color={styles.iconColor} />
            )}
          </ActionIcon>
        </Box>
        <Box
          className={cn("w-full rounded-[8px] bg-[#b9e2da] px-3 py-2 md:p-3", {
            "bg-white/10": type === "pensioner",
          })}
        >
          <Text
            className={cn(
              "text-base leading-4 font-normal",
              styles.lastUpdatedColor,
            )}
          >
            Last updated: {lastUpdated}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default DashboardStatCard;
