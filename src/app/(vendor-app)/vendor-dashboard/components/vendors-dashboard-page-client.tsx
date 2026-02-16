"use client";
import { DocumentWrapperIcon } from "@/components/icons/document-wrapper-icon";
import { InvoicesSubmittedIcon } from "@/components/icons/invoices-submitted-icon";
import { LastPaymentIcon } from "@/components/icons/last-payment-icon";
import { PaidIcon } from "@/components/icons/paid-icon";
import { PendingPaymentIcon } from "@/components/icons/pending-payment-icon";
import AnimateComponent from "@/components/ui/animate-component";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import VendorMetricCard from "@/components/ui/vendor-metric-card";
import { useGetInvoiceOverview } from "@/hooks/query/use-get-invoice";
import { Box, Button, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useDisclosure, useMounted } from "@mantine/hooks";
import { format } from "date-fns";
import type { Session } from "next-auth";
import numeral from "numeral";
import InvoiceOverviewSkeletonLoader from "./invoice-overview-skeleton-loader";
import DownloadReportsModal from "./modal/download-reports-modal";
import GenerateReportModal from "./modal/generate-report-modal";
import SubmitInvoiceModal from "./modal/submit-invoice-modal";
import SubmitInvoiceSuccessModal from "./modal/submit-invoice-success-modal";
import RecentActivityTable from "./recent-activity-table";

interface Props {
  session: Session | null;
}

const VendorsDashboardPageClient = ({ session }: Props) => {
  const mounted = useMounted();
  const { data: invoiceOverview, isLoading: isLoadingInvoiceOverview } =
    useGetInvoiceOverview();
  const [openedSuccessModal, { close: closeSuccessModal }] =
    useDisclosure(false);

  const [
    openedSubmitInvoiceModal,
    { open: openSubmitInvoiceModal, close: closeSubmitInvoiceModal },
  ] = useDisclosure(false);

  const [
    openedDownloadReportsModal,
    { open: openDownloadReportsModal, close: closeDownloadReportsModal },
  ] = useDisclosure(false);

  const [
    openedGenerateReportModal,
    { open: openGenerateReportModal, close: closeGenerateReportModal },
  ] = useDisclosure(false);

  const handleOpenGenerateInvoiceModal = () => {
    closeSubmitInvoiceModal();
    openGenerateReportModal();
  };

  return (
    <>
      <SubmitInvoiceSuccessModal
        close={closeSuccessModal}
        opened={openedSuccessModal}
      />

      <SubmitInvoiceModal
        opened={openedSubmitInvoiceModal}
        close={closeSubmitInvoiceModal}
        handleOpenGenerateInvoiceModal={handleOpenGenerateInvoiceModal}
      />

      <DownloadReportsModal
        opened={openedDownloadReportsModal}
        close={closeDownloadReportsModal}
      />

      <GenerateReportModal
        opened={openedGenerateReportModal}
        close={closeGenerateReportModal}
      />

      <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
        <Stack className="gap-y-2 sm:gap-y-6">
          <Stack className="gap-y-2 sm:gap-y-0">
            <Title className="text-dark text-lg leading-[17px] font-semibold sm:text-[28px] sm:leading-12 sm:font-bold">
              Welcome, {session?.user?.firstName}
            </Title>
            <Text className="text-grey text-sm leading-[17px] font-normal sm:text-base sm:leading-[17px]">
              Manage your invoices and track payments
            </Text>
          </Stack>
          <SkeletonWrapper
            isLoading={isLoadingInvoiceOverview}
            Loader={InvoiceOverviewSkeletonLoader}
          >
            <SimpleGrid className="grid-cols-2 gap-2 sm:grid-cols-4 xl:gap-x-4">
              <VendorMetricCard
                label="Invoices Submitted"
                value={invoiceOverview?.invoicesSubmitted ?? "-"}
                icon={
                  <InvoicesSubmittedIcon className="md:h-[29px] md:w-[29px]" />
                }
              />
              <VendorMetricCard
                label="Pending Payments"
                value={
                  invoiceOverview?.pendingPayments
                    ? `₦ ${numeral(invoiceOverview.pendingPayments).format("0,0.00")}`
                    : "-"
                }
                icon={
                  <PendingPaymentIcon className="md:h-[29px] md:w-[29px]" />
                }
              />
              <VendorMetricCard
                label="Paid"
                value={
                  invoiceOverview?.paidPayments
                    ? `₦ ${numeral(invoiceOverview.paidPayments).format("0,0.00")}`
                    : "-"
                }
                icon={<PaidIcon className="md:h-[29px] md:w-[29px]" />}
              />
              <VendorMetricCard
                label="Last Payment"
                value={
                  invoiceOverview?.lastPayment
                    ? format(invoiceOverview.lastPayment, "MMM d, yyyy")
                    : "-"
                }
                icon={<LastPaymentIcon className="md:h-[29px] md:w-[29px]" />}
              />
            </SimpleGrid>
          </SkeletonWrapper>
        </Stack>

        <Box className="mt-5 mb-[138px] flex flex-col-reverse items-baseline gap-8 md:mt-6 md:grid md:grid-cols-[2fr_1fr]">
          <RecentActivityTable />
          <Stack gap={8} className="w-full">
            <Text className="font-poppins text-base leading-[17px] font-semibold text-[#1F2937]">
              Quick Actions
            </Text>
            <Button
              leftSection={<DocumentWrapperIcon />}
              onClick={openSubmitInvoiceModal}
              radius={8}
              className="font-inter flex h-[48px] justify-start bg-[#13A3821A] p-2 text-sm leading-6 font-medium text-[#13A382] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:h-[70px] md:px-6 md:py-4"
            >
              Submit New Invoice
            </Button>
            <Button
              radius={8}
              onClick={openDownloadReportsModal}
              leftSection={<DocumentWrapperIcon />}
              className="font-inter flex h-[48px] bg-[#2E5AAC1A] p-2 text-sm leading-6 font-medium text-[#2E5AAC] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:h-[70px] md:px-6 md:py-4"
            >
              Download Report
            </Button>
          </Stack>
        </Box>
      </AnimateComponent>
    </>
  );
};

export default VendorsDashboardPageClient;
