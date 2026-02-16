"use client";

import { DocumentWrapperIcon } from "@/components/icons/document-wrapper-icon";
import { MoneyIcon } from "@/components/icons/money-icon";
import { ParishMetricCard } from "@/components/ui/parish-metric-card";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useGetParishDashboardOverview } from "@/hooks/query/use-parish";
import {
  Badge,
  Box,
  Button,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput, YearPickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Search } from "lucide-react";
import numeral from "numeral";
import { useMemo, useState } from "react";
import ConfirmationModal from "./confirmation-modal";
import ParishSubmissionDetailsModal from "./parish-submission-details";
import DioceseOverviewSkeletonLoader from "./skeletonWrapper";

// ============================================
// TYPES
// ============================================

export interface ParishSubmission {
  id: string;
  parishName: string;
  submissionDate: string;
  totalAmount: number;
  contributors: number;
  contributorsAmount: number;
  pensionersAmount: number;
  status: "approved" | "pending" | "rejected" | "submitted";
}

// ============================================
// MOCK DATA (temporary for now)
// ============================================

const mockParishSubmissions: ParishSubmission[] = [
  {
    id: "1",
    parishName: "Holy Trinity Church",
    submissionDate: "2025-04-15",
    totalAmount: 125000.0,
    contributors: 23,
    contributorsAmount: 85000.0,
    pensionersAmount: 40000.0,
    status: "approved",
  },
  {
    id: "2",
    parishName: "St. Andrew's Cathedral",
    submissionDate: "2025-05-03",
    totalAmount: 150000.0,
    contributors: 15,
    contributorsAmount: 95000.0,
    pensionersAmount: 55000.0,
    status: "pending",
  },
  {
    id: "3",
    parishName: "Grace Fellowship Hall",
    submissionDate: "2025-06-10",
    totalAmount: 65000.0,
    contributors: 10,
    contributorsAmount: 40000.0,
    pensionersAmount: 25000.0,
    status: "approved",
  },
  {
    id: "4",
    parishName: "Unity Community Center",
    submissionDate: "2025-07-21",
    totalAmount: 90000.0,
    contributors: 8,
    contributorsAmount: 55000.0,
    pensionersAmount: 35000.0,
    status: "approved",
  },
  {
    id: "5",
    parishName: "Hope Family Church",
    submissionDate: "2025-08-18",
    totalAmount: 110000.0,
    contributors: 12,
    contributorsAmount: 70000.0,
    pensionersAmount: 40000.0,
    status: "approved",
  },
];

// ============================================
// UTILITIES
// ============================================

const safeFormatDate = (dateString?: string): string => {
  if (!dateString) return "—";
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime())
    ? "—"
    : parsed.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const formatCurrency = (amount: number): string => {
  return `₦${numeral(amount).format("0,0.00")}`;
};

// ============================================
// STATUS BADGE
// ============================================

const StatusBadge = ({ status }: { status: ParishSubmission["status"] }) => {
  const statusConfig = {
    approved: { bg: "#D1FAE5", text: "#065F46" },
    pending: { bg: "#FEF3C7", text: "#92400E" },
    rejected: { bg: "#FEE2E2", text: "#991B1B" },
    submitted: { bg: "#DBEAFE", text: "#1E40AF" },
  };

  const colors = statusConfig[status];

  return (
    <Badge
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        textTransform: "capitalize",
        fontWeight: 500,
        fontSize: "12px",
        padding: "6px 14px",
        borderRadius: "6px",
      }}
    >
      {status}
    </Badge>
  );
};

// ============================================
// DESKTOP TABLE
// ============================================

const ParishSubmissionsDesktopTable = ({
  data,
  onViewDetails,
}: {
  data: ParishSubmission[];
  onViewDetails: (submissionId: string) => void;
}) => {
  const rows = data.map((submission) => (
    <Table.Tr key={submission.id}>
      <Table.Td style={{ padding: "16px 28px" }}>
        <Text className="text-[14px] font-semibold text-[#1E1E1E]">
          {submission.parishName}
        </Text>
      </Table.Td>
      <Table.Td style={{ padding: "16px 28px" }}>
        <Text className="text-[14px] font-normal text-[#1E1E1E]">
          {safeFormatDate(submission.submissionDate)}
        </Text>
      </Table.Td>
      <Table.Td style={{ padding: "16px 28px" }}>
        <Text className="text-[14px] font-normal text-[#1E1E1E]">
          {formatCurrency(submission.contributorsAmount)}
        </Text>
      </Table.Td>
      <Table.Td style={{ padding: "16px 28px" }}>
        <Text className="text-[14px] font-normal text-[#1E1E1E]">
          {formatCurrency(submission.pensionersAmount)}
        </Text>
      </Table.Td>
      <Table.Td style={{ padding: "16px 28px" }}>
        <Text className="text-[14px] font-semibold text-[#1E1E1E]">
          {formatCurrency(submission.totalAmount)}
        </Text>
      </Table.Td>
      <Table.Td style={{ padding: "16px 28px" }}>
        <StatusBadge status={submission.status} />
      </Table.Td>
      <Table.Td style={{ padding: "16px 28px" }}>
        <Button
          variant="transparent"
          onClick={() => onViewDetails(submission.id)}
          style={{
            color: "#2563EB",
            padding: 0,
            height: "auto",
            fontWeight: 400,
            fontSize: "14px",
          }}
          className="hover:underline"
        >
          View Details
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box visibleFrom="sm">
      <Table
        highlightOnHover
        classNames={{
          table: "w-full p-6",
        }}
      >
        <Table.Thead
          style={{
            backgroundColor: "#F9FAFB",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <Table.Tr>
            {[
              "Parish Name",
              "Submission Date",
              "Contributors Amount",
              "Pensioners Amount",
              "Total Amount",
              "Status",
              "Actions",
            ].map((header) => (
              <Table.Th
                key={header}
                style={{
                  color: "#6B7280",
                  fontSize: "12px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  padding: "16px 20px",
                }}
              >
                {header}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td
                colSpan={7}
                style={{ textAlign: "center", padding: "40px" }}
              >
                <Text className="text-sm text-[#6B7280]">
                  No submissions found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

// ============================================
// MOBILE TABLE
// ============================================

const MonthlyRemittanceTable = () => {
  const { data: _overviewData, isLoading } = useGetParishDashboardOverview();

  // Modal state
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [_selectedSubmission, setSelectedSubmission] = useState<string | null>(
    null,
  );

  // Filter states
  const [status, setStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, _setSelectedMonth] = useState<Date | null>(null);
  const [selectedYear, _setSelectedYear] = useState<Date | null>(null);

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = mockParishSubmissions;

    if (status && status !== "all") {
      filtered = filtered.filter((item) => item.status === status);
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.parishName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedMonth) {
      filtered = filtered.filter((item) => {
        const itemMonth = new Date(item.submissionDate).getMonth();
        return itemMonth === selectedMonth.getMonth();
      });
    }

    if (selectedYear) {
      filtered = filtered.filter((item) => {
        const itemYear = new Date(item.submissionDate).getFullYear();
        return itemYear === selectedYear.getFullYear();
      });
    }

    return filtered;
  }, [status, searchQuery, selectedMonth, selectedYear]);

  // Metrics
  const metrics = useMemo(() => {
    const totalSubmissions = filteredData.length;
    const pendingReview = filteredData.filter(
      (item) => item.status === "pending",
    ).length;
    const totalContributorsAmount = filteredData.reduce(
      (sum, item) => sum + item.contributorsAmount,
      0,
    );
    const totalPensionersAmount = filteredData.reduce(
      (sum, item) => sum + item.pensionersAmount,
      0,
    );
    const totalAmount = filteredData.reduce(
      (sum, item) => sum + item.totalAmount,
      0,
    );

    return {
      totalSubmissions,
      pendingReview,
      totalContributorsAmount,
      totalPensionersAmount,
      totalAmount,
    };
  }, [filteredData]);

  // View Details
  const handleViewDetails = (submissionId: string) => {
    setSelectedSubmission(submissionId);
    openModal();
  };

  return (
    <Stack gap={16} w={"100%"}>
      <Box className="font-poppins mt-6 w-full rounded-[12px] border border-[#E5E7EB] bg-white">
        {/* Filter Section */}
        <Box className="flex flex-col items-start border-b border-[#F3F4F6] px-5 py-5">
          <Stack gap={6} className="mb-4">
            <Text className="text-base font-semibold text-[#1F2937] md:text-xl">
              Filter Submissions
            </Text>
            <Text className="text-xs font-normal text-[#6B7280] md:text-sm">
              Filter remittance submissions by month, year, status, and parish
            </Text>
          </Stack>
          <Group
            gap={12}
            className="grid w-full grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr]"
          >
            <TextInput
              leftSection={<Search color="#9CA3AF" size={20} />}
              placeholder="Search by parish name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              classNames={{
                input: "h-[40px] md:h-[42px]",
              }}
            />
            <Select
              placeholder="Status"
              value={status}
              onChange={setStatus}
              data={[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "approved", label: "Approved" },
                { value: "rejected", label: "Rejected" },
                { value: "submitted", label: "Submitted" },
              ]}
              classNames={{
                input: "h-[40px] md:h-[42px]",
              }}
              clearable
            />
            <MonthPickerInput
              placeholder="Pick month"
              value={selectedMonth}
              // onChange={(value) => setSelectedMonth(value)}
              valueFormat="MMMM"
              classNames={{ input: "h-[40px] md:h-[42px]" }}
              clearable
            />

            <YearPickerInput
              placeholder="Pick year"
              value={selectedYear}
              // onChange={(value) => setSelectedYear(value)}
              valueFormat="yyyy"
              classNames={{ input: "h-[40px] md:h-[42px]" }}
              clearable
            />
          </Group>
        </Box>

        {/* Metrics */}
        <Box className="border-b border-[#F3F4F6] px-5 py-5">
          <SkeletonWrapper
            isLoading={isLoading}
            Loader={DioceseOverviewSkeletonLoader}
          >
            <SimpleGrid
              cols={{ base: 2, sm: 2, md: 4 }}
              spacing={{ base: 12, md: 16 }}
            >
              <ParishMetricCard
                label="Total Submissions"
                value={metrics.totalSubmissions}
                desc="All parish submissions"
                icon={
                  <DocumentWrapperIcon className="size-[24px] rounded bg-[#2E5AAC] p-2 text-[#F9FAFC] md:size-[35px]" />
                }
              />

              <ParishMetricCard
                label="Contributors Amount"
                value={formatCurrency(metrics.totalContributorsAmount)}
                desc="Total contributors remittance"
                icon={
                  <MoneyIcon className="size-[24px] rounded bg-[#2E5AAC] p-2 text-[#F9FAFC] md:size-[35px]" />
                }
              />

              <ParishMetricCard
                label="Pensioners Amount"
                value={formatCurrency(metrics.totalPensionersAmount)}
                desc="Total pensioners remittance"
                icon={
                  <MoneyIcon className="size-[24px] rounded bg-[#2E5AAC] p-2 text-[#F9FAFC] md:size-[35px]" />
                }
              />

              <ParishMetricCard
                label="Total Amount"
                value={formatCurrency(metrics.totalAmount)}
                desc="Total remittance amount"
                icon={
                  <MoneyIcon className="size-[24px] rounded bg-[#2E5AAC] p-2 text-[#F9FAFC] md:size-[35px]" />
                }
              />
            </SimpleGrid>
          </SkeletonWrapper>
        </Box>

        {/* Table */}
        <Box className="overflow-x-auto">
          <ParishSubmissionsDesktopTable
            data={filteredData}
            onViewDetails={handleViewDetails}
          />
        </Box>
      </Box>

      {/* Modals */}
      <ConfirmationModal onClose={closeModal} opened={false} />
      <ParishSubmissionDetailsModal
        opened={modalOpened}
        onClose={closeModal}
        // parishId={selectedSubmission ?? ""}
      />
    </Stack>
  );
};

export default MonthlyRemittanceTable;
