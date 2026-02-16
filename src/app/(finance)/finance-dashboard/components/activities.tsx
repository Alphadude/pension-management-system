"use client";

import { Box, Card, Group, Stack, Text } from "@mantine/core";
import { AlertTriangle, CheckCircle2, FileText } from "lucide-react";

interface Activity {
  id: number;
  icon: React.ReactNode;
  message: string;
  time: string;
  color: string;
}

const activities: Activity[] = [
  {
    id: 1,
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    message: "Vendor Invoice Uploaded - Power Company",
    time: "2 hours ago",
    color: "blue",
  },
  {
    id: 2,
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    message: "Voucher Signed by Vendor - Cleaning Services",
    time: "4 hours ago",
    color: "green",
  },
  {
    id: 3,
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    message: "Contribution Flagged - St. Mary's Parish",
    time: "6 hours ago",
    color: "yellow",
  },
  {
    id: 4,
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    message: "Payment Approved - Water Board",
    time: "1 day ago",
    color: "green",
  },
  {
    id: 5,
    icon: <FileText className="h-5 w-5 text-green-500" />,
    message: "Monthly Report Submitted - Finance Team",
    time: "1 day ago",
    color: "green",
  },
];

const Activities = () => {
  return (
    <Card shadow="sm" radius="md" className="p-6">
      <Stack gap="sm">
        {/* Header */}
        <Box>
          <Text fw={500} className="text-[24px] text-[#1E1E1E]">
            Recent Activities
          </Text>
          <Text size="sm" className="text-gray-500">
            Latest approvals and system activities
          </Text>
        </Box>

        {/* Activity List */}
        {activities.map((activity) => (
          <Group key={activity.id} align="flex-start" gap="md">
            {activity.icon}
            <Box>
              <Text size="sm" className="text-gray-800">
                {activity.message}
              </Text>
              <Text size="xs" className="text-gray-500">
                {activity.time}
              </Text>
            </Box>
          </Group>
        ))}
      </Stack>
    </Card>
  );
};

export default Activities;
