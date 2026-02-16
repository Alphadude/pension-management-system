import { BentUserIcon } from "@/components/icons/bent-user-icon";
import { ChurchCrossIcon } from "@/components/icons/church-cross-icon";
import { UserIcon } from "@/components/icons/user-icon";
import { Avatar, Box, Group, Stack, Text } from "@mantine/core";

interface DiocesanAdministrationCardProps {
  name: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  region: string;
  totalParishes: number;
  totalContributors: number;
  totalPensioners: number;
}

const DiocesanAdministrationCard = ({
  name,
  email,
  phone,
  profilePhoto: _profilePhoto,
  region,
  totalParishes,
  totalContributors,
  totalPensioners,
}: DiocesanAdministrationCardProps) => (
  <Stack gap={24} className="w-full rounded-3xl bg-white p-6">
    <Text className="mb-2 flex items-center gap-1 text-xl font-bold">
      <Box component="span">
        <UserIcon />
      </Box>
      Diocesan Administration
    </Text>
    <Group align="center" justify="space-between" className="w-full">
      <Group gap={8} align="center">
        <Avatar radius={40} size={54} />
        <Box>
          <Text className="text-SM font-bold text-[#1e1e1e]">{name}</Text>
          <Text className="text-sm text-[#6B7280]">{email}</Text>
          <Text className="text-sm font-normal text-[#1E1E1E]">
            <Box component="span" className="font-bold">
              Phone:
            </Box>{" "}
            {phone}
          </Text>
        </Box>
      </Group>
      <Stack gap={8}>
        <Group gap={8} align="center">
          <ChurchCrossIcon />
          <Text className="text-sm text-[#1e1e1e]">
            Region: <span className="font-bold">{region} Region</span>
          </Text>
        </Group>
        <Group gap={8} align="center">
          <ChurchCrossIcon />
          <Text className="text-sm text-[#1e1e1e]">
            Total Parishes: <span className="font-bold">{totalParishes}</span>
          </Text>
        </Group>
      </Stack>
      <Stack gap={8}>
        <Group gap={8} align="center">
          <BentUserIcon />
          <Text className="text-sm text-[#1e1e1e]">
            Total Contributors:{" "}
            <span className="font-bold">
              {totalContributors.toLocaleString()}
            </span>
          </Text>
        </Group>
        <Group gap={8} align="center">
          <BentUserIcon />
          <Text className="text-sm text-[#1e1e1e]">
            Total Pensioners:{" "}
            <span className="font-bold">
              {totalPensioners.toLocaleString()}
            </span>
          </Text>
        </Group>
      </Stack>
    </Group>
  </Stack>
);

export default DiocesanAdministrationCard;
