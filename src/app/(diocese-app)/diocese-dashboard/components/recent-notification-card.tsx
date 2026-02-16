import { WarningIcon } from "@/components/icons/warning-icon";
import { cn } from "@/lib/utils";
import { Box, Text } from "@mantine/core";

const RecentNotificationCard = () => {
  const notifications = [
    {
      title: "Pension Fund Credited",
      icon: <WarningIcon />,
      message:
        "Your monthly pension of ₦125,000 has been credited to your account.",
      time: "2 hours ago",
      color: "green",
    },
    {
      title: "Withdrawal Request Pending",
      icon: <WarningIcon />,
      message: "Your withdrawal request of ₦45,000 is awaiting approval.",
      time: "3 days ago",
      color: "yellow",
    },
    {
      title: "New Statement Available",
      icon: <WarningIcon />,
      message:
        "Your quarterly pension statement is now available for download.",
      time: "1 day ago",
      color: "blue",
    },
  ];
  return (
    <Box className="shadow-[rgba(0, 0, 0, 0.05)] mb-10 w-full rounded-[12px] bg-[#ffff]">
      <Text className="pt-[28px] pb-2 pl-4 text-xl font-semibold">
        Recent Notifications
      </Text>
      <Box className="px-4">
        {notifications.map((notification, index) => (
          <Box
            key={index}
            className={cn("flex items-center gap-2 py-2", {
              "border-b border-[#E5E7EB]": index !== notifications.length - 1,
            })}
          >
            <Box className="flex flex-col gap-2">
              <Box className="flex items-center gap-3">
                <Box className="text-sm font-medium text-[#111827]">
                  {notification.icon}
                </Box>
                <Text className="text-base font-semibold text-[#1F2937]">
                  {notification.title}
                </Text>
              </Box>
              <Text className="text-xs font-normal text-[#6B7280]">
                {notification.message}
              </Text>
              <Text className="text-[10px] font-normal text-[#6B7280]">
                {notification.time}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecentNotificationCard;
