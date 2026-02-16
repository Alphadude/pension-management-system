import { CheckCircleIcon } from "@/components/icons/check-circle-icon";
import { WarningIcon } from "@/components/icons/warning-icon";
import { useGetUserNotifications } from "@/hooks/query/use-user";
import { cn } from "@/lib/utils";
import { Box, Text } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";

const RecentNotificationCard = () => {
  const { data: sessionUser } = useSession();
  const { data, isLoading } = useGetUserNotifications(
    sessionUser?.user._id ?? "",
  );
  const notifications = data?.doc?.slice(0, 3) ?? [];
  return (
    <Box className="shadow-[rgba(0, 0, 0, 0.05)] mb-10 w-full rounded-[12px] bg-[#ffff]">
      <Text className="pt-[28px] pb-2 pl-4 text-xl font-semibold">
        Recent Notifications
      </Text>
      <Box className="px-4">
        {notifications.map((notification, index) => {
          const icon =
            notification.type === "success" ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <WarningIcon className="h-5 w-5" />
            );
          const time = formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          });
          return (
            <Box
              key={notification._id}
              className={cn("flex items-center gap-2 py-2", {
                "border-b border-[#E5E7EB]": index !== notifications.length - 1,
              })}
            >
              <Box className="flex flex-col gap-2">
                <Box className="flex items-center gap-3">
                  <Box className="text-sm font-medium text-[#111827]">
                    {icon}
                  </Box>
                  <Text className="text-base font-semibold text-[#1F2937]">
                    {notification.title}
                  </Text>
                </Box>
                <Text className="text-xs font-normal text-[#6B7280]">
                  {notification.message}
                </Text>
                <Text className="text-[10px] font-normal text-[#6B7280]">
                  {time}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RecentNotificationCard;
