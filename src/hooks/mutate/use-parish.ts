import { toast } from "@/components/ui/toast";
import apis from "@/services/api-services";
import type {
  ContributionRecord,
  CreateContributionResponse,
  GetSingleParishResponse,
  paymentVoucherForm,
} from "@/types/common";
import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

export const useImportContributor = () => {
  const queryClient = useQueryClient();
  const createImportContributorMutation = createMutation({
    mutationFn: async (data: FormData): Promise<paymentVoucherForm> => {
      const res = await apis.parish.importContributors(data);
      return res.data as paymentVoucherForm;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-users", "get-user"],
      });
    },
    onError: (error) => {
      toast({
        message: error.message,
        variant: "error",
      });
    },
  });

  return createImportContributorMutation();
};

export const useCreateSubmission = () => {
  // const queryClient = useQueryClient();
  const createSubmissionMutation = createMutation({
    mutationFn: async (
      data: ContributionRecord,
    ): Promise<CreateContributionResponse> => {
      const res = await apis.parish.createSubmission(data);
      return res.data as CreateContributionResponse;
    },
    onSuccess: async () => {
      toast({
        message: "Monthly Remittance Submitted Successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        message: error.message,
        variant: "error",
      });
    },
  });

  return createSubmissionMutation();
};

export const useCreateParish = () => {
  const queryClient = useQueryClient();
  const createParishMutation = createMutation({
    mutationFn: async (data: {
      name: string;
    }): Promise<GetSingleParishResponse> => {
      const res = await apis.parish.createParish(data);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-parishes"] });
      toast({
        message: "Parish Created Successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        message: error.message,
        variant: "error",
      });
    },
  });

  return createParishMutation();
};
