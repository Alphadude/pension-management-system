import { toast } from "@/components/ui/toast";
import apis from "@/services/api-services";
import type {
  CreateContributionFormValues,
  CreateContributionResponse,
} from "@/types/common";
import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

export const useCreateContribution = () => {
  const queryClient = useQueryClient();
  const createContributionMutation = createMutation({
    mutationFn: async (
      data: CreateContributionFormValues,
    ): Promise<CreateContributionResponse> => {
      const res = await apis.contributions.createContribution(data);
      return res.data as CreateContributionResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-contributions", "get-user-contributions"],
      });
      toast({
        message: "Contribution created successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Failed to create contribution",
        variant: "error",
      });
    },
  });

  return createContributionMutation();
};
