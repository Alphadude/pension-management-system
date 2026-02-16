import { toast } from "@/components/ui/toast";
import apis from "@/services/api-services";
import type { GenerateReportFormValues, ReportResponse } from "@/types/common";
import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

export const useGenerateReport = () => {
  const queryClient = useQueryClient();
  const generateReportMutation = createMutation({
    mutationFn: async (
      data: GenerateReportFormValues,
    ): Promise<ReportResponse> => {
      const res = await apis.report.generateReport(data);
      return res.data as ReportResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-reports"] });
      toast({
        message: "Report created successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Failed to create report",
        variant: "error",
      });
    },
  });

  return generateReportMutation();
};
