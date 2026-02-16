"use client";
import { ExportIcon } from "@/components/icons/export-icon";
import AnimateComponent from "@/components/ui/animate-component";
import { useGetAllUsers } from "@/hooks/query/use-user";
import type { SessionUser } from "@/types/common";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { useDebouncedValue, useMounted } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import MonthlyParishPensionersTable from "./monthly-parish-pensioners-table";

const PensionersClientPage = () => {
  const mounted = useMounted();
  const { data: sessionData } = useSession();
  const { data, isLoading, updateQuery } = useGetAllUsers();

  const [search, setSearch] = useQueryState("search");
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [staffNumber, setStaffNumber] = useQueryState("staffNumber");
  const [sex, setSex] = useQueryState("sex");
  const [dob, setDob] = useQueryState("dob");
  const [datePensionCommenced, setDatePensionCommenced] = useQueryState(
    "datePensionCommenced",
  );
  const [monthlyPension, setMonthlyPension] = useQueryState("monthlyPension");
  const [year, setYear] = useQueryState("year");
  const [month, setMonth] = useQueryState("month");

  const [debouncedSearch] = useDebouncedValue(search, 300);

  const [isExporting, setIsExporting] = useState(false);

  const handlePageChange = async (newPage: number) => {
    await setPage(newPage);
    updateQuery("page", newPage);
  };

  useEffect(() => {
    updateQuery("role", "pensioner");
    updateQuery("parish", sessionData?.user.parish);
    updateQuery("search", debouncedSearch ?? undefined);
    updateQuery("staffNumber", staffNumber ?? undefined);
    updateQuery("sex", sex ?? undefined);
    updateQuery("dob", dob ?? undefined);
    updateQuery("datePensionCommenced", datePensionCommenced ?? undefined);
    updateQuery("monthlyPension", monthlyPension ?? undefined);
    updateQuery("year", year ?? undefined);
    updateQuery("month", month ?? undefined);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setPage(1);
    updateQuery("page", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch,
    staffNumber,
    sex,
    dob,
    datePensionCommenced,
    monthlyPension,
    year,
    month,
    sessionData,
  ]);

  const handleExportCSV = () => {
    if (!data?.doc || data.doc.length === 0) return;

    setIsExporting(true);
    try {
      const exportData = data.doc.map(
        (pensioner: SessionUser, index: number) => ({
          "S/N": index + 1,
          "STAFF NUMBER": pensioner.id.slice(0, 8),
          "FIRST NAME": pensioner.firstName,
          "LAST NAME": pensioner.lastName,
          EMAIL: pensioner.email,
          SEX: pensioner.gender ?? "-",
          DOB: pensioner.dob
            ? new Date(pensioner.dob).toLocaleDateString()
            : "-",
          "DATE PENSION COMMENCED": pensioner.datePensionCommenced
            ? new Date(pensioner.datePensionCommenced).toLocaleDateString()
            : "-",
          "MONTHLY PENSION": `₦${pensioner.pensionBalance ?? "0"}`,
        }),
      );

      const csv = Papa.unparse(exportData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `pensioners_export_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Stack gap={20} className="sm:gap-5">
        <Stack gap={16} className="md:gap-6">
          <Group justify="space-between" align="center">
            <Box>
              <Text className="text-lg font-semibold text-[#1E1E1E] md:text-[28px] md:leading-12 md:font-bold">
                Welcome,{" "}
                {sessionData?.user?.firstName && sessionData?.user?.lastName
                  ? `${sessionData.user.firstName} ${sessionData.user.lastName}`
                  : "ABC Parish"}
              </Text>
              <Text className="text-sm font-normal text-[#6B7280] md:text-base">
                Manage your Parish information
              </Text>
            </Box>
            <Button
              leftSection={<ExportIcon size={16} color="white" />}
              onClick={handleExportCSV}
              loading={isExporting}
              disabled={!data?.doc || data.doc.length === 0}
            >
              <Box component="span">Export CSV</Box>
            </Button>
          </Group>
        </Stack>
        <MonthlyParishPensionersTable
          data={data}
          isLoading={isLoading}
          search={search}
          setSearch={setSearch}
          staffNumber={staffNumber}
          setStaffNumber={setStaffNumber}
          sex={sex}
          setSex={setSex}
          dob={dob}
          setDob={setDob}
          datePensionCommenced={datePensionCommenced}
          setDatePensionCommenced={setDatePensionCommenced}
          monthlyPension={monthlyPension}
          setMonthlyPension={setMonthlyPension}
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          page={page}
          handlePageChange={handlePageChange}
        />
      </Stack>
    </AnimateComponent>
  );
};

export default PensionersClientPage;
