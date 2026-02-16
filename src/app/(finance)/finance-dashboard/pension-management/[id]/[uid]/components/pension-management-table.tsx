"use client";
import EmptyTable from "@/app/(vendor-app)/vendor-dashboard/components/empty-table";
import { ThreeDots } from "@/components/icons/three-dots";
import TableWrapper from "@/components/ui/table-wrapper";
import { useGetAllUsers } from "@/hooks/query/use-user";
import { routes } from "@/lib/routes";
import type { GetAllUserResponse } from "@/types/common";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Group,
  Menu,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { ArrowLeft, Eye, Search, Upload } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BulkUploadModal from "./bulk-upload-modal";
import { pensionManagementTableHeadings } from "./extras";

interface Props {
  data: GetAllUserResponse["doc"];
}

const PensionManagementDesktopTable = ({ data }: Props) => {
  const params = useParams();
  const dioceseId = params.id as string;
  const parishId = params.uid as string;
  const rows = data?.map((user, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Group gap={4} align="center">
          <Avatar
            color="cyan"
            w={38}
            h={38}
            src={
              typeof user?.profilePhoto === "string"
                ? user.profilePhoto
                : (user?.profilePhoto?.url ?? "")
            }
          />
          <Box>
            <Text className="text-sm font-bold text-[#1e1e1e]">
              {user?.firstName ?? ""} {user?.lastName ?? ""}
            </Text>
            <Text className="text-sm font-normal text-[#6B7280]">
              {user?.email ?? ""}
            </Text>
          </Box>
        </Group>
      </Table.Td>
      <Table.Td className="text-sm font-normal text-[#1E1E1E]">
        {user?.id?.slice(0, 6) ?? ""}
      </Table.Td>

      <Table.Td>
        <Menu trigger="hover" shadow="md" width={200} position="bottom-start">
          <Menu.Target>
            <ActionIcon
              variant="transparent"
              className="flex h-[16px] w-[30px] items-center justify-center rounded-[8px] px-[7px] py-[6px]"
            >
              <ThreeDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label className="text-sm text-[#1E1E1E]">Actions</Menu.Label>
            <Menu.Item>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <Eye color="#1E1E1E" size={16} />
                <Link
                  href={
                    routes.financeDashboard.pensionManagement +
                    `/${dioceseId}/${parishId}/${user._id}/enter-pension`
                  }
                >
                  View User
                </Link>
              </Group>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <Group className="h-[25px] bg-transparent px-2 py-1 text-sm font-normal text-[#1E1E1E]">
                <Eye color="#1E1E1E" size={16} />
                <Link href={"#"}>View Profile</Link>
              </Group>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table
      highlightOnHover
      visibleFrom="sm"
      classNames={{
        thead:
          "bg-[#f9fafb] text-[#6B7280] font-medium text-xs leading-[17px] uppercase h-[41px]",
        td: "h-[87px] text-xs font-medium font-poppins leading-[17px] text-[#374151]",
      }}
    >
      <Table.Thead>
        <Table.Tr>
          {pensionManagementTableHeadings.map(
            (heading: string, index: number) => (
              <Table.Th key={`parish-management-table-heading-${index}`}>
                {heading}
              </Table.Th>
            ),
          )}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const mockPensionUsers: GetAllUserResponse["doc"] = [
  {
    _id: "mock-001",
    firstName: "Adaeze",
    lastName: "Okafor",
    email: "adaeze.okafor@example.com",
    profilePhoto: { url: "" },
    id: "USR001",
    phoneNumber: "08012345678",
    gender: "female",
    dob: "1975-03-15",
    parish: "St. Mary Parish",
    diocese: "Lagos Diocese",
    role: "pensioner",
    status: "active",
    active: true,
    isPensioner: true,
    pensionBalance: 250000,
    contributionBalance: 0,
    contactPerson: "",
    businessAddress: "",
    password: "",
    createdAt: "2023-01-15",
    updatedAt: "2025-01-15",
    __v: 0,
  },
  {
    _id: "mock-002",
    firstName: "Chukwuemeka",
    lastName: "Nwosu",
    email: "c.nwosu@example.com",
    profilePhoto: { url: "" },
    id: "USR002",
    phoneNumber: "08098765432",
    gender: "male",
    dob: "1968-07-22",
    parish: "St. Mary Parish",
    diocese: "Lagos Diocese",
    role: "pensioner",
    status: "active",
    active: true,
    isPensioner: true,
    pensionBalance: 180000,
    contributionBalance: 0,
    contactPerson: "",
    businessAddress: "",
    password: "",
    createdAt: "2022-06-10",
    updatedAt: "2025-01-15",
    __v: 0,
  },
  {
    _id: "mock-003",
    firstName: "Ngozi",
    lastName: "Eze",
    email: "ngozi.eze@example.com",
    profilePhoto: { url: "" },
    id: "USR003",
    phoneNumber: "07055566677",
    gender: "female",
    dob: "1972-11-08",
    parish: "St. Mary Parish",
    diocese: "Lagos Diocese",
    role: "pensioner",
    status: "active",
    active: true,
    isPensioner: true,
    pensionBalance: 320000,
    contributionBalance: 0,
    contactPerson: "",
    businessAddress: "",
    password: "",
    createdAt: "2021-03-20",
    updatedAt: "2025-01-15",
    __v: 0,
  },
  {
    _id: "mock-004",
    firstName: "Oluwaseun",
    lastName: "Adeyemi",
    email: "o.adeyemi@example.com",
    profilePhoto: { url: "" },
    id: "USR004",
    phoneNumber: "08133344455",
    gender: "male",
    dob: "1965-01-30",
    parish: "St. Mary Parish",
    diocese: "Lagos Diocese",
    role: "pensioner",
    status: "active",
    active: true,
    isPensioner: true,
    pensionBalance: 410000,
    contributionBalance: 0,
    contactPerson: "",
    businessAddress: "",
    password: "",
    createdAt: "2020-09-05",
    updatedAt: "2025-01-15",
    __v: 0,
  },
  {
    _id: "mock-005",
    firstName: "Fatima",
    lastName: "Ibrahim",
    email: "f.ibrahim@example.com",
    profilePhoto: { url: "" },
    id: "USR005",
    phoneNumber: "09012233445",
    gender: "female",
    dob: "1970-05-18",
    parish: "St. Mary Parish",
    diocese: "Lagos Diocese",
    role: "pensioner",
    status: "active",
    active: true,
    isPensioner: true,
    pensionBalance: 275000,
    contributionBalance: 0,
    contactPerson: "",
    businessAddress: "",
    password: "",
    createdAt: "2022-11-12",
    updatedAt: "2025-01-15",
    __v: 0,
  },
];

const PensionManagementTable = () => {
  const { data, isLoading } = useGetAllUsers();
  const router = useRouter();
  const params = useParams();
  const dioceseId = params.id as string;
  const parishId = params.uid as string;
  const [bulkModalOpened, { open: openBulk, close: closeBulk }] =
    useDisclosure(false);

  // Use API data if available, otherwise fall back to mock data
  const tableData =
    data?.doc && data.doc.length > 0 ? data.doc : mockPensionUsers;

  return (
    <Stack>
      <Box className="rounded-[10px] bg-white p-4 shadow-sm">
        {/* Top Row */}
        <Box className="mb-4 flex w-full items-start justify-between">
          {/* Left side */}
          <Box className="flex flex-col items-start gap-1">
            <Box
              component="button"
              onClick={() =>
                router.push(
                  `/finance-dashboard/pension-management/${dioceseId}`,
                )
              }
              className="flex items-center text-sm font-medium text-blue-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Box>

            <Text fw={600} className="text-[20px] text-gray-800">
              St Mary Parish
            </Text>

            <Text className="text-[16px]">Total Paid: ₦125,000.00</Text>
          </Box>

          {/* Right side buttons */}
          <Box className="flex items-center gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-blue-500 bg-white"
              radius="md"
              onClick={openBulk}
            >
              <Upload size={16} className="text-blue-600" />
              Bulk Upload
            </Button>

            <Button
              component={Link}
              href={
                data?.doc?.[0]
                  ? `${routes.financeDashboard.pensionManagement}/${dioceseId}/${parishId}/${data.doc[0]._id}/enter-pension`
                  : "#"
              }
              color="blue"
              radius="md"
              disabled={!data?.doc?.[0]}
            >
              + Add Payment
            </Button>
          </Box>
        </Box>

        {/* Search + Filters */}
        <Box className="flex w-full items-center justify-between">
          {/* Search */}
          <Box className="flex max-w-md flex-1 items-center">
            <TextInput
              placeholder="Search by emails, user name..."
              leftSection={<Search size={16} />}
              className="w-full"
            />
          </Box>

          {/* Filters */}
          <Box className="flex items-center gap-3">
            <Select
              placeholder="Status"
              data={["Paid", "Pending", "Overdue"]}
              className="w-36"
            />

            <MonthPickerInput
              placeholder="Enter Month"
              classNames={{
                input:
                  "h-[32px] md:h-[42px] w-full text-black placeholder:text-black",
                placeholder: "hidden md:block",
              }}
              valueFormat="MMM"
              clearable
            />

            <YearPickerInput
              placeholder="Year"
              classNames={{
                input:
                  "h-[32px] md:h-[42px] w-[100px] text-black placeholder:text-black",

                placeholder: "hidden md:block",
              }}
              clearable
            />
          </Box>
        </Box>
      </Box>
      <TableWrapper
        isLoading={isLoading}
        data={tableData}
        table={(data) => <PensionManagementDesktopTable data={data ?? []} />}
        skeletonRow={9}
        skeletonCol={8}
        emptyComponent={
          <EmptyTable
            tableHeading={pensionManagementTableHeadings}
            message=" You have no recent activity, all recent activity will appear here!!"
          />
        }
      />
      <BulkUploadModal
        opened={bulkModalOpened}
        close={closeBulk}
        parishId={parishId}
      />
    </Stack>
  );
};

export default PensionManagementTable;
